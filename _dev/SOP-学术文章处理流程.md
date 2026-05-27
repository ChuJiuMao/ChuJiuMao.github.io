# SOP：学术文章下载 → HTML 转换 → 中文翻译

## 1. 获取文章内容

### 方案 A：来源为 OA 网页（Nature 等）

#### 流程
1. 获取文章 DOI / URL。
2. 使用 `curl` 下载原始 HTML（不要用 WebFetch，Nature 会拦截机器人）：
   ```bash
   curl -L -o article.html "<URL>"
   ```
3. 从原始 HTML 中提取正文内容：
   - 用 `cElementTree`（Python）或正则解析。
   - 定位 `data-test="article-body"` 等容器元素。
   - 提取 `<section>` 作为章节。
   - 从 `data-test="article-reference-list"` 即可提取参考文献列表。
   - 从 `data-test="data-articles-figure-caption-container"` 获取图注。
4. **保存原始 HTML 备用**，防止后续需要回查。

### 方案 B：来源为 PDF（非 OA 文章）

大多数非 OA 文章只能以 PDF 形式获取。PDF 的处理难度高于网页 HTML。

#### 流程
1. **PDF 文本提取**（推荐用 PyMuPDF，即 `fitz`）:
   ```python
   import fitz
   doc = fitz.open("article.pdf")
   for i in range(doc.page_count):
       text = doc[i].get_text()
   ```
   - `get_text()` 提取的文本保留基本段落结构，但需要人工重新整理章节边界。
   - PDF 不提供结构化标签，所有章节划分需人工判断。

2. **结构重建**（PDF 特有难点）：
   - **章节识别**：通过字号、加粗、序号模式（"Introduction"、"Results"、"Fig."）判断章节标题。
   - **段落合并**：PDF 提取常将一段断开为多行（连字符断词如 "inform-ation"），需重新拼接。
   - **作者/机构/摘要**：通常在 PDF 首页，需从混杂文本中手动分离。
   - **参考文献**：需从尾页逐条提取，每条约 2-4 行，注意跨页断裂。

3. **公式处理**（PDF 最大痛点）：
   - PDF 提取的公式会变成纯文本，如 `αspatial = IS(VIN = VIN+, w/-filament) / IS0`。
   - **人工重建 LaTeX**：必须手动将公式还原为 MathJax 可渲染的 LaTeX 代码。
   - 识别上下标、分数、希腊字母，包裹为 `$$...\tag{N}$$`。
   - 将公式编号放入 `\tag{N}` 或 `id="eq-N"` 的 `<div class="math-block">` 中。
   - 检查 `\text{}` 中的英文注释，后续翻译时一并处理。

4. **图表提取**（PDF 最大难点）：

   **核心原则：提取图片内容区域，不包括图注（caption）。图注在 HTML 中用中文翻译版本。**

   **推荐方法：渲染页面 + 精确裁剪**

   第一步：分析 PDF，定位图片在页面上的精确坐标：
   ```python
   import fitz
   doc = fitz.open("article.pdf")
   page = doc[page_idx]  # 0-indexed
   blocks = page.get_text("dict")["blocks"]
   # 找到图片块（type=1）和图注文字（寻找 "Fig."）
   for b in blocks:
       if b["type"] == 1:  # image block
           print(f"Image at: {b['bbox']}")
       elif b["type"] == 0:  # text block
           text = "".join(s["text"] for line in b["lines"] for s in line["spans"])
           if "Fig." in text:
               print(f"Caption text at: {b['bbox']}")
   ```
   - 页面坐标单位是 points（1 pt = 1/72 inch）。
   - 标准 Nature 页面约 595x791 pts。
   - 记录图片块的 y 范围，以及图注起始的 y 坐标。

   第二步：用 `clip` 精确渲染图片区域（不含图注）：
   ```python
   clip = fitz.Rect(0, top, page_width, caption_start_y - 5)
   matrix = fitz.Matrix(350/72, 350/72)  # 350 DPI 高质量
   pix = page.get_pixmap(matrix=matrix, clip=clip)
   pix.save("fig1.jpg")
   ```
   - `top` = 图片起始 y 坐标上方留 5-10 pts 边距。
   - `caption_start_y` = 图注文字块的 y 坐标，取该值上方 5-10 pts 为裁剪下边界。
   - 宽度 = 全页宽度（595 pts），确保跨栏图片不被截断。

   第三步：缩放至适合网页显示：
   ```python
   from PIL import Image
   img = Image.open("fig1.jpg")
   if img.width > 1600:  # 适配 780px 正文宽度 + Retina
       ratio = 1600 / img.width
       img = img.resize((1600, int(img.height*ratio)), Image.LANCZOS)
   img.save("fig1.jpg", "JPEG", quality=90, optimize=True)
   ```

   **备选方法：提取嵌入式图片**
   - 对于某些 PDF，可使用 `doc.extract_image(xref)` 提取嵌入式 JPEG。
   - 嵌入式图片不含页面元素（页眉、页码等），但可能只是子面板，需要判断是否包含完整组图。
   - 适用于嵌入式图片本身就是完整组图的情况（可通过图片尺寸和页面布局判断）。

