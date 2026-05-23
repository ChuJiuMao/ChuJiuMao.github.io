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
