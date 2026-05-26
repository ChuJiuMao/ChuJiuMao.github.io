#!/usr/bin/env python3
"""Validate all footnote/endnote links in i-told-you-so-zh.html"""
import re
import sys

FILE = '/mnt/f/SystemFile/Desktop/博客/ChuJiuMao.github.io/posts/article/i-told-you-so-zh.html'
errors = []
warnings = []

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# 1: Check all href targets exist
for m in re.finditer(r'href="#([^"]+)"', content):
    target = m.group(1)
    if target == '#':
        errors.append(f"Empty href ({m.start()})")
        continue
    if f'id="{target}"' not in content and f'name="{target}"' not in content:
        errors.append(f"Broken href: #{target} has no matching id")

# 2: Check all footnote/endnote ref backlinks point to existing IDs
for m in re.finditer(r'class="footnote-backref"[^>]*href="#([^"]+)"', content):
    target = m.group(1)
    if f'id="{target}"' not in content:
        errors.append(f"Broken backref: #{target} not found")

# 3: Check for duplicate IDs
id_counts = {}
for m in re.finditer(r'id="([^"]+)"', content):
    i = m.group(1)
    id_counts[i] = id_counts.get(i, 0) + 1

for i, c in id_counts.items():
    if c > 1 and not i.startswith('notes-ch'):
        # notes-ch IDs may have sup + h3 sharing same pattern - check carefully
        warnings.append(f"Duplicate ID: {i} (count: {c})")

# 4: Check no empty href
if 'href=""' in content:
    errors.append("Found empty href=\"\"")

# 5: Check href="#undefined"
if 'href="#undefined"' in content:
    errors.append("Found href=\"#undefined\"")

# 6: Count endnote references in body vs endnote entries
# Body: <sup><a href="#notes-ch... role="doc-noteref">
body_endnotes = len(re.findall(r'role="doc-noteref"', content))

# Endnote entries: <li id="notes-ch...
note_entries = len(re.findall(r'<li id="notes-ch\d+-\d+"', content))

# Footnote entries: <li id="footnote-...
fn_entries = len(re.findall(r'<li id="footnote-\d+"', content))

# Body footnote refs: role="doc-noteref" in footnote context
# Actually footnotes use id pattern footnote-NNN-backlink
body_fn = len(re.findall(r'id="footnote-\d+-backlink"', content))

print(f"=== Validation Results ===")
print(f"Body endnote refs: {body_endnotes}")
print(f"Endnote entries (notes-chN-N): {note_entries}")
print(f"Body footnote backlink anchors: {body_fn}")
print(f"Footnote entries (footnote-N): {fn_entries}")

if body_endnotes != note_entries:
    warnings.append(f"Mismatch: {body_endnotes} body refs vs {note_entries} note entries")
if body_fn != fn_entries:
    warnings.append(f"Mismatch: {body_fn} body anchors vs {fn_entries} footnote entries")

# 7: Check for bare * † ‡ in body text (not in sup tags)
# Find text outside of notes/endnotes sections
body_only = content[:content.find('<section id="not"')]
for sym in ['*', '†', '‡']:
    # Find * that's not in HTML tags
    matches = re.finditer(re.escape(sym), body_only)
    for m in matches:
        # Check if it's inside a sup tag
        before = body_only[max(0, m.start()-30):m.start()]
        after = body_only[m.end():m.end()+30]
        if '<sup' not in before[before.rfind('<'):] and '>' not in after[:after.find('<')]:
            warnings.append(f"Unlinked {sym} at position {m.start()}: ...{before[-20:]}{sym}{after[:20]}...")

print(f"\n=== Summary ===")
print(f"Errors: {len(errors)}")
print(f"Warnings: {len(warnings)}")

for e in errors:
    print(f"  ERROR: {e}")
for w in warnings:
    print(f"  WARN: {w}")

sys.exit(len(errors))