5. **交叉引用校对**：
   - PDF 中的引用是静态文本（如 "Fig. 2"），不会自动成为超链接。
   - 需逐一扫描全文，将 "Fig. N"、"Table N"、"Equation (N)" 等替换为 `<a href="#fig-N">` 等。

   第五步：自动去除白边（类似 Acrobat "裁剪页面" 功能）：
   ```python
   from PIL import Image, ImageFilter

   def auto_trim(img_path, padding=20, threshold=245):
       img = Image.open(img_path).convert("RGB")
       gray = img.convert("L").filter(ImageFilter.GaussianBlur(3))
       px = gray.load()
       w, h = img.size

       # 从四边向内扫描，找到第一个非白像素
       left = next((x for x in range(w) if any(px[x, y] < threshold for y in range(h))), 0)
       right = next((x for x in range(w-1, -1, -1) if any(px[x, y] < threshold for y in range(h))), w-1)
       top = next((y for y in range(h) if any(px[x, y] < threshold for x in range(w))), 0)
       bottom = next((y for y in range(h-1, -1, -1) if any(px[x, y] < threshold for x in range(w))), h-1)

       # 保留边距，避免贴边
       l = max(0, left - padding)
       t = max(0, top - padding)
       r = min(w-1, right + padding)
       b = min(h-1, bottom + padding)

       img.crop((l, t, r+1, b+1)).save(img_path, "JPEG", quality=90)
   ```
   - `threshold=245`：认为 >245 的像素为"空白"（适用于白底学术论文）。
   - `padding=20`：裁剪后在内容周围保留 20px 边距，防止太贴边。
   - `GaussianBlur(3)`：模糊预处理，避免噪点影响边界检测。

### 目标
将提取的纯文本内容注入到现有模板页（如 `demo-nature.html`）中，形成完整的可浏览文章页。

### 流程
1. **分析模板结构**：确认 CSS、MathJax 配置、TOC 侧边栏、设置面板、日/夜模式切换的实现方式。
2. **内容映射**：
   - 标题 → `<h1 class="article-title">`
   - 作者 → `<div class="authors">`
   - 摘要 → `<div class="abstract">`
   - 章节标题 → `<h2>` / `<h3>`（注意编号方式）
   - 正文段落 → `<p>`
   - 图表区 → `<figure>` + `<figcaption>`
   - 方法 → 独立 `<section id="methods">`
   - 参考文献 → `<ol class="references">`，每项 `<li id="ref-N">`
3. **公式处理**：将 LaTeX 公式包裹在 `$$...$$`（行间）或 `$...$`（行内），并测试 MathJax 渲染。
4. **临时性**：
   - 先复制模板为 `article-output.html`。
   - 用 Python 或手动编辑注入内容。
   - 打开浏览器本地预览，验证样式和交互。

## 3. 为交叉引用添加超链接

### 目标
文中所有"图 X"、"方程 (Y)"、"表 Z"、"方法"、"参考文献 [N]" 均设为可点击锚点跳转。

### 锚点命名规范
- 图表：`id="fig-{编号}"`，引用链接 `href="#fig-{编号}"`
- 公式：`id="eq-{编号}"`，引用链接 `href="#eq-{编号}"`
- 表格：`id="tbl-{编号}"`，引用链接 `href="#tbl-{编号}"`
- 方法章节：`id="methods"` 及 `id="method-{子节名}"`
- 参考文献：`id="ref-{编号}"`，引用链接 `href="#ref-{编号}"`

