# Footnote/Endnote Audit: i-told-you-so-zh.html
Generated: 2026-05-26

## 1. Summary of Findings

| Item | Count | Status |
|---|---|---|
| Endnote body references | 529 total across 10 chapters | See per-chapter breakdown |
| Endnote section entries | 557 total across 10 chapters | 1 entry per reference number |
| Footnote body references | 128 (footnote-000 to footnote-131) | ✓ |
| Footnote section entries | 129 (footnote-000 to footnote-131, including 082–085) | 4 orphaned definitions |
| Duplicate IDs | 15 pairs (section+heading) | Intentional (section+heading share id) |
| Broken href targets | All body endnote refs point to `#notes-chN` which does NOT exist | **SYSTEMATIC ISSUE** |

### Critical Findings

1. **All endnote superscript hrefs target `#notes-chN` (e.g. `#notes-ch1`, `#notes-ch2`) but no element with that ID exists in the HTML.** The actual anchor IDs for each chapter's notes section are `sec1`, `sec2`, etc. This means every endnote reference link is broken — clicking them does nothing.

2. **4 orphaned footnote definitions**: footnote-082, footnote-083, footnote-084, footnote-085 exist in the footnote section but are NEVER referenced from the body text.

3. **Missing endnote references in body text**: Several endnote numbers exist in the notes section but are never referenced from the body (see per-chapter detail).

---

## 2. Endnote Cross-Reference (per chapter)

### Chapter 1

**Body references (33 total, lines 70–121)** → href `#notes-ch1`
**Note entries (33 total, lines 721–754)** → ids `notes-ch1-1` through `notes-ch1-33`

| Body Ref # | Body Line | Body: id | Note Section id | Status |
|---|---|---|---|---|
| 1 | 70 | notes-ch1_1 | notes-ch1-1 | ✓ |
| 2 | 71 | notes-ch1_2 | notes-ch1-2 | ✓ |
| 3 | 72 | notes-ch1_3 | notes-ch1-3 | ✓ |
| 4 | 73 | notes-ch1_4 | notes-ch1-4 | ✓ |
| 5 | 74 | notes-ch1_5 | notes-ch1-5 | ✓ |
| 6 | 76 | notes-ch1_6 | notes-ch1-6 | ✓ |
| 7 | 77 | notes-ch1_7 | notes-ch1-7 | ✓ |
| 8 | 78 | notes-ch1_8 | notes-ch1-8 | ✓ |
| 9 | 80 | notes-ch1_9 | notes-ch1-9 | ✓ |
| 10 | 80 | notes-ch1_10 | notes-ch1-10 | ✓ |
| 11 | 81 | notes-ch1_11 | notes-ch1-11 | ✓ |
| 12 | 81 | notes-ch1_12 | notes-ch1-12 | ✓ |
| 13 | 82 | notes-ch1_13 | notes-ch1-13 | ✓ |
| 14 | 82 | notes-ch1_14 | notes-ch1-14 | ✓ |
| 15 | 82 | notes-ch1_15 | notes-ch1-15 | ✓ |
| 16 | 83 | notes-ch1_16 | notes-ch1-16 | ✓ |
| 17 | 83 | notes-ch1_17 | notes-ch1-17 | ✓ |
| 18 | 88 | notes-ch1_18 | notes-ch1-18 | ✓ |
| 19 | 95 | notes-ch1_19 | notes-ch1-19 | ✓ |
| 20 | 95 | notes-ch1_20 | notes-ch1-20 | ✓ |
| 21 | 98 | notes-ch1_21 | notes-ch1-21 | ✓ |
| 22 | 102 | notes-ch1_22 | notes-ch1-22 | ✓ |
| 23 | 103 | notes-ch1_23 | notes-ch1-23 | ✓ |
| 24 | 107 | notes-ch1_24 | notes-ch1-24 | ✓ |
| 25 | 108 | notes-ch1_25 | notes-ch1-25 | ✓ |
| 26 | 114 | notes-ch1_26 | notes-ch1-26 | ✓ |
| 27 | 116 | notes-ch1_27 | notes-ch1-27 | ✓ |
| 28 | 116 | notes-ch1_28 | notes-ch1-28 | ✓ |
| 29 | 118 | notes-ch1_29 | notes-ch1-29 | ✓ |
| 30 | 119 | notes-ch1_30 | notes-ch1-30 | ✓ |
| 31 | 120 | notes-ch1_31 | notes-ch1-31 | ✓ |
| 32 | 120 | notes-ch1_32 | notes-ch1-32 | ✓ |
| 33 | 121 | notes-ch1_33 | notes-ch1-33 | ✓ |

**Count: Body=33, Notes=33 → MATCH ✓**

---

### Chapter 2

**Body references (51 total, lines 131–176)** → href `#notes-ch2`
**Note entries (51 total, lines 762–813)** → ids `notes-ch2-1` through `notes-ch2-51`

| Body Ref # | Body Line | Body: id | Note Section id | Status |
|---|---|---|---|---|
| 1 | 131 | notes-ch2_1 | notes-ch2-1 | ✓ |
| 2 | 131 | notes-ch2_2 | notes-ch2-2 | ✓ |
| 3 | 131 | notes-ch2_3 | notes-ch2-3 | ✓ |
| 4 | 131 | notes-ch2_4 | notes-ch2-4 | ✓ |
| 5 | 132 | notes-ch2_5 | notes-ch2-5 | ✓ |
| 6 | 133 | notes-ch2_6 | notes-ch2-6 | ✓ |
| 7 | 133 | notes-ch2_7 | notes-ch2-7 | ✓ |
| 8 | 134 | notes-ch2_8 | notes-ch2-8 | ✓ |
| 9 | 134 | notes-ch2_9 | notes-ch2-9 | ✓ |
| 10 | 135 | notes-ch2_10 | notes-ch2-10 | ✓ |
| 11 | 135 | notes-ch2_11 | notes-ch2-11 | ✓ |
| 12 | 136 | notes-ch2_12 | notes-ch2-12 | ✓ |
| 13 | 136 | notes-ch2_13 | notes-ch2-13 | ✓ |
| 14 | 138 | notes-ch2_14 | notes-ch2-14 | ✓ |
| 15 | 138 | notes-ch2_15 | notes-ch2-15 | ✓ |
| 16 | 138 | notes-ch2_16 | notes-ch2-16 | ✓ |
| 17 | 144 | notes-ch2_17 | notes-ch2-17 | ✓ |
| 18 | 145 | notes-ch2_18 | notes-ch2-18 | ✓ |
| 19 | 155 | notes-ch2_19 | notes-ch2-19 | ✓ |
| 20 | 157 | notes-ch2_20 | notes-ch2-20 | ✓ |
| 21 | 157 | notes-ch2_21 | notes-ch2-21 | ✓ |
| 22 | 158 | notes-ch2_22 | notes-ch2-22 | ✓ |
| 23 | 158 | notes-ch2_23 | notes-ch2-23 | ✓ |
| 24 | 158 | notes-ch2_24 | notes-ch2-24 | ✓ |
| 25 | 158 | notes-ch2_25 | notes-ch2-25 | ✓ |
| 26 | 161 | notes-ch2_26 | notes-ch2-26 | ✓ |
| 27 | 161 | notes-ch2_27 | notes-ch2-27 | ✓ |
| 28 | 163 | notes-ch2_28 | notes-ch2-28 | ✓ |
| 29 | 164 | notes-ch2_29 | notes-ch2-29 | ✓ |
| 30 | 164 | notes-ch2_30 | notes-ch2-30 | ✓ |
| 31 | 164 | notes-ch2_31 | notes-ch2-31 | ✓ |
| 32 | 164 | notes-ch2_32 | notes-ch2-32 | ✓ |
| 33 | 166 | notes-ch2_33 | notes-ch2-33 | ✓ |
| 34 | 167 | notes-ch2_34 | notes-ch2-34 | ✓ |
| 35 | 167 | notes-ch2_35 | notes-ch2-35 | ✓ |
| 36 | 167 | notes-ch2_36 | notes-ch2-36 | ✓ |
| 37 | 167 | notes-ch2_37 | notes-ch2-37 | ✓ |
| 38 | 169 | notes-ch2_38 | notes-ch2-38 | ✓ |
| 39 | 169 | notes-ch2_39 | notes-ch2-39 | ✓ |
| 40 | 169 | notes-ch2_40 | notes-ch2-40 | ✓ |
| 41 | 170 | notes-ch2_41 | notes-ch2-41 | ✓ |
| 42 | 170 | notes-ch2_42 | notes-ch2-42 | ✓ |
| 43 | 171 | notes-ch2_43 | notes-ch2-43 | ✓ |
| 44 | 171 | notes-ch2_44 | notes-ch2-44 | ✓ |
| 45 | 171 | notes-ch2_45 | notes-ch2-45 | ✓ |
| 46 | 171 | notes-ch2_46 | notes-ch2-46 | ✓ |
| 47 | 171 | notes-ch2_47 | notes-ch2-47 | ✓ |
| 48 | 171 | notes-ch2_48 | notes-ch2-48 | ✓ |
| 49 | 173 | notes-ch2_49 | notes-ch2-49 | ✓ |
| 50 | 173 | notes-ch2_50 | notes-ch2-50 | ✓ |
| 51 | 176 | notes-ch2_51 | notes-ch2-51 | ✓ |

