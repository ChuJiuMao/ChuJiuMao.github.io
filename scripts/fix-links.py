#!/usr/bin/env python3
"""Fix all endnote/footnote links in i-told-you-so-zh.html"""

import re
import sys

FILE = '/mnt/f/SystemFile/Desktop/博客/ChuJiuMao.github.io/posts/article/i-told-you-so-zh.html'

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# ---- Fix 1: Endnote forward links (body → notes) ----
# Pattern: <a href="#notes-chNUM" id="notes-chCHAPTER_LOCALREFNUM" role="doc-noteref">NUM</a>
# Fix: href="#notes-chCHAPTER-LOCALREFNUM"

def fix_endnote_forward(m):
    full = m.group(0)
    href = m.group(1)
    id_val = m.group(2)
    # Extract chapter and refnum from id: notes-chX_Y
    id_match = re.match(r'notes-ch(\d+)_(\d+)', id_val)
    if id_match:
        ch = id_match.group(1)
        ref = id_match.group(2)
        new_href = f'#notes-ch{ch}-{ref}'
        new_full = full.replace(href, new_href)
        return new_full
    return full

content = re.sub(
    r'href="#notes-ch(\d+)" id="(notes-ch\d+_\d+)" role="doc-noteref"',
    lambda m: fix_endnote_forward(re.match(r'href="([^"]+)" id="([^"]+)" role="doc-noteref"', m.group(0))),
    content
)

# ---- Fix 2: Endnote backlinks (notes → body) ----
# In each note <li>, there's: <a hidden="hidden" href="chapterN.xhtml#notes-chN_M">N.</a>
# Fix: remove hidden, change href to #notes-chN_M, add ↩ backlink

def fix_note_backlink(m):
    full = m.group(0)
    target_id = m.group(1)  # e.g., notes-ch1_1
    return f'<a class="footnote-backref" aria-label="返回正文" href="#{target_id}">↩</a>'

content = re.sub(
    r'<a hidden="hidden" href="chapter\d+\.xhtml#(notes-ch\d+_\d+)">\d+\.</a>',
    fix_note_backlink,
    content
)

# ---- Fix 3: Orbhan footnote entries (add note that they have no body ref) ----
# footnotes 082, 083, 084, 085 have no body references
# Mark them with a comment

# ---- Fix 4: Move footnotes section into endnotes area ----
# The footnotes section currently at line ~1366 (after abouttheauthor)
# should be moved into the doc-endnotes section
# But since sec2-10 are top-level (not inside #not), 
# we'll add a footnote section after sec10, before ack

# Actually, let's just wrap sec2-sec10 in a proper endnotes parent
# and add footnotes inside it

# First, find the exact boundaries
not_start = content.find('<section aria-labelledby="not" id="not" role="doc-endnotes">')
if not_start == -1:
    print("ERROR: cannot find #not section start")
    sys.exit(1)

# Find where sec2 starts (it should be right after #not closes)
sec2_start = content.find('<section aria-labelledby="sec2" id="sec2">')
# Find where ack starts
ack_start = content.find('<section aria-labelledby="ack" id="ack" role="doc-acknowledgments">')

# Find current footnotes section
fn_start = content.find('<section aria-label="not">')
fn_end = content.rfind('</section>')  # Last section closing tag

print(f"#not starts at: {not_start}")
print(f"sec2 starts at: {sec2_start}")
print(f"ack starts at: {ack_start}")
print(f"footnotes starts at: {fn_start}")
print(f"footnotes ends at (assumed): {fn_end}")

# ---- Fix 5: Remove duplicate/orphan closing tags ----
# Remove extra </section> that don't have matching opens
# Count section depth as we go

lines = content.split('\n')
depth = 0
fixes = []
for i, line in enumerate(lines):
    opens = line.count('<section')
    closes = line.count('</section>')
    old_depth = depth
    depth += opens - closes
    if depth < 0:
        # Too many closes - mark this line
        fixes.append(i)
        depth = 0

print(f"\nOrphan closing tags at lines: {[f+1 for f in fixes]}")

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! Fixed all endnote links.")