### 添加步骤（建议按此顺序防遗漏）
1. **参考文献**：在 `<ol>` 中为每项加 `id`；文中搜索 `[数字]` 或 `[数字,数字]` 替换为 `<a href="#ref-N">[N]</a>`。
   - 注意处理范围引用 `[42-45]` → 分别链接 `#ref-42` 到 `#ref-45`。
2. **图表**：搜索 "Fig\.? "、"图 "、"Figure "，逐条加链接。
3. **公式**：搜索 "equation"、"eq\.?"、"式 "、"方程"，加链接。
4. **方法引用**：搜索 "Methods"、"方法"，加链接。
5. **验证**：点击每个链接确认目标锚点存在且定位正确。

### 注意事项
- 避免嵌套 `<a>` 标签（如 `href="#eq-1">equation (1)</a>` 被正则重复包裹）。
- 优先处理长匹配再处理短匹配，防止部分替换导致漏网。

## 4. 翻译为中文（学术风格）

### 原则
- **人工翻译，不可用 Python/machine translation 批量处理**。
- 用词符合中文学术论文规范，避免机器翻译腔。
- 术语保持全文一致。

### 流程
1. **术语表准备**：先识别并统一核心术语的译法。
   - 例：maximum entropy → 最大熵, input-output dependencies → 输入-输出依赖, logistic regression → 逻辑回归, mutual information → 互信息, ablation → 消融。
2. **分段翻译顺序**：
   - 标题 + 摘要 → 引言 → 正文各节 → 方法 → 图注 → 参考文献（保持原文）
3. **每个段落操作**：
   - 在原文下方（或直接替换）写入中文翻译。
   - 保留所有 HTML 标签、锚点、LaTeX 公式不受影响。
   - 保留英文专有名词（基因名、化合物名、软件名等）。
4. **特殊区域处理**：
   - **MathJax 公式内的 `\text{}` 英文注释**：必须一并翻译为中文，如 `\text{where}` → `\text{其中}`。
   - **图和表格的 caption**：需翻译，但保留 Figure/Table 编号原文（如"图 1："）。
   - **作者单位、致谢**：可选择性翻译。
5. **质量检查清单**：
   - [ ] 全文无残留英文段落
   - [ ] 所有公式仍能正常渲染
   - [ ] 所有链接仍然有效
   - [ ] 无嵌套 `<a>` 标签
   - [ ] MathJax `\text{}` 已检查并翻译
   - [ ] 术语前后一致

## 5. 通用检查清单

### PDF 来源专项检查
| 检查项 | 方法 |
|--------|------|
| 章节结构完整 | 对照 PDF 页眉/目录核对所有章节 |
| 段落合并正确 | 检查是否有多余换行或连字符残留在单词中 |
| LaTeX 公式与原公式一致 | 逐条对照 PDF 中的公式渲染图 |
| 公式编号匹配 | 检查 `\tag{N}` 编号与 PDF 一致 |
| 参考文献完整无遗漏 | 对照 PDF 尾页逐条计数 |
| 图表占位符已标记 | 确认所有 figure 位置有 `<img>` 和 `<figcaption>` |
| 作者单位编号匹配 | 对照 PDF 首页脚注 |

### 通用检查清单

| 检查项 | 方法 |
|--------|------|
| 页面无报错 | 打开浏览器控制台 |
| MathJax 渲染正确 | 滚动全文检查公式显示 |
| 所有锚点可跳转 | 逐一点击交叉引用链接 |
| 日/夜模式正常 | 切换 data-theme 确认 |
| 参考文献完整 | 计数核对原文 |
| 中文学术术语一致 | 全文搜索关键术语 |
| 公式内文本已翻译 | 搜索 `\text{` 逐条检查 |

## 6. 常见问题与对策

| 问题 | 对策 |
|------|------|
| Nature 页面 paywall 拦截 | 使用 `curl` 下载，不要用 WebFetch |
| PDF 文本提取杂乱、段落断裂 | 使用 `fitz`（PyMuPDF）提取，然后按章节手动拼接；注意连字符断词如 "inform-ation" → information |
| PDF 公式变成纯文本 | 人工重建为 LaTeX：识别上下标/分数/希腊字母，用 `$$...\\tag{N}$$` 包裹 |
| PDF 没有图片 | 截图占位，或用 `<img>` 占位 + 背景色；从期刊网站另行获取 |
| 模板 CSS 冲突 | 检查模板的 class 命名空间，避免覆盖 |
| 正则替换产生嵌套 `<a>` | 用 replace 时先占位或使用负向后顾；检查输出 |
| MathJax 不渲染新添加的公式 | 确认 `$` 定界符正确，或触发 `MathJax.typesetPromise()` |
| 文章太长，context 窗口不够 | 分节处理，先生成骨架再逐段填充 |
| 补充材料（Supplementary）锚点不存在 | 补充图表在 PDF 中仅提及但无对应内容，将 `<a href="#fig-sN">` 改为 `<span>` 或移除链接，避免死链 |
| 同一文件含多家机构的作者单位 | 从 PDF 首页脚注提取编号与单位的对应关系，确保 `<sup>` 正确匹配 |