**Count: Body=51, Notes=51 → MATCH ✓**

---

### Chapter 3

**Body references (82 total, lines 187–253)** → href `#notes-ch3`
**Note entries (83 total, lines 820–903)** → ids `notes-ch3-1` through `notes-ch3-83`

| Body Ref # | Body Line | Body: id | Note Section id | Status |
|---|---|---|---|---|
| 1 | 187 | notes-ch3_1 | notes-ch3-1 | ✓ |
| 2 | 188 | notes-ch3_2 | notes-ch3-2 | ✓ |
| 3 | 188 | notes-ch3_3 | notes-ch3-3 | ✓ |
| 4 | 188 | notes-ch3_4 | notes-ch3-4 | ✓ |
| 5 | 189 | notes-ch3_5 | notes-ch3-5 | ✓ |
| 6 | 190 | notes-ch3_6 | notes-ch3-6 | ✓ |
| 7 | 190 | notes-ch3_7 | notes-ch3-7 | ✓ |
| 8 | 190 | notes-ch3_8 | notes-ch3-8 | ✓ |
| 9 | 191 | notes-ch3_9 | notes-ch3-9 | ✓ |
| 10 | 194 | notes-ch3_10 | notes-ch3-10 | ✓ |
| 11 | 195 | notes-ch3_11 | notes-ch3-11 | ✓ |
| 12 | 196 | notes-ch3_12 | notes-ch3-12 | ✓ |
| 13 | 197 | notes-ch3_13 | notes-ch3-13 | ✓ |
| 14 | 197 | notes-ch3_14 | notes-ch3-14 | ✓ |
| 15 | 199 | notes-ch3_15 | notes-ch3-15 | ✓ |
| 16 | 200 | notes-ch3_16 | notes-ch3-16 | ✓ |
| 17 | 200 | notes-ch3_17 | notes-ch3-17 | ✓ |
| 18 | 200 | notes-ch3_18 | notes-ch3-18 | ✓ |
| 19 | 201 | notes-ch3_19 | notes-ch3-19 | ✓ |
| 20 | 201 | notes-ch3_20 | notes-ch3-20 | ✓ |
| 21 | 201 | notes-ch3_21 | notes-ch3-21 | ✓ |
| 22 | 208 | notes-ch3_22 | notes-ch3-22 | ✓ |
| 23 | 208 | notes-ch3_23 | notes-ch3-23 | ✓ |
| 24 | 210 | notes-ch3_24 | notes-ch3-24 | ✓ |
| 25 | 211 | notes-ch3_25 | notes-ch3-25 | ✓ |
| 26 | 211 | notes-ch3_26 | notes-ch3-26 | ✓ |
| 27 | 212 | notes-ch3_27 | notes-ch3-27 | ✓ |
| 28 | 212 | notes-ch3_28 | notes-ch3-28 | ✓ |
| 29 | 213 | notes-ch3_29 | notes-ch3-29 | ✓ |
| 30 | 214 | notes-ch3_30 | notes-ch3-30 | ✓ |
| 31 | 214 | notes-ch3_31 | notes-ch3-31 | ✓ |
| 32 | 214 | notes-ch3_32 | notes-ch3-32 | ✓ |
| 33 | 215 | notes-ch3_33 | notes-ch3-33 | ✓ |
| 34 | 216 | notes-ch3_34 | notes-ch3-34 | ✓ |
| 35 | 216 | notes-ch3_35 | notes-ch3-35 | ✓ |
| 36 | 217 | notes-ch3_36 | notes-ch3-36 | ✓ |
| 37 | 217 | notes-ch3_37 | notes-ch3-37 | ✓ |
| 38 | 218 | notes-ch3_38 | notes-ch3-38 | ✓ |
| 39 | 218 | notes-ch3_39 | notes-ch3-39 | ✓ |
| 40 | 219 | notes-ch3_40 | notes-ch3-40 | ✓ |
| 41 | 219 | notes-ch3_41 | notes-ch3-41 | ✓ |
| 42 | 219 | notes-ch3_42 | notes-ch3-42 | ✓ |
| 43 | 219 | notes-ch3_43 | notes-ch3-43 | ✓ |
| 44 | 219 | notes-ch3_44 | notes-ch3-44 | ✓ |
| 45 | 219 | notes-ch3_45 | notes-ch3-45 | ✓ |
| 46 | 219 | notes-ch3_46 | notes-ch3-46 | ✓ |
| (47) | — | — (NOT IN BODY) | notes-ch3-47 | **✗ MISSING FROM BODY** |
| 48 | 220 | notes-ch3_48 | notes-ch3-48 | ✓ |
| 49 | 220 | notes-ch3_49 | notes-ch3-49 | ✓ |
| 50 | 220 | notes-ch3_50 | notes-ch3-50 | ✓ |
| 51 | 220 | notes-ch3_51 | notes-ch3-51 | ✓ |
| 52 | 221 | notes-ch3_52 | notes-ch3-52 | ✓ |
| 53 | 228 | notes-ch3_53 | notes-ch3-53 | ✓ |
| 54 | 228 | notes-ch3_54 | notes-ch3-54 | ✓ |
| 55 | 234 | notes-ch3_55 | notes-ch3-55 | ✓ |
| 56 | 234 | notes-ch3_56 | notes-ch3-56 | ✓ |
| 57 | 235 | notes-ch3_57 | notes-ch3-57 | ✓ |
| 58 | 236 | notes-ch3_58 | notes-ch3-58 | ✓ |
| 59 | 236 | notes-ch3_59 | notes-ch3-59 | ✓ |
| 60 | 237 | notes-ch3_60 | notes-ch3-60 | ✓ |
| 61 | 238 | notes-ch3_61 | notes-ch3-61 | ✓ |
| 62 | 238 | notes-ch3_62 | notes-ch3-62 | ✓ |
| 63 | 238 | notes-ch3_63 | notes-ch3-63 | ✓ |
| 64 | 238 | notes-ch3_64 | notes-ch3-64 | ✓ |
| 65 | 242 | notes-ch3_65 | notes-ch3-65 | ✓ |
| 66 | 242 | notes-ch3_66 | notes-ch3-66 | ✓ |
| 67 | 246 | notes-ch3_67 | notes-ch3-67 | ✓ |
| 68 | 246 | notes-ch3_68 | notes-ch3-68 | ✓ |
| 69 | 246 | notes-ch3_69 | notes-ch3-69 | ✓ |
| 70 | 246 | notes-ch3_70 | notes-ch3-70 | ✓ |
| 71 | 247 | notes-ch3_71 | notes-ch3-71 | ✓ |
| 72 | 247 | notes-ch3_72 | notes-ch3-72 | ✓ |
| 73 | 247 | notes-ch3_73 | notes-ch3-73 | ✓ |
| 74 | 248 | notes-ch3_74 | notes-ch3-74 | ✓ |
| 75 | 248 | notes-ch3_75 | notes-ch3-75 | ✓ |
| 76 | 250 | notes-ch3_76 | notes-ch3-76 | ✓ |
| 77 | 250 | notes-ch3_77 | notes-ch3-77 | ✓ |
| 78 | 251 | notes-ch3_78 | notes-ch3-78 | ✓ |
| 79 | 251 | notes-ch3_79 | notes-ch3-79 | ✓ |
| 80 | 251 | notes-ch3_80 | notes-ch3-80 | ✓ |
| 81 | 252 | notes-ch3_81 | notes-ch3-81 | ✓ |
| 82 | 252 | notes-ch3_82 | notes-ch3-82 | ✓ |
| 83 | 253 | notes-ch3_83 | notes-ch3-83 | ✓ |

**Count: Body=82 (unique), Notes=83 → MISMATCH ✗**
**Missing from body: ref #47 (notes-ch3_47) — exists in notes section (line 867, notes-ch3-47) but never referenced in body text**
**Actual body sup reference count (including duplicates): 82**

---

### Chapter 4

**Body references (62 unique numbers, lines 263–301)** → href `#notes-ch4`
**Note entries (63 total, lines 910–973)** → ids `notes-ch4-1` through `notes-ch4-63`

| Body Ref # | Body Line | Body: id | Note Section id | Status |
|---|---|---|---|---|
| 1 | 263 | notes-ch4_1 | notes-ch4-1 | ✓ |
| 2 | 263 | notes-ch4_2 | notes-ch4-2 | ✓ |
| 3 | 263 | notes-ch4_3 | notes-ch4-3 | ✓ |
| 4 | 263 | notes-ch4_4 | notes-ch4-4 | ✓ |
| 5 | 264 | notes-ch4_5 | notes-ch4-5 | ✓ |
| 6 | 264 | notes-ch4_6 | notes-ch4-6 | ✓ |
| 7 | 264 | notes-ch4_7 | notes-ch4-7 | ✓ |
| 8 | 265 | notes-ch4_8 | notes-ch4-8 | ✓ |
| 9 | 266 | notes-ch4_9 | notes-ch4-9 | ✓ |
| 10 | 266 | notes-ch4_10 | notes-ch4-10 | ✓ |
| 11 | 267 | notes-ch4_11 | notes-ch4-11 | ✓ |
| 12 | 267 | notes-ch4_12 | notes-ch4-12 | ✓ |
| 13 | 267 | notes-ch4_13 | notes-ch4-13 | ✓ |
| 14 | 267 | notes-ch4_14 | notes-ch4-14 | ✓ |
| 15 | 267 | notes-ch4_15 | notes-ch4-15 | ✓ |
| (16) | — | — | notes-ch4-16 | **✗ NOT IN BODY** |
| 17 | 268 | notes-ch4_17 | notes-ch4-17 | ✓ |
| 18 | 268 | notes-ch4_18 | notes-ch4-18 | ✓ |
| 19 | 268 | notes-ch4_19 | notes-ch4-19 | ✓ |
| 20 | 270 | notes-ch4_20 | notes-ch4-20 | ✓ |
| 21 | 270 | notes-ch4_21 | notes-ch4-21 | ✓ |
| 22 | 271 | notes-ch4_22 | notes-ch4-22 | ✓ |
| 23 | 271 | notes-ch4_23 | notes-ch4-23 | ✓ |
| 24 | 272 | notes-ch4_24 | notes-ch4-24 | ✓ |
| 25 | 272 | notes-ch4_25 | notes-ch4-25 | ✓ |
| 26 | 273 | notes-ch4_26 | notes-ch4-26 | ✓ |
| 27 | 273 | notes-ch4_27 | notes-ch4-27 | ✓ |
| 28 | 274 | notes-ch4_28 | notes-ch4-28 | ✓ |
| 29 | 280 | notes-ch4_29 | notes-ch4-29 | ✓ |
| 30 | 281 | notes-ch4_30 | notes-ch4-30 | ✓ |
| 31 | 291 | notes-ch4_31 | notes-ch4-31 | ✓ |
| 32 | 292 | notes-ch4_32 | notes-ch4-32 | ✓ |
| 33 | 292 | notes-ch4_33 | notes-ch4-33 | ✓ |
| 34 | 293 | notes-ch4_34 | notes-ch4-34 | ✓ |
| 35 | 293 | notes-ch4_35 | notes-ch4-35 | ✓ |
| 36 | 293 | notes-ch4_36 | notes-ch4-36 | ✓ |
| (37) | — | — | notes-ch4-37 | **✗ NOT IN BODY** |
| (38) | — | — | notes-ch4-38 | **✗ NOT IN BODY** |
| 39 | 294 | notes-ch4_39 | notes-ch4-39 | ✓ |
| 40 | 294 | notes-ch4_40 | notes-ch4-40 | ✓ |
| 41 | 294 | notes-ch4_41 | notes-ch4-41 | ✓ |
| 42 | 295 | notes-ch4_42 | notes-ch4-42 | ✓ |
| 43 | 295 | notes-ch4_43 | notes-ch4-43 | ✓ |
| 44 | 296 | notes-ch4_44 | notes-ch4-44 | ✓ |
| 45 | 296 | notes-ch4_45 | notes-ch4-45 | ✓ |
| 46 | 296 | notes-ch4_46 | notes-ch4-46 | ✓ |
| 47 | 300 | notes-ch4_47 | notes-ch4-47 | ✓ |
| 48 | 301 | notes-ch4_48 | notes-ch4-48 | ✓ |
| 49 | 293 | notes-ch4_49 | notes-ch4-49 | ✓ |
| 50 | 293 | notes-ch4_50 | notes-ch4-50 | ✓ |
| 51 | 293 | notes-ch4_51 | notes-ch4-51 | ✓ |
| 52 | 296 | notes-ch4_52 | notes-ch4-52 | ✓ |
| 53 | 293 | notes-ch4_53 | notes-ch4-53 | ✓ |
| 54 | 293 | notes-ch4_54 | notes-ch4-54 | ✓ |
| 55 | 293 | notes-ch4_55 | notes-ch4-55 | ✓ |
| 56 | 293 | notes-ch4_56 | notes-ch4-56 | ✓ |
| 57 | 295 | notes-ch4_57 | notes-ch4-57 | ✓ |
| 58 | 295 | notes-ch4_58 | notes-ch4-58 | ✓ |
| 59 | 295 | notes-ch4_59 | notes-ch4-59 | ✓ |
| 60 | 295 | notes-ch4_60 | notes-ch4-60 | ✓ |
| 61 | 295 | notes-ch4_61 | notes-ch4-61 | ✓ |
| 62 | 309 | notes-ch4_62 | notes-ch4-62 | ✓ |
| 63 | 309 | notes-ch4_63 | notes-ch4-63 | ✓ |

**Count: Body=62 (unique), Notes=63 → MISMATCH ✗**
**Missing from body: ref #16, #37, #38 (3 entries exist in notes but not in body)**
**Note: The body skips from #15 directly to #17, and from #36 directly to #39**

---

### Chapter 5

**Body references (42 total, lines 328–381)** → href `#notes-ch5`
**Note entries (42 total, lines 980–1022)** → ids `notes-ch5-1` through `notes-ch5-42`

| Body Ref # | Body Line | Body: id | Note Section id | Status |
|---|---|---|---|---|
| 1 | 328 | notes-ch5_1 | notes-ch5-1 | ✓ |
| 2 | 328 | notes-ch5_2 | notes-ch5-2 | ✓ |
| 3 | 337 | notes-ch5_3 | notes-ch5-3 | ✓ |
| 4 | 338 | notes-ch5_4 | notes-ch5-4 | ✓ |
| 5 | 338 | notes-ch5_5 | notes-ch5-5 | ✓ |
| 6 | 338 | notes-ch5_6 | notes-ch5-6 | ✓ |
| 7 | 340 | notes-ch5_7 | notes-ch5-7 | ✓ |
| 8 | 341 | notes-ch5_8 | notes-ch5-8 | ✓ |
| 9 | 341 | notes-ch5_9 | notes-ch5-9 | ✓ |
| 10 | 342 | notes-ch5_10 | notes-ch5-10 | ✓ |
| 11 | 342 | notes-ch5_11 | notes-ch5-11 | ✓ |
| 12 | 343 | notes-ch5_12 | notes-ch5-12 | ✓ |
| 13 | 344 | notes-ch5_13 | notes-ch5-13 | ✓ |
| 14 | 344 | notes-ch5_14 | notes-ch5-14 | ✓ |
| 15 | 344 | notes-ch5_15 | notes-ch5-15 | ✓ |
| 16 | 345 | notes-ch5_16 | notes-ch5-16 | ✓ |
| 17 | 345 | notes-ch5_17 | notes-ch5-17 | ✓ |
| 18 | 346 | notes-ch5_18 | notes-ch5-18 | ✓ |
| 19 | 346 | notes-ch5_19 | notes-ch5-19 | ✓ |
| 20 | 346 | notes-ch5_20 | notes-ch5-20 | ✓ |
| 21 | 346 | notes-ch5_21 | notes-ch5-21 | ✓ |
| 22 | 347 | notes-ch5_22 | notes-ch5-22 | ✓ |
| 23 | 348 | notes-ch5_23 | notes-ch5-23 | ✓ |
| 24 | 349 | notes-ch5_24 | notes-ch5-24 | ✓ |
| 25 | 350 | notes-ch5_25 | notes-ch5-25 | ✓ |
| 26 | 350 | notes-ch5_26 | notes-ch5-26 | ✓ |
| 27 | 350 | notes-ch5_27 | notes-ch5-27 | ✓ |
| 28 | 351 | notes-ch5_28 | notes-ch5-28 | ✓ |
| 29 | 352 | notes-ch5_29 | notes-ch5-29 | ✓ |
| 30 | 352 | notes-ch5_30 | notes-ch5-30 | ✓ |
| 31 | 352 | notes-ch5_31 | notes-ch5-31 | ✓ |
| 32 | 355 | notes-ch5_32 | notes-ch5-32 | ✓ |
| 33 | 355 | notes-ch5_33 | notes-ch5-33 | ✓ |
| 34 | 358 | notes-ch5_34 | notes-ch5-34 | ✓ |
| 35 | 366 | notes-ch5_35 | notes-ch5-35 | ✓ |
| 36 | 370 | notes-ch5_36 | notes-ch5-36 | ✓ |
| 37 | 370 | notes-ch5_37 | notes-ch5-37 | ✓ |
| 38 | 370 | notes-ch5_38 | notes-ch5-38 | ✓ |
| 39 | 373 | notes-ch5_39 | notes-ch5-39 | ✓ |
| 40 | 373 | notes-ch5_40 | notes-ch5-40 | ✓ |
| 41 | 380 | notes-ch5_41 | notes-ch5-41 | ✓ |
| 42 | 381 | notes-ch5_42 | notes-ch5-42 | ✓ |