## 7. 移动端适配规约

### 核心原则
- **绝对禁止**在文章 HTML 的 `<style>` 标签中嵌入布局相关 CSS（`.page-wrapper`、`.paper-main`、`.toc-sidebar`、`.paper-body` 等网格/布局规则）。
- 所有布局和响应式样式统一在 `assets/css/article.css` 和 `assets/css/global.css` 中管理。

### 允许的 inline `<style>` 内容
仅允许文章特有的、极小量的展示样式，例如：
- `.eq-number { float: right; ... }` — 公式编号定位
- `.color-field { display: flex; ... }` — 颜色选择器布局
- `.data-box { ... }` — 数据展示框
- 任何与页面整体布局、网格、响应式无关的自定义样式

### 为什么？
文章 HTML 内的 `<style>` 块优先级高于外部 CSS 文件。如果 inline style 中定义了 `.page-wrapper`、`.paper-body` 等规则，即使没有写 `@media` 查询，这些规则也会在移动端覆盖 `article.css` 中的响应式规则，导致：
- 每行只显示一个字（fixed-width 布局被锁定）
- TOC 侧边栏无法折叠为抽屉
- 设置面板无法正常滑动

### 工作流提醒
1. 模板页（`_template.html`）已包含上述注释警告，创建新文章时不要删除该注释。
2. 新建文章 HTML → 复制 `_template.html` → 填入内容 → 如需额外样式按上述"允许"范围添加。
3. 如果需要在 `assets/css/article.css` 中添加全局样式，确保同时测试 640px、480px、380px 三个断点。

## 8. 长文/书籍翻译（50+ 段长篇）

### 适用场景
- 整本书籍（如 Supremacy 全文，2000+ 行 HTML）
- 超长学术文章（50+ 段落）
- 需要批量翻译的多个独立章节

### 流程

#### 8.1 章节拆分与并行翻译

1. **按 `<section>` 拆分**：每个章节作为一个独立翻译单元。
2. **启动并行翻译代理**：每个章节启动一个独立 agent，使用 `run_in_background=true`。
3. **模型选择**：长文本翻译使用 `model="haiku"`（flash 模型），性价比最高。
   - 每个 agent 翻译 1 个完整章节，包含约 30-90 个 `<p>` 段落。

#### 8.2 翻译规则（学术书籍风格）

```markdown
规则：
1. 学术翻译风格，语句通顺自然
2. 保留人名英文原文（如 Sam Altman, Demis Hassabis 等）
3. 保留公司名/组织名英文原文（如 OpenAI, DeepMind, Microsoft 等）
4. 保留产品名/技术名英文原文（如 GPT-4, ChatGPT, LaMDA 等）
5. 保留书名、文章标题的英文原文，可附加中文译名
6. 所有 HTML 标签完整保留（<p>, <em>, <blockquote> 等）
7. blockquote 内的直接引语、推文、对话保持英文原文
8. 每次翻译 3-5 个段落就执行 Edit 替换，不要一次性提交大段更改
```

#### 8.3 混合段落修复（关键步骤）

**问题：** Flash 模型翻译后，中文段落中常残留英文单词——主要是形容词、副词和普通名词。例如"a brilliant researcher"可能被译为"一个 brilliant 的研究员"。

**修复流程：**

1. **扫描残留英文词**：
   ```python
   import re
   def has_chinese(s):
       return bool(re.search(r'[一-鿿]', s))
   words = re.findall(r'\b[a-zA-Z]{3,}\b', text)
   # 过滤掉专有名词(首字母大写)、公司名、产品名、常见语法词
   # 剩下的就是需要翻译的内容词
   ```