**Count: Body=42, Notes=42 → MATCH ✓**

---

### Chapter 6

**Body references (63 total, lines 390–452)** → href `#notes-ch6`
**Note entries (63 total, lines 1028–1092)** → ids `notes-ch6-1` through `notes-ch6-63`

| Body Ref # | Body Line | Body: id | Note Section id | Status |
|---|---|---|---|---|
| 1 | 390 | notes-ch6_1 | notes-ch6-1 | ✓ |
| 2 | 391 | notes-ch6_2 | notes-ch6-2 | ✓ |
| 3 | 391 | notes-ch6_3 | notes-ch6-3 | ✓ |
| 4 | 391 | notes-ch6_4 | notes-ch6-4 | ✓ |
| 5 | 391 | notes-ch6_5 | notes-ch6-5 | ✓ |
| 6 | 392 | notes-ch6_6 | notes-ch6-6 | ✓ |
| 7 | 392 | notes-ch6_7 | notes-ch6-7 | ✓ |
| 8 | 392 | notes-ch6_8 | notes-ch6-8 | ✓ |
| 9 | 392 | notes-ch6_9 | notes-ch6-9 | ✓ |
| 10 | 393 | notes-ch6_10 | notes-ch6-10 | ✓ |
| 11 | 393 | notes-ch6_11 | notes-ch6-11 | ✓ |
| 12 | 394 | notes-ch6_12 | notes-ch6-12 | ✓ |
| 13 | 395 | notes-ch6_13 | notes-ch6-13 | ✓ |
| 14 | 395 | notes-ch6_14 | notes-ch6-14 | ✓ |
| 15 | 395 | notes-ch6_15 | notes-ch6-15 | ✓ |
| 16 | 395 | notes-ch6_16 | notes-ch6-16 | ✓ |
| 17 | 395 | notes-ch6_17 | notes-ch6-17 | ✓ |
| 18 | 398 | notes-ch6_18 | notes-ch6-18 | ✓ |
| 19 | 398 | notes-ch6_19 | notes-ch6-19 | ✓ |
| 20 | 398 | notes-ch6_20 | notes-ch6-20 | ✓ |
| 21 | 398 | notes-ch6_21 | notes-ch6-21 | ✓ |
| 22 | 398 | notes-ch6_22 | notes-ch6-22 | ✓ |
| 23 | 398 | notes-ch6_23 | notes-ch6-23 | ✓ |
| 24 | 399 | notes-ch6_24 | notes-ch6-24 | ✓ |
| 25 | 399 | notes-ch6_25 | notes-ch6-25 | ✓ |
| 26 | 400 | notes-ch6_26 | notes-ch6-26 | ✓ |
| 27 | 403 | notes-ch6_27 | notes-ch6-27 | ✓ |
| 28 | 404 | notes-ch6_28 | notes-ch6-28 | ✓ |
| 29 | 405 | notes-ch6_29 | notes-ch6-29 | ✓ |
| 30 | 405 | notes-ch6_30 | notes-ch6-30 | ✓ |
| 31 | 405 | notes-ch6_31 | notes-ch6-31 | ✓ |
| 32 | 406 | notes-ch6_32 | notes-ch6-32 | ✓ |
| 33 | 406 | notes-ch6_33 | notes-ch6-33 | ✓ |
| 34 | 407 | notes-ch6_34 | notes-ch6-34 | ✓ |
| 35 | 407 | notes-ch6_35 | notes-ch6-35 | ✓ |
| 36 | 407 | notes-ch6_36 | notes-ch6-36 | ✓ |
| 37 | 408 | notes-ch6_37 | notes-ch6-37 | ✓ |
| 38 | 408 | notes-ch6_38 | notes-ch6-38 | ✓ |
| 39 | 410 | notes-ch6_39 | notes-ch6-39 | ✓ |
| 40 | 410 | notes-ch6_40 | notes-ch6-40 | ✓ |
| 41 | 410 | notes-ch6_41 | notes-ch6-41 | ✓ |
| 42 | 410 | notes-ch6_42 | notes-ch6-42 | ✓ |
| 43 | 411 | notes-ch6_43 | notes-ch6-43 | ✓ |
| 44 | 416 | notes-ch6_44 | notes-ch6-44 | ✓ |
| 45 | 416 | notes-ch6_45 | notes-ch6-45 | ✓ |
| 46 | 417 | notes-ch6_46 | notes-ch6-46 | ✓ |
| 47 | 417 | notes-ch6_47 | notes-ch6-47 | ✓ |
| 48 | 422 | notes-ch6_48 | notes-ch6-48 | ✓ |
| 49 | 422 | notes-ch6_49 | notes-ch6-49 | ✓ |
| 50 | 423 | notes-ch6_50 | notes-ch6-50 | ✓ |
| 51 | 424 | notes-ch6_51 | notes-ch6-51 | ✓ |
| 52 | 425 | notes-ch6_52 | notes-ch6-52 | ✓ |
| 53 | 425 | notes-ch6_53 | notes-ch6-53 | ✓ |
| 54 | 428 | notes-ch6_54 | notes-ch6-54 | ✓ |
| 55 | 428 | notes-ch6_55 | notes-ch6-55 | ✓ |
| 56 | 428 | notes-ch6_56 | notes-ch6-56 | ✓ |
| 57 | 429 | notes-ch6_57 | notes-ch6-57 | ✓ |
| 58 | 429 | notes-ch6_58 | notes-ch6-58 | ✓ |
| 59 | 430 | notes-ch6_59 | notes-ch6-59 | ✓ |
| 60 | 430 | notes-ch6_60 | notes-ch6-60 | ✓ |
| 61 | 450 | notes-ch6_61 | notes-ch6-61 | ✓ |
| 62 | 452 | notes-ch6_62 | notes-ch6-62 | ✓ |
| 63 | 452 | notes-ch6_63 | notes-ch6-63 | ✓ |

**Count: Body=63, Notes=63 → MATCH ✓**

---

### Chapter 7

**Body references (49 total, lines 465–504)** → href `#notes-ch7`
**Note entries (49 total, lines 1098–1148)** → ids `notes-ch7-1` through `notes-ch7-49`

| Body Ref # | Body Line | Body: id | Note Section id | Status |
|---|---|---|---|---|
| 1 | 465 | notes-ch7_1 | notes-ch7-1 | ✓ |
| 2 | 465 | notes-ch7_2 | notes-ch7-2 | ✓ |
| 3 | 466 | notes-ch7_3 | notes-ch7-3 | ✓ |
| 4 | 467 | notes-ch7_4 | notes-ch7-4 | ✓ |
| 5 | 467 | notes-ch7_5 | notes-ch7-5 | ✓ |
| 6 | 467 | notes-ch7_6 | notes-ch7-6 | ✓ |
| 7 | 467 | notes-ch7_7 | notes-ch7-7 | ✓ |
| 8 | 467 | notes-ch7_8 | notes-ch7-8 | ✓ |
| 9 | 469 | notes-ch7_9 | notes-ch7-9 | ✓ |
| 10 | 469 | notes-ch7_10 | notes-ch7-10 | ✓ |
| 11 | 470 | notes-ch7_11 | notes-ch7-11 | ✓ |
| 12 | 470 | notes-ch7_12 | notes-ch7-12 | ✓ |
| 13 | 470 | notes-ch7_13 | notes-ch7-13 | ✓ |
| 14 | 470 | notes-ch7_14 | notes-ch7-14 | ✓ |
| 15 | 470 | notes-ch7_15 | notes-ch7-15 | ✓ |
| 16 | 471 | notes-ch7_16 | notes-ch7-16 | ✓ |
| 17 | 474 | notes-ch7_17 | notes-ch7-17 | ✓ |
| 18 | 475 | notes-ch7_18 | notes-ch7-18 | ✓ |
| 19 | 475 | notes-ch7_19 | notes-ch7-19 | ✓ |
| 20 | 476 | notes-ch7_20 | notes-ch7-20 | ✓ |
| 21 | 477 | notes-ch7_21 | notes-ch7-21 | ✓ |
| 22 | 477 | notes-ch7_22 | notes-ch7-22 | ✓ |
| 23 | 478 | notes-ch7_23 | notes-ch7-23 | ✓ |
| 24 | 480 | notes-ch7_24 | notes-ch7-24 | ✓ |
| 25 | 482 | notes-ch7_25 | notes-ch7-25 | ✓ |
| 26 | 483 | notes-ch7_26 | notes-ch7-26 | ✓ |
| 27 | 483 | notes-ch7_27 | notes-ch7-27 | ✓ |
| 28 | 483 | notes-ch7_28 | notes-ch7-28 | ✓ |
| 29 | 484 | notes-ch7_29 | notes-ch7-29 | ✓ |
| 30 | 486 | notes-ch7_30 | notes-ch7-30 | ✓ |
| 31 | 495 | notes-ch7_31 | notes-ch7-31 | ✓ |
| 32 | 496 | notes-ch7_32 | notes-ch7-32 | ✓ |
| 33 | 496 | notes-ch7_33 | notes-ch7-33 | ✓ |
| 34 | 496 | notes-ch7_34 | notes-ch7-34 | ✓ |
| 35 | 497 | notes-ch7_35 | notes-ch7-35 | ✓ |
| 36 | 497 | notes-ch7_36 | notes-ch7-36 | ✓ |
| 37 | 498 | notes-ch7_37 | notes-ch7-37 | ✓ |
| 38 | 498 | notes-ch7_38 | notes-ch7-38 | ✓ |
| 39 | 499 | notes-ch7_39 | notes-ch7-39 | ✓ |
| 40 | 499 | notes-ch7_40 | notes-ch7-40 | ✓ |
| 41 | 500 | notes-ch7_41 | notes-ch7-41 | ✓ |
| 42 | 500 | notes-ch7_42 | notes-ch7-42 | ✓ |
| 43 | 500 | notes-ch7_43 | notes-ch7-43 | ✓ |
| 44 | 502 | notes-ch7_44 | notes-ch7-44 | ✓ |
| 45 | 502 | notes-ch7_45 | notes-ch7-45 | ✓ |
| 46 | 502 | notes-ch7_46 | notes-ch7-46 | ✓ |
| 47 | 503 | notes-ch7_47 | notes-ch7-47 | ✓ |
| 48 | 503 | notes-ch7_48 | notes-ch7-48 | ✓ |
| 49 | 504 | notes-ch7_49 | notes-ch7-49 | ✓ |