2. **分类处理**：
   - **专有名词（人名/地名/公司名）**：保留英文
   - **技术术语（transformer, alignment）**：首次出现可附加中文，后续用中文
   - **形容词/副词/动词（brilliant, relentless）**：必须翻译为中文
   - **直接引语/引号内内容**：保留原文
   - **URL、文件名**：保留原文
3. **批量修复**：将待修复行号分组（每批约 30 行），启动并行 agent 逐行修复。

#### 8.4 翻译后检查清单

| 检查项 | 方法 |
|--------|------|
| 所有章节均已翻译（含中文字符） | 对每个 `<section>` 检查是否有 `[一-鿿]` 正则匹配 |
| 无纯英文段落残留 | 扫描 `<p>` 标签，排除 EXT/SB 等引用类 |
| 无中英文混杂（残留英文内容词） | 扫描 `<p>` 内英文单词，过滤专有名词后检查 |
| TOC 中无"待译"标签 | 全文搜索"待译" |
| 无"未完待续"占位符 | 全文搜索"未完待续" |
| inline style 中的冗余 CSS 已删除 | 检查 `.toc-pending-tag` 等不再需要的 CSS 规则 |

#### 8.5 效率建议

- **不要逐个段落翻译**：70 段章节逐个 Edit 需要 60+ 次 API 往返，耗时 ~10 分钟。
- **分 3-4 批并行**：每个 agent 处理 ~20 段，3 个 agent 并行可在 2-3 分钟内完成。
- **混合段落修复也应分批**：135 个混合段落分 4 批并行，每批约 10-15 分钟。
- **先全文翻译纯英文段落，再处理混合段落**：分为两个独立阶段，避免冲突。

## 9. 已知坑与对策

| 问题 | 现象 | 对策 |
|------|------|------|
| flash 模型翻译残留英文形容词 | "一个 brilliant 的研究员" | 翻译完成后必须用脚本扫描 + 批量修复 |
| 并行 agent 写同一个文件 | Edit 可能失败（内容已被其他 agent 改过） | 按行号范围隔离，不同 agent 处理不重叠的行区间 |
| agent 逐段翻译太慢 | 70 段要 10+ 分钟 | 分 3-4 批并行，每批 ~20 段 |
| CSS Grid + fixed 子项在 Chrome Android 渲染异常 | 正文被压成 ~50px，逐字成行 | 用 `padding-left + position: fixed` 替代 Grid |
| `overflow-wrap: anywhere` 在中文场景 | 每个汉字都是断点，导致逐字换行 | 使用 `break-word; word-break: normal;` |
| JS 无条件向 `:root` 写 CSS 变量 | inline style 优先级压过 `@media` 查询 | 只在用户交互时才写，初始化不覆盖 |
| font-family 含空格的字体名没加引号 | 整个 font-family 解析失败 | 必须加引号：`'Source Serif 4'` |

## 10. 书籍翻译后期修复集（EPUB → HTML 转换 + 翻译后质量修复）

本節记录在书籍翻译项目（《Bird IQ》《I Told You So》《Supremacy》）中遇到的所有后处理问题及其解决方案。

---

### 10.1 目录（TOC）层级错误

| 现象 | 根因 | 解决方法 |
|------|------|----------|
| "尾注"下的章节子条目没有显示为次级目录 | HTML DOM 结构中只有 sec1 嵌套在 `<section id="not">` 内部，sec2~sec10 都是顶层 `<section>` | JS 状态机方案：在 `buildBookToc()` 中新增 `currentEndnotesChildren` 变量。遇到 "尾注" 标签后，后续所有 "第X章" 条目自动纳入其子 `<ol>`；遇到 "致谢""关于作者"等非章节项退出状态 |
| 某些章节跑到了顶层目录 | 同上 | 同上 |
| "全书脚注"不应出现在目录 | 无跳过机制 | 给该 section 加 `data-toc-skip="true"`，`buildBookToc` 和 `buildArticleTocList` 均增加 `if (section.dataset.tocSkip === 'true') return;` |

**关键文件：** `assets/js/article-shell.js` 中的 `buildBookToc()` 和 `buildArticleTocList()`

---

### 10.2 页内跳转链接（Anchors）

#### 10.2.1 脚注星号标记 → 底部脚注

| 现象 | 根因 | 解决方法 |
|------|------|----------|
| 正文中的 `*` `†` `‡` 没有链接到底部脚注 | EPUB 用 `epub:type="rearnote"` 标记，但转换时被丢弃 | 保留原有 `role="doc-noteref"` 和 `id="footnote-N-backlink"` 体系。底部脚注用 `<li id="footnote-N">` 对应。顺序匹配 + 符号验证。 |

**匹配规则：**
- 按正文阅读顺序扫描（从引言到第 10 章结束）
- 每遇到一个 `*` / `†` / `‡` 符号（包装在 `<sup><a>` 中），匹配到底部书脚注列表中的下一条
- 同时核对符号：正文 `*` → 脚注开头也必须是 `*`

#### 10.2.2 编号尾注 → 对应章节脚注列表

| 现象 | 根因 | 解决方法 |
|------|------|----------|
| 所有 538 条尾注链接都指向不存在的 ID | 转换脚本中 `href` 和目标 `id` 命名分歧。Body 的 `<a href="#notes-ch1">` 指向不存在的 `id`；而 Notes 的 `<li id="notes-ch1-1">` 使用连字符格式 | 从 body 端的 `id`（`notes-chX_Y`）解析章节号 X 和序号 Y，改写 `href` 为 `#notes-chX-Y`（匹配 note 端的连字符格式）。同时修复 notes 端的回退链接：去掉 `hidden="hidden"`，改为可见 `↩`，`href` 指向 body 端的 `#notes-chX_Y`。 |

**完成状态：** 0 broken href，0 broken backref（validation 脚本验证）

#### 10.2.3 EPUB 死链

| 现象 | 根因 | 解决方法 |
|------|------|----------|
| 页面中有 `href="##c_xxx"` 形式的链接 | EPUB 内部目录锚点（`contents.xhtml#c_int`→`##c_int`），转换后目标 ID 不存在 | 上下文分析后映射：`##c_int`→`#int`，`##c_ch1`→`#ch1`，`##c_end`→`#not`，`##c_ack`→`#ack`，`##c_ata`→`#abouttheauthor` |

---

### 10.3 HTML 结构问题

| 现象 | 根因 | 解决方法 |
|------|------|----------|
| 多余的 `</section>` 标签 | EPUB 转换器产生的嵌套结构错误：原意是尾注区域包裹全部 10 章，但只嵌套了第 1 章，后续章节关闭后又多了一个 `</section>` | 移除 orphan `</section>` (原 line 1344)，然后用 JS 状态机补偿 DOM 结构缺失的层级 |
| `value="-0"` 导致脚注序号全为 0 | EPUB 源文件中 `<li value="-0">` 覆盖了 `<ol>` 的自动编号 | 全文移除 `value="-0"` |
| Section 和 heading 共享同一 ID（如 `id="int"`同时出现在 `<section>` 和 `<h2>` 上） | EPUB 转换器直接复制了 ID. 虽然 HTML 规范规定 ID 必须唯一，但浏览器实际选择第一个匹配元素 | 建议不改动，JS 通过 `.querySelector(':scope > H2-4')` 而非 ID 来定位标题 |

---

### 10.4 翻译与格式问题

#### 10.4.1 英文引语（直接引语）翻译

| 需求 | 规则 |
|------|------|
| 所有英文直接引语在正文中附加中文翻译 | `原文（译文）` 格式。示例：`"What's the oldest bone you've ever worked on?"（"你处理过的最古老的骨头是什么？"）` |
| 引语嵌入在中句中的处理 | 翻译应紧跟在引语结束引号后，如 `"原文"（"翻译"）其余中文叙述` |
| 引语覆盖章节标题或部分句子的边界 | 需人工判断是否属于直接引语。英文书名、术语、简写不属于直接引语，不应翻译 |

#### 10.4.2 批量翻译产生的结构错误

| 现象 | 根因 | 修复 |
|------|------|------|
| `"原文"（"翻译"）"后续叙述"`（多了一个引号） | 自动翻译脚本将闭引号一起包含进翻译区域，导致额外引号 | 删除紧随 `）` 后的多余 `"` |
| `"原文（"翻译"）`（缺英文闭引号） | 自动翻译脚本没有在翻译前插入英文闭引号，直接将 `（"翻译"）` 接在原文后 | 在 `（` 前插入英文闭引号 `"` |
| `"原文（翻译）"`（闭引号出现在翻译括号后） | 自动翻译脚本将原始英文闭引号保留在翻译括号后 | 将闭引号移到 `（` 之前，形成 `"原文"（翻译）` |
| 同一引语出现两次翻译 | 脚本未正确处理引语与叙述文本之间的边界 | 删除后一次重复翻译，保留前一次 `原文（译文）` 格式 |