**Count: Body=49, Notes=49 → MATCH ✓**

---

### Chapter 8

**Body references (79 total, lines 533–583)** → href `#notes-ch8`
**Note entries (79 total, lines 1154–1234)** → ids `notes-ch8-1` through `notes-ch8-79`

All 79 body references match corresponding note entries 1:1.
**Count: Body=79, Notes=79 → MATCH ✓**

---

### Chapter 9

**Body references (74 total, lines 591–651)** → href `#notes-ch9`
**Note entries (74 total, lines 1240–1315)** → ids `notes-ch9-1` through `notes-ch9-74`

All 74 body references match corresponding note entries 1:1.
**Count: Body=74, Notes=74 → MATCH ✓**

---

### Chapter 10

**Body references (20 total, lines 664–708)** → href `#notes-ch10`
**Note entries (20 total, lines 1322–1342)** → ids `notes-ch10-1` through `notes-ch10-20`

| Body Ref # | Body Line | Body: id | Note Section id | Status |
|---|---|---|---|---|
| 1 | 664 | notes-ch10_1 | notes-ch10-1 | ✓ |
| 2 | 664 | notes-ch10_2 | notes-ch10-2 | ✓ |
| 3 | 668 | notes-ch10_3 | notes-ch10-3 | ✓ |
| 4 | 670 | notes-ch10_4 | notes-ch10-4 | ✓ |
| 5 | 670 | notes-ch10_5 | notes-ch10-5 | ✓ |
| 6 | 670 | notes-ch10_6 | notes-ch10-6 | ✓ |
| 7 | 672 | notes-ch10_7 | notes-ch10-7 | ✓ |
| 8 | 672 | notes-ch10_8 | notes-ch10-8 | ✓ |
| 9 | 673 | notes-ch10_9 | notes-ch10-9 | ✓ |
| 10 | 678 | notes-ch10_10 | notes-ch10-10 | ✓ |
| 11 | 682 | notes-ch10_11 | notes-ch10-11 | ✓ |
| 12 | 683 | notes-ch10_12 | notes-ch10-12 | ✓ |
| 13 | 683 | notes-ch10_13 | notes-ch10-13 | ✓ |
| 14 | 684 | notes-ch10_14 | notes-ch10-14 | ✓ |
| 15 | 686 | notes-ch10_15 | notes-ch10-15 | ✓ |
| 16 | 688 | notes-ch10_16 | notes-ch10-16 | ✓ |
| 17 | 688 | notes-ch10_17 | notes-ch10-17 | ✓ |
| 18 | 692 | notes-ch10_18 | notes-ch10-18 | ✓ |
| 19 | 702 | notes-ch10_19 | notes-ch10-19 | ✓ |
| 20 | 702 | notes-ch10_20 | notes-ch10-20 | ✓ |

**Count: Body=20, Notes=20 → MATCH ✓**

---

## 3. Endnote Summary Table

| Chapter | Body Refs | Note Entries | Match? | Issues |
|---|---|---|---|---|
| 1 | 33 | 33 | ✓ | — |
| 2 | 51 | 51 | ✓ | — |
| 3 | 82 | 83 | ✗ | #47 missing from body |
| 4 | 62 | 63 | ✗ | #16, #37, #38 missing from body |
| 5 | 42 | 42 | ✓ | — |
| 6 | 63 | 63 | ✓ | — |
| 7 | 49 | 49 | ✓ | — |
| 8 | 79 | 79 | ✓ | — |
| 9 | 74 | 74 | ✓ | — |
| 10 | 20 | 20 | ✓ | — |
| **Total** | **555** | **557** | **2 mismatches** | 4 orphaned note entries |

### Notes on skipped numbers
- **Chapter 3**: body skips from #46 directly to #48. notes-ch3-47 exists in notes (line 867) but is never referenced in body.
- **Chapter 4**: body skips from #15 to #17, and from #36 to #39. notes-ch4-16, notes-ch4-37, notes-ch4-38 exist in notes but are never referenced in body.

---

## 4. Footnotes (Symbol References)

### 4.1 Body References

Body footnote references use `*`, `†`, `‡` symbols. There are 128 body references, numbered `footnote-000` through `footnote-131` (with gaps: 82–85 unused in body).