#### 10.4.3 中英文混合句修复

| 原始 | 修复 | 说明 |
|------|------|------|
| `their 产妇` | `他们的产妇` | 英文代词 → 中文 |
| `simply 不想改变` | `就是不想改变` | 英文副词 → 中文 |
| `remarkably 相似` | `非常相似` | 英文副词 → 中文 |
| `才 finally 接受` | `才最终接受` | 英文副词 → 中文 |
| `英国逃兵 sailors 所报告的` | `英国逃兵水手所报告的` | 英文名词 → 中文 |

#### 10.4.4 译名规范

| 类型 | 规则 |
|------|------|
| 章节标题 | 全部使用中文数字，如 "第 6 章"→"第 6 章"（统一空格） |
| 书名 | 英文书名保持英文加 `<i>` 标签，不应出现中文翻译 |
| 参考文献/尾注 | 全部保持英文原文，不翻译任何内容（包括出版城市、页码等） |
| 脚注内容 | 已经翻译为中文的保留中文，但需要检查是否有格式断裂 |

#### 10.4.5 双语引语折叠（后期清理）

初版翻译常产生 `英文原文（"中文译文"）` 双语并列格式。后期需将其折叠为纯中文。

**识别与检测**

双语对的结构特征：

```
英文原文\u201d\uff08\u201c中文译文\u201d\uff09
```

即：英文原文以弯闭引号 `"` (U+201D) 结束，紧跟 `（"` (U+FF08 U+201C)，然后是中文译文，最后 `"）` (U+201D U+FF09)。开头的引号有时是 ASCII `"` (U+0022)，有时是弯开引号 `"` (U+201C)，需逐条确认。

快速扫描脚本（检测正文范围内的残留双语对）：

```python
import re

with open('article.html', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines, 1):
    if i > 720:   # 跳过参考文献区
        break
    if '\uff08\u201c' not in line:
        continue
    idx = 0
    while True:
        pos = line.find('\uff08\u201c', idx)
        if pos == -1:
            break
        end = line.find('\uff09', pos)
        inner = line[pos:end+1] if end != -1 else line[pos:]
        has_cn = any('\u4e00' <= c <= '\u9fff' for c in inner)
        has_en = bool(re.search(r'[A-Za-z]{4,}', inner))
        if has_cn and has_en:
            print(f'L{i}: {inner[:120]}')
        idx = (end + 1) if end != -1 else len(line)
```

**折叠规则**

| 情况 | 处理方式 |
|------|----------|
| 标准双语对 `"英文"\uff08"中文"\uff09` | 删除英文部分及 `\uff08` `\uff09` 包裹，保留中文译文（含其弯引号） |
| 英文句中含 `<sup>` 脚注锚点 | 折叠后将 `<sup>...</sup>` 移到中文对应位置（通常是对应词语之后） |
| 引语前半已翻译、后半未翻（分裂引语） | 前半去掉中间多余闭引号，后半英文部分折叠；两段中文合并为一个完整引语 |
| `《中文书名》（"English Title"）` | **不处理**——这是书名括注格式，`（"` 内无中文段落内容，跳过 |
| 参考文献区（通常行 720 以后） | **不处理**——英文是文献标题，不翻译 |

**引号类型陷阱（关键）**

文件内常混用三种引号：
- ASCII `"` U+0022
- 弯开引号 `"` U+201C
- 弯闭引号 `"` U+201D

Python 的 `str.replace()` / `re.sub()` 对这三种完全不同，目测无法区分。**替换前必须先用以下方式确认每个引号的确切码位：**

```python
with open('article.html', encoding='utf-8') as f:
    content = f.read()

idx = content.find('目标段落关键词')
chunk = content[idx-1:idx+200]
escaped = ''.join(
    f'\\u{ord(c):04x}' if ord(c) > 127 else c
    for c in chunk
)
print(escaped)
```

拿到精确的 Unicode 转义序列后，再在替换脚本中写字符串字面量（使用 `\uXXXX`），逐条检查 `content.count(old) == 1` 再执行替换。

**验证**

全部替换完成后，重跑上方检测脚本，确认输出为空（无残留双语对）。

---

### 10.5 CSS / 样式问题

| 现象 | 根因 | 解决方法 |
|------|------|----------|
| 首段没有首行缩进 | 文章第一章第一个段落用 `class="CO"` 或 `class="noindent"`，没有首行缩进 | 出版物规范要求每段（含章节首段）都有首行缩进。`class="CO" | → `class="TX"`，`class="noindent"` → `class="indent"`。同时确保 CSS 中 `.indent`、`.TX` 设置了 `text-indent` |
| 尾注章节标题层级不对 | EPUB 中所有尾注章节标题都是 `<h2>`，与正文章节标题同级 | 改为 `<h3 class="BMH1">` 作为 "尾注" `<h2>` 的次级标题；CSS 中添加 `h3.BMH1` 规则 |
| 右侧悬浮工具栏遮挡正文 | 正文容器 `.paper-wrapper` 没有为 fixed 工具栏预留右侧空间 | 引入 CSS 变量 `--reader-tools-reserve-right`，`body.reader-tools-visible` 时设置，`.paper-wrapper` 的 `padding-right` 叠加该值 |

---

### 10.6 图片和浮动元素

| 问题 | 方案 |
|------|------|
| 图片被正文文字覆盖 | 使用 `figure-dock.js` 实现图片固定到侧边；正文根据 dock 宽度自动让位 |
| 多张图片同时查看 | 支持同时固定多张图片，dock 内垂直排列 |
| 图片标注 | 覆盖 `<canvas>` 支持画笔标注，坐标归一化存储到 localStorage |

> 注意：Figure Dock 功能尚在开发中，详见 `assets/js/figure-dock.js` 和 `assets/css/figure-dock.css`

---

### 10.7 验证与审计

#### 10.7.1 自动验证脚本

**文件：** `scripts/validate-links.py`

检查内容：
1. 所有 `href="#id"` 的目标 `id` 是否存在
2. 所有 footnote-backref 的回退目标是否存在
3. 无重复 ID（白名单 specific ID 模式）
4. 无空 href / `#undefined`
5. 正文尾注引用数量与尾注列表条目数量对比
6. 脚注引用数量与脚注列表条目数量对比
7. 正文裸露符号脚注检测

**运行方法：**
```bash
python3 scripts/validate-links.py
```
要求输出 `Errors: 0`。

#### 10.7.2 审计报告

**文件：** `tmp/footnote-audit.md`

每次结构修复后手动更新，包含：
- 每章编号尾注清单（正文 vs. 列表）
- 全部书符号脚注匹配表
- 已知 orphan 条目

---

### 10.8 修复流程总结（经验顺序）

按以下顺序处理新转换的书籍 HTML，避免重复劳动：

1. **结构审计**：读取 HTML，理解所有 section 的起止范围、层级关系和嵌套
2. **CSS 审计**：确认所有用到的 class（TX, CO, SB1, BMH, NTX, FN 等）在 `article.css` 中有定义
3. **TOC 逻辑审计**：对应 Book 结构，确保 JS 状态机正确处理 "尾注""致谢""关于作者"
4. **链接审计**：扫描所有锚点，检查 EPUB 死链（`##c_xxx`）和跨文件链接（`.xhtml#`）
5. **修复链接**：先修所有 `href`→`id` 对应关系，再修隐藏 backref
6. **修复结构**：移除 orphan tags，确认嵌套关系
7. **修复尾注位置**：将 "全书脚注" 移入正确的 section 区域
8. **翻译审计**：检查直接引语翻译格式、中英文混合词、尾注译文残留
9. **验证**：运行 `validate-links.py`，确认 Errors: 0
10. **UI 验证**：浏览器打开，逐一点击脚注/尾注/目录链接，检查日夜间模式

---

### 10.9 术语索引

| 术语 | 解释 |
|------|------|
| **尾注（Endnotes）** | 每章末尾的编号注释，正文中用数字 `1,2,3...` 引用 |
| **脚注（Footnotes）** | 全文统一的符号注释，正文中用 `*†‡` 引用 |
| **星号脚注** | 正文底部用 `*` 符号标记的注释，非尾部目注释 |
| **正文引用标记** | `<sup><a>` 包裹的数字或符号，指向对应注释 |
| **回退链接** | 注释末尾的 `↩`，点击返回正文原引用位置 |
| **Orphan 注释** | 在注释列表中存在，但在正文中没有对应引用的条目 |
| **隐藏 backref** | EPUB 源文件中 `hidden="hidden"` 的 `<a>` 回退链接 |