| # | Symbol | Body Line | Context |
|---|---|---|---|
| 131 | * | 58 | `...如果不这样，他们将面对Jack的怒火。<sup>` |
| 130 | * | 92 | `...偏爱研究生活在恐龙脚下的小型生物。<sup>` |
| 129 | * | 93 | `...到处都是旱獭的牙齿。<sup>` |
| 128 | * | 100 | `...血红蛋白中的关键成分<sup>` |
| 127 | * | 116 | `...体内这种"腐败的牛奶"的存在导致...<sup>` |
| 126 | * | 131 | `...因精通芜菁种植技艺而在历史上占有一席之地，<sup>` |
| 125 | * | 137 | `...圣安东尼之火（St. Anthony's Fire）...<sup>` |
| 124 | * | 148 | `...罗马人在战争时期改变铸币工艺的原因。<sup>` |
| 123 | * | 149 | `...关于两足行走进化的文章。<sup>` |
| 122 | * | 153 | `...使他的研究经费更难获得，<sup>` |
| 121 | * | 163 | `关于 Covid-19，<sup>` |
| 120 | † | 163 | `...死于该病的几率约为 1%。<sup>` |
| 119 | * | 164 | `...恶性变种和出血性变种。它们几乎杀死了所有感染者。<sup>` |
| 118 | † | 166 | `...巨大的关注来试图击败它。<sup>` |
| 117 | * | 169 | `...代代相传的说法当然是可信的。<sup>` |
| 116 | * | 173 | `...需要先去除坏血，<sup>` |
| 115 | * | 178 | `...This is mine!<sup>` |
| 114 | * | 190 | `...Washington 写信给大陆军医院院长 William Shippen，<sup>` |
| 113 | * | 191 | `...挑战像英国这样强大的帝国 bully 并建立独立是可能的。<sup>` |
| 112 | † | 192 | `"If the king isn't a god,"（"如果国王不是神，"）<sup>` |
| 111 | ‡ | 192 | `...那我们还在被灌输什么鬼话？"）<sup>` |
| 110 | * | 198 | `...敖德萨行医——那里当时属于俄罗斯，今天属于乌克兰——<sup>` |
| 109 | * | 200 | `...放血看起来并没有产生医生们认为的那种美妙效果。<sup>` |
| 108 | † | 200 | `腿部伤口发炎？在腿上放满水蛭。<sup>` |
| 107 | * | 201 | `...所有这些患者都被放了血，<sup>` |
| 106 | * | 205 | `...我的科学记者蜘蛛感应启动了。<sup>` |
| 105 | * | 206 | `..."Bacteria Carrying Gifts"<sup>` |
| 104 | † | 206 | `...给一位代谢组学专家打了电话。<sup>` |
| 103 | * | 211 | `...出于科学目的切割尸体是禁忌，<sup>` |
| 102 | * | 211 | `..."We paid fifty sous apiece for our subject,"<sup>` |
| 101 | * | 220 | `..."jejeune and fizzenless dreamings"...<sup>` |
| 100 | * | 222 | `...将来他的某个学生能找到一种方法...<sup>` |
| 99 | * | 233 | `...Holmes 一起在巴黎参加过 Pierre Louis 的讲座，<sup>` |
| 98 | * | 243 | `...我还是因为直言不讳而受到了严厉批评。<sup>` |
| 97 | † | 243 | `...（接上条）<sup>` |
| 96 | * | 249 | `...它哺乳但没有乳头？<sup>` |
| 95 | * | 250 | `...核糖体...所产生的核酸序列...<sup>` |
| 94 | * | 254 | `...被出版在各地的生物学教科书中。<sup>` |
| 93 | * | 279 | `...Mary 不是男性。<sup>` |
| 92 | * | 280 | `...为自己之前竟然没有考虑过...<sup>` |
| 91 | † | 282 | `...因性别而更严厉地批评某人是否正确...<sup>` |
| 90 | * | 293 | `...铃声让所有人充满恐惧。<sup>` |
| 89 | * | 295 | `...心理状况不可能产生物理变化...<sup>` |
| 88 | * | 301 | `...系统性地将 Kati 的名字从待发表的论文中删除了。<sup>` |
| 87 | * | 309 | `...导致自己生病的世界级专家。<sup>` |
| 86 | * | 309 | `...会热心支持她的工作...<sup>` |
| 81 | * | 327 | `...该大学曾有机会向 Kati 道歉，却拒绝了。<sup>` |
| 80 | * | 328 | `...他拒绝了她使用这些资源。<sup>` |
| 79 | * | 329 | `...一家名为 BioNTech 的鲜为人知的公司工作。<sup>` |
| 78 | * | 332 | `...病毒学家张永振提供的丰富遗传信息宝库，<sup>` |
| 77 | * | 333 | `...将世界从悬崖边缘拉回的疫苗就不会被创造出来。<sup>` |
| 76 | * | 339 | `...或许可以为它们提供保护。<sup>` |
| 75 | † | 341 | `...在空气中暴露一夜削弱了这种...细菌，<sup>` |
| 74 | * | 342 | `...理解取悦资助他的有权势之人的重要性。<sup>` |
| 73 | † | 343 | `...细菌感染通常很容易用抗生素治疗。<sup>` |
| 72 | * | 346 | `...然后将其暴露于一种称为石炭酸的防腐物质...<sup>` |
| 71 | * | 354 | `...利用放射治疗前列腺癌的世界级领袖。<sup>` |
| 70 | † | 355 | `...show that he was in fact a better scientist...<sup>` |
| 69 | * | 360 | `...统计学能力尚可并不意味着...<sup>` |
| 68 | * | 362 | `...我还得解决这些地方出现的问题。<sup>` |
| 67 | * | 364 | `...所以我被分派了很多恐龙方面的论文来报道。<sup>` |
| 66 | * | 365 | `...与当时我非常需要的 200 英镑说了再见。<sup>` |
| 65 | * | 367 | `...早已过了因指出问题而受到经济惩罚的日子。<sup>` |
| 64 | * | 372 | `..."Why the heck aren't we mentioning this technique...<sup>` |
| 63 | * | 374 | `...桌上的麦芽酒实际上已经在冰箱里放了几个小时。<sup>` |
| 62 | * | 391 | `...外科医生就可以更容易地切开皮肉。<sup>` |
| 61 | * | 395 | `...直到他臀部受伤并死于感染。<sup>` |
| 60 | * | 396 | `...空气中的有毒物质是导致感染的原因。<sup>` |
| 59 | * | 405 | `...次氯酸钙或 Ca(ClO)₂。<sup>` |
| 58 | * | 406 | `...他批准了这位匈牙利人在病房试用...<sup>` |
| 57 | * | 414 | `...我不认为他有意识地反对变革。<sup>` |
| 56 | * | 422 | `...硝酸汞具有可怕的毒性。<sup>` |
| 55 | † | 423 | `...放在显微镜下研究...<sup>` |
| 54 | * | 433 | `...我刚刚花了四年时间学习地质学、生物学、化学和物理学。<sup>` |
| 53 | † | 433 | `...我去那里不是为了搞物理，<sup>` |
| 52 | * | 435 | `...用通俗易懂的英语介绍科学界的最新动态...<sup>` |
| 51 | † | 435 | `...我们使用更大、更复杂的词语时会认为别人不那么聪明<sup>` |
| 50 | * | 437 | `...寻找岩石捕获地球磁场的证据。<sup>` |
| 49 | * | 438 | `...'你发表了多少论文，你的 H 指数是多少'<sup>` |
| 48 | * | 449 | `...我在一个广泛接受这一观点的世界中长大。<sup>` |
| 47 | † | 450 | `...看起来有些相似的动物...来源于同一个祖先。<sup>` |
| 46 | * | 470 | `...狂犬病患者攻击周围的人...<sup>` |
| 45 | † | 471 | `...是否比结核病、伤寒或霍乱稍微不那么糟糕？<sup>` |
| 44 | * | 489 | `...他们手上都沾满了血。<sup>` |
| 43 | * | 490 | `...Michaelis 的自杀无疑是悲剧性的...<sup>` |
| 42 | * | 495 | `...除了电子显微镜之外根本无法检测到。<sup>` |
| 41 | * | 499 | `...保持他的叙事简单而引人入胜。<sup>` |
| 40 | † | 499 | `...这确实是！<sup>` |
| 39 | * | 501 | `...公开展示的结果从未被怀疑过，<sup>` |
| 38 | † | 502 | `...伤口在攻击后不久就被彻底烧灼了。<sup>` |
| 37 | * | 514 | `...一位副总编辑...表达了他多么喜欢那些专栏文章样本。<sup>` |
| 36 | * | 516 | `...哺乳动物的孤雌激活体无法长期存活。<sup>` |
| 35 | † | 517 | `...下一步并不容易。<sup>` |
| 34 | * | 519 | `...我面前的研究人员泪流满面。<sup>` |
| 33 | * | 522 | `...都是为了控制叙事...<sup>` |
| 32 | † | 522 | `...最终对科学更有利。<sup>` |
| 31 | * | 524 | `...杀死了其他物种。<sup>` |
| 30 | † | 524 | `...《拯救犀牛蛆虫》...<sup>` |
| 29 | * | 541 | `...他们的支持在帮助 Darwin 的思想得以延续方面发挥了关键作用。<sup>` |
| 28 | * | 551 | `...是时候谈谈 Galileo Galilei 了。<sup>` |
| 27 | * | 552 | `...金星...有相位变化...<sup>` |
| 26 | † | 552 | `...Tycho Brahe 的工作，<sup>` |
| 25 | * | 554 | `...Cardinal Robert Bellarmine 警告停止...<sup>` |
| 24 | * | 560 | `..."严格审查"的字样，这在当时是酷刑的代号。<sup>` |
| 23 | * | 562 | `...住在豪华的托斯卡纳驻罗马大使馆。<sup>` |
| 22 | * | 564 | `...（250年后），才弄清楚他也没有受到酷刑。<sup>` |
| 21 | † | 566 | `...宗教裁判所追捕异端了。<sup>` |
| 20 | * | 575 | `...在场许多人认为正确的观念相悖，<sup>` |
| 19 | * | 593 | `..."在实践中演示"...<sup>` |
| 18 | * | 597 | `...佩斯-布达医学会、<sup>` |
| 17 | * | 598 | `...当 1848 年革命到来时，<sup>` |
| 16 | * | 612 | `...温度确实很重要。<sup>` |
| 15 | * | 612 | `...《经济学人》报道)...<sup>` |
| 14 | * | 618 | `...用烧红的烙铁来摧毁引起狂犬病的病原体。<sup>` |
| 13 | † | 618 | `...打上烙铁在 Lister 看来不切实际。<sup>` |
| 12 | * | 626 | `...发明了今天我们在急救课程中学习的心肺复苏术。<sup>` |
| 11 | * | 631 | `...通过写作和演讲分享他的发现时，<sup>` |
| 10 | * | 646 | `...反复赞扬针压法的优点。<sup>` |
| 9 | * | 659 | `..."They were right to fire her..."<sup>` |
| 8 | * | 664 | `...至少获得一次NIH资助的几率从2003年的43%下降到2015年的31%。<sup>` |
| 7 | † | 664 | `...总共花费了547个工作<i>年</i>...<sup>` |
| 6 | * | 665 | `...她的回答变得混乱。<sup>` |
| 5 | * | 668 | `...申请人是否来自哈佛或苏黎世联邦理工学院...<sup>` |
| 4 | * | 676 | `...确实有一些可敬的人在这么做——<sup>` |
| 3 | * | 677 | `...追查从事不道德行为者的调查员<sup>` |
| 2 | * | 684 | `...期刊不向研究人员发放现金，<sup>` |
| 1 | * | 706 | `...铁一般的道德，<sup>` |
| 0 | * | 708 | `...通过一种与生俱来的同情纽带相互联系。<sup>` |

### 4.2 Footnote Section Entries (lines 1368–1499)

| # | Symbol | Line | Text Start |
|---|---|---|---|
| 131 | * | 1368 | 这绝非等闲之事。我非常敬重Jack... |
| 130 | * | 1369 | Bill用"critters"这个词时总是指哺乳动物... |
| 129 | * | 1370 | 牙齿表面覆盖着一层能够承受酸（以及可口可乐）浸泡的牙釉质... |
| 128 | * | 1371 | Mary和Jack最终弄清楚，他们看到的并非严格意义上的血细胞... |
| 127 | * | 1372 | 这个想法大错特错，但能想出这个点子的人绝对值得为创意加分。 |
| 126 | * | 1373 | 英国人称之为swede，加拿大人称之为Swedish turnip... |
| 125 | * | 1374 | 该疾病的名字据说也源于一个观察... |
| 124 | * | 1375 | 他们在回收利用！... |
| 123 | * | 1376 | 当你二十多年来每周都要写一位不同的研究者时... |
| 122 | * | 1377 | 我觉得像Dan这样成就斐然的人竟然在争取研究经费方面遇到困难... |
| 121 | * | 1378 | 而且，在整个疫情期间每周7天、每天24小时都在报道这该死的疾病... |
| 120 | † | 1379 | 值得指出的是，在中国武汉的疫情震中，2020年初的死亡率超过了20%... |
| 119 | * | 1380 | 鉴于这本书不属于恐怖题材，我就不描述那些更致命的版本是什么样子了... |
| 118 | † | 1381 | 人们也可以说——而且我也会这么说——由于天花... |
| 117 | * | 1382 | 厚着脸皮打个广告，我的书<i>Science of the Magical</i>讲的就是这类东西... |
| 116 | * | 1383 | 一个毫无证据支持的论点。 |
| 115 | * | 1384 | 我的！我自己的！我的宝贝！ |
| 114 | * | 1385 | 这个职位后来被称为美国卫生总长（US Surgeon General）。 |
| 113 | * | 1386 | 考虑到我称之为家的那个潮湿的小岛，我写这句话时得压低声音。 |
| 112 | † | 1387 | 他显然不是，因为没有闪电劈下来击倒刽子手... |
| 111 | ‡ | 1388 | 好吧，他们并没有完全那样说，但你懂我的意思。 |
| 110 | * | 1389 | 至少目前如此…… |
| 109 | * | 1390 | 很震惊，对吧？ |
| 108 | † | 1391 | 睾丸发炎？呃……我们别聊这个了。 |
| 107 | * | 1392 | 在当时，不这样做对Louis来说风险太大... |
| 106 | * | 1393 | 是的，真有这回事。不需要放射性蜘蛛。只需要十年的科学报道经验。 |
| 105 | * | 1394 | 明白了吗？这种疫苗被称为"BCG"... |
| 104 | † | 1395 | 这可不是一个朗朗上口的术语... |
| 103 | * | 1396 | 顺便说一句，这些因素促使医学生转而盗墓... |
| 102 | * | 1397 | 这相当于今天的多少钱呢？好吧，当时二十苏（sous）兑换一法郎... |
| 101 | * | 1398 | 虽然Meigs是个货真价实的A级混蛋... |
| 100 | * | 1399 | 他的儿子Oliver Wendell Holmes Jr.后来成为美国最高法院的副大法官... |
| 99 | * | 1400 | 他极有可能从未听说过Louis。 |
| 98 | * | 1401 | 顺便说一句，如果你们中的任何怀疑论者现在正在读这本书... |
| 97 | † | 1402 | 同样值得一提的是，如果不是我的一些导师持有相反观点... |
| 96 | * | 1403 | 是的，这确实存在。针鼹和鸭嘴兽是从皮肤渗出乳汁... |
| 95 | * | 1404 | 我不打算在这里讲得太技术性... |
| 94 | * | 1405 | 值得指出的是，在他去世五年后，科学家们发现所有复杂生命... |
| 93 | * | 1406 | 我知道这听起来很蠢，但这话必须说。 |
| 92 | * | 1407 | Elizabeth（我的导师们称她为Betsy）是我崇拜的偶像之一... |
| 91 | † | 1408 | 确实，我觉得在当今这个时代竟然还需要写下这样的话... |
| 90 | * | 1409 | 还记得在新冠疫情封锁初期，救护车不绝于耳的警笛声... |
| 89 | * | 1410 | 我们现在知道这是错误的。把一个人吓到足够程度... |
| 88 | * | 1411 | Kati回忆说，其中一篇发表在著名期刊... |
| 87 | * | 1412 | 我们的身体奇妙地适应了在酷热天气下长距离持续追捕猎物... |
| 86 | * | 1413 | 坦白说，鉴于近期的大幅预算削减... |
| 85 | * | 1414 | (*) — **ORPHANED (never referenced in body)** |
| 84 | * | 1415 | (*) — **ORPHANED (never referenced in body)** |
| 83 | † | 1416 | (†) — **ORPHANED (never referenced in body)** |
| 82 | * | 1417 | (*) — **ORPHANED (never referenced in body)** |
| 81 | * | 1418 | 更具体地说，在电子邮件交流中... |
| 80 | * | 1419 | 这其中有着真正的讽刺意味... |
| 79 | * | 1420 | 除了联系大学征求意见之外... |
| 78 | * | 1421 | 在本国政府告诉他不要分享的情况下... |
| 77 | * | 1422 | 值得指出的是，他们自己也是站在巨人的肩膀上... |
| 76 | * | 1423 | 引起鸡霍乱的细菌与引起人霍乱的细菌没有遗传关系... |
| 75 | † | 1424 | 尽管Pasteur不理解这一过程... |
| 74 | * | 1425 | 他是个出色的表演家和老练的操纵者。 |
| 73 | † | 1426 | 尽管这种情况正在迅速改变... |
| 72 | * | 1427 | 一种当时在英国被证明极其重要的化合物。记住它…… |
| 71 | * | 1428 | 我不确定他是否还用着那个车牌... |
| 70 | † | 1429 | 我觉得颇为耐人寻味的是... |
| 69 | * | 1430 | 我赶紧强调一下"某种程度上"这个词... |
| 68 | * | 1431 | 在CERN这尤其棘手... |
| 67 | * | 1432 | 这其实有点荒谬... |
| 66 | * | 1433 | 令人恼火的是，他们最后还是让别人写了那篇该死的文章。 |
| 65 | * | 1434 | 顺便说一句，拒绝向指出论文中存在问题的年轻科学记者支付报酬... |
| 64 | * | 1435 | 这正是Pasteur的欺诈行为本可以被揭露的地方... |
| 63 | * | 1436 | 多年前通过了公民考试后... |
| 62 | * | 1437 | 我所说的"容易"是指没有人大喊"天哪，杀了我吧！"... |
| 61 | * | 1438 | 你可能更熟悉作为Barnum & Bailey马戏团... |
| 60 | * | 1439 | Potter在<i>The Lancet</i>上的讣告总结道... |
| 59 | * | 1440 | 虽然你可能认不出这种粉末状白色固体形式的化合物... |
| 58 | * | 1441 | 尽管有大量证据表明Klein是一个怀恨在心的人... |
| 57 | * | 1442 | 只要这种改变不涉及推翻奥地利贵族阶层。 |
| 56 | * | 1443 | 这与当时制帽匠在处理毛毡和皮毛时使用的物质相同... |
| 55 | † | 1444 | 坦白说，它们确实是，因为当时的医院简直就是各种微生物的温床。 |
| 54 | * | 1445 | 我还抽时间学习了语言学、神经学、遗传学... |
| 53 | † | 1446 | 考虑到那里是世界上许多顶尖物理学家工作的地方... |
| 52 | * | 1447 | Punter是英国俚语，指非专业人士... |
| 51 | † | 1448 | 由心理学家Danny Oppenheimer撰写... |
| 50 | * | 1449 | 这最常见于富含铁的熔岩从火山喷出并落到地面时... |
| 49 | * | 1450 | H指数是一种通过考察一位作者的研究成果被他人引用的频率... |
| 48 | * | 1451 | 大多数情况下被广泛接受，至少... |
| 47 | † | 1452 | 虽然这听起来像是Buffon在Darwin之前就弄清楚了进化论... |
| 46 | * | 1453 | 如果被狼咬了一口就"变成"野兽... |
| 45 | † | 1454 | 我一个都不想得，非常感谢。 |
| 44 | * | 1455 | 字面意义上的。你见过婴儿出生时附带的东西吗？... |
| 43 | * | 1456 | 现实点说，如果我们被告知自己无意中害死了数百人... |
| 42 | * | 1457 | 不幸的是，对Pasteur来说，这项技术直到他去世几十年后的1931年才被发明出来。 |
| 41 | * | 1458 | 如果他今天还活着，他完全有资格接任迪士尼那个难填的CEO空缺。 |
| 40 | † | 1459 | 这确实是！ |
| 39 | * | 1460 | 如果Pasteur没有事先百分之百确定一切会按他的计划进行... |
| 38 | † | 1461 | 虽然把烧红的烙铁插进被动物咬伤的伤口听起来很可怕... |
| 37 | * | 1462 | 他还非常善意地审阅了本书... |
| 36 | * | 1463 | 我们过去认为爬行动物和鸟类也是如此... |
| 35 | † | 1464 | 说到不容易，我们说的是有人必须把胳膊伸进一头性情温顺的... |
| 34 | * | 1465 | 虽然有些记者——比如那些经常报道自然灾害或战争的记者... |
| 33 | * | 1466 | 同样值得指出的是，仅仅因为我提出了犀牛故事的选题... |
| 32 | † | 1467 | 更不用说对犀牛也更好了... |
| 31 | * | 1468 | 我觉得用"有魅力的"这个词来形容加州神鹰非常奇怪... |
| 30 | † | 1469 | 那些将卵喷入濒危犀牛鼻孔内... |
| 29 | * | 1470 | 你会注意到我写的是"ideas"而不是"idea"... |
| 28 | * | 1471 | 你不会真以为我写一整本关于那些因正确而被搞砸的科学家的书... |
| 27 | * | 1472 | 当金星位于太阳相对于地球的另一侧时... |
| 26 | † | 1473 | Tycho Brahe曾主张其他行星绕太阳运行，但太阳绕地球运行。 |
| 25 | * | 1474 | 警告远比那要长得多... |
| 24 | * | 1475 | 这与美国当局在9·11恐怖袭击后... |
| 23 | * | 1476 | Galileo显然和此人也非常要好。 |
| 22 | * | 1477 | 我绝不是想说Galileo的遭遇是公平的或有趣的... |
| 21 | † | 1478 | 尽管我夜不能寐... |
| 20 | * | 1479 | 全都是相信精灵的人…… |
| 19 | * | 1480 | 一个前所未见的激进观念。 |
| 18 | * | 1481 | 布达和佩斯在当时是多瑙河两岸各自独立的双子城。 |
| 17 | * | 1482 | 请注意，这正是Semmelweis在维也纳跟随Klein期间... |
| 16 | * | 1483 | 它如何重要我还不能透露... |
| 15 | * | 1484 | 记得在确定发表日期后把论文的接近最终版的校样发给我... |
| 14 | * | 1485 | 没有人明白狂犬病是一种病毒... |
| 13 | † | 1486 | 当然，它确实是。 |
| 12 | * | 1487 | 重要安全提示：除非你确实有行医执照... |
| 11 | * | 1488 | 可悲的是，这些论文全都是用匈牙利语写的... |
| 10 | * | 1489 | Simpson的意图一点也不隐晦... |
| 9 | * | 1490 | 你会注意到我没有在这里署名... |
| 8 | * | 1491 | 而且那是十多年前的事了... |
| 7 | † | 1492 | 这篇论文颇具喜剧效果地以轻描淡写的语气结尾... |
| 6 | * | 1493 | 为这本书采访她时，跟上她的思路是一生中最大的新闻挑战... |
| 5 | * | 1494 | 顺便说一句，我报道过的一些最优秀的技术和工程研究都出自ETH... |
| 4 | * | 1495 | 近年来，出现了一小群专职的科学义警... |
| 3 | * | 1496 | 说实话，他们将成为科学界的哈利·波特中的傲罗。 |
| 2 | * | 1497 | 许多期刊实际上通过收取出版费来抽走资金... |
| 1 | * | 1498 | 老实说，大多数人都有一个崩溃点... |
| 0 | * | 1499 | 是的，我在这里paraphrase了Einstein的... |

### 4.3 Footnote Cross-Check Summary

| Check | Details | Status |
|---|---|---|
| Body refs matched to definitions | 128 body refs (footnote-000 to footnote-131, excluding 082–085) | ✓ All match |
| Orphaned definitions (defined, never referenced) | footnote-082, footnote-083, footnote-084, footnote-085 | **✗ 4 orphans** |
| Orphaned references (referenced, never defined) | None | ✓ |

Note: The 4 orphaned definitions likely correspond to footnotes that were present in the original English book but were removed/didn't appear in this Chinese translation. Their text is:
- **footnote-082** (line 1417): *你懂我的意思。老实说，我只是厌倦了写"太阳、星星和天气"这种老套说法。*
- **footnote-083** (line 1416, †): *温暖环境中的老鼠喝得更多、尿得更多...*
- **footnote-084** (line 1415, *): *话虽如此，随着近年来伦敦房价飙升...*
- **footnote-085** (line 1414, *): *我写"通常又脏又冷"是因为这个群体中有一部分并非如此...*

---

## 5. Duplicate IDs

15 IDs appear twice — all cases follow the pattern: the `<section>` element and its child `<h2>`/`<h3>` heading share the same `id`:

| ID | Lines | Notes |
|---|---|---|
| `int` | 23, 24 | `<section id="int">` + `<h2 id="int">` |
| `ch1` | 66, 67 | `<section id="ch1">` + `<h2 id="ch1">` |
| `ch2` | 127, 128 | `<section id="ch2">` + `<h2 id="ch2">` |
| `ch3` | 183, 184 | `<section id="ch3">` + `<h2 id="ch3">` |
| `ch4` | 259, 260 | `<section id="ch4">` + `<h2 id="ch4">` |
| `ch5` | 323, 324 | `<section id="ch5">` + `<h2 id="ch5">` |
| `ch6` | 385, 386 | `<section id="ch6">` + `<h2 id="ch6">` |
| `ch7` | 461, 462 | `<section id="ch7">` + `<h2 id="ch7">` |
| `ch8` | 529, 530 | `<section id="ch8">` + `<h2 id="ch8">` |
| `ch9` | 587, 588 | `<section id="ch9">` + `<h2 id="ch9">` |
| `ch10` | 655, 656 | `<section id="ch10">` + `<h2 id="ch10">` |
| `not` | 715, 716 | `<section id="not">` + `<h2 id="not">` |
| `sec1` | 718, 719 | `<section id="sec1">` + `<h3 id="sec1">` |
| `ack` | 1347, 1348 | `<section id="ack">` + `<h2 id="ack">` |
| `abouttheauthor` | 1356, 1357 | `<section id="abouttheauthor">` + `<h2 id="abouttheauthor">` |

**Verdict**: These are intentional (present in all chapters + endnotes/acknowledgements), but technically invalid HTML (duplicate IDs). The browser uses the first occurrence.

---

## 6. Broken Href Targets (Critical Issue)

**Every single endnote body reference** (`<sup><a href="#notes-chN">`) points to a target `#notes-chN` that does NOT exist anywhere in the HTML.

Here is the root cause:

**Body text structure (example from line 70):**
```html
<sup><a href="#notes-ch1" id="notes-ch1_1" role="doc-noteref">1</a></sup>
```
- `href="#notes-ch1"` — should scroll to `id="notes-ch1"`, but NO such element exists
- `id="notes-ch1_1"` — defines a backlink target for note #1 in chapter 1

**Endnotes section structure (lines 718–721):**
```html
<section aria-labelledby="sec1" id="sec1">
<h3 class="BMH1" id="sec1">第1章</h3>
<ol class="footnotes">
<li id="notes-ch1-1">...
```
- The anchor for the chapter 1 notes section is `id="sec1"`, not `id="notes-ch1"`
- Individual note items have `id="notes-ch1-1"`, `id="notes-ch1-2"`, etc. (using hyphens)

**Alternative fix for endnote section heading IDs:**
- The section headings should have `id="notes-ch1"`, `id="notes-ch2"`, etc. instead of (or in addition to) `id="sec1"`, `id="sec2"`, etc.

**Note item target mismatch:**
- Body backlink IDs: `notes-ch1_1` (underscore between ch and num)
- Note item IDs: `notes-ch1-1` (hyphen between ch and num)

These are not used as href targets in the body → note direction (body uses `href="#notes-ch1"` not `href="#notes-ch1_1"`), so the underscore vs hyphen difference is not a direct link issue. However, the endnote section backlinks (line 721) have:
```html
<a hidden="hidden" href="chapter1.xhtml#notes-ch1_1">1.</a>
```
This uses `chapter1.xhtml#notes-ch1_1` — a cross-file link for EPUB format, not the single-page HTML.

---

## 7. Overall Verdict

| Category | Status |
|---|---|
| Endnote body references ↔ note entries | **2 mismatches** (Ch3 missing #47, Ch4 missing #16, #37, #38) |
| Footnote body references ↔ definitions | **4 orphaned definitions** (082–085) |
| Duplicate IDs | 15 pairs (intentional but technically invalid) |
| All footnote href targets valid | ✓ |
| **All endnote href targets valid** | **✗ CRITICAL — every endnote sup link points to non-existent `#notes-chN`** |

### Recommended Fixes
1. **Endnote href**: Change each body sup href from `#notes-chN` to `#secN` (e.g., `href="#notes-ch1"` → `href="#sec1"`)
2. **Orphaned footnotes 082–085**: Either add references in body text, or remove the unused footnote entries.
3. **Missing body refs**: Either add superscript references in body for notes-ch3-47, notes-ch4-16, notes-ch4-37, notes-ch4-38, or remove the unused note entries.
4. **Duplicate IDs**: Remove `id` from the heading element to keep only the section-level id (or vice versa).
