# Research: หัวข้อบทความรอบเดือน ส.ค. 2026

เอกสารนี้เป็น research note สำหรับวางแผนบทความ ไม่ใช่โพสต์ที่เผยแพร่
(ตัวเว็บอ่านโพสต์จาก `content/blog/` เท่านั้น ไฟล์ในโฟลเดอร์นี้จึงไม่ขึ้นหน้าเว็บ)

ข้อมูลทั้งหมดตรวจสอบกับแหล่งต้นทาง ณ วันที่ 4 ส.ค. 2026

---

## 1. สรุปสไตล์บล็อกปัจจุบัน

อ่านจากโพสต์ที่มีอยู่ 4 ชิ้น (`content/blog/`) ได้ pattern ชัดเจน:

| มิติ | สิ่งที่เป็นอยู่ |
|------|----------------|
| ภาษา | อังกฤษทั้งหมด |
| ความยาว | 300–500 คำ ติดป้าย 5–10 min read |
| โครงเรื่อง | เจอปัญหา → วัดผล → เจอต้นเหตุ → แก้ → บทเรียน |
| น้ำเสียง | บุคคลที่หนึ่งพหูพจน์ ("we"), ถ่อมตัว, ไม่ขายของ |
| โค้ด | 1 บล็อกต่อโพสต์ สั้น รันได้จริง มี output/ตัวเลขกำกับ |
| หัวข้อย่อย | H2 เดียวช่วงท้าย เป็นบทสรุปบทเรียน |
| tags | Go, Performance, TypeScript, SQL, Code Quality |
| ตัวเลข | เป็นพระเอกเสมอ (800ms → 60ms, 4s → 12ms) |

**ช่องว่างที่เห็น:** ทุกโพสต์อยู่ปี 2025 และยังไม่มีชิ้นไหนแตะของใหม่ปี 2026
ทั้งที่ปีนี้มีของที่ตรงกับสายของบล็อกนี้มาก (Go + TypeScript + performance)
โพสต์ปี 2026 สักชิ้นจะทำให้บล็อกดู "ยังมีชีวิต" และมีโอกาสถูกค้นเจอสูงกว่ามาก

---

## 2. ไอเดียบทความ (เรียงตามความน่าเขียน)

### #1 — Goroutine leaks: จาก "เดา" เป็น "พิสูจน์" ด้วย Go 1.26

**Hook:** เมื่อก่อนดู `/debug/pprof/goroutine` แล้วเดาว่าตัวไหนค้างถาวร
ตอนนี้ runtime ตอบให้ตรง ๆ ผ่าน `/debug/pprof/goroutineleak`

**ทำไมเหมาะที่สุด:** เป็นภาคต่อโดยตรงของ *Profiling a Go service that handles 50k requests
per second* ที่ผู้อ่านเดิมชอบอยู่แล้ว — เครื่องมือเดิม (pprof) ปัญหาใหม่ (memory ที่ค่อย ๆ
รั่วแทน CPU) และมีโค้ดที่รันได้จริงให้เล่นตาม

**ข้อเท็จจริงที่ตรวจแล้ว:**
- Go 1.26 ออก 10 ก.พ. 2026 เพิ่ม profile ชนิดใหม่ชื่อ `goroutineleak` ใน `runtime/pprof`
- เปิดด้วย `GOEXPERIMENT=goroutineleakprofile` ตอน build; นำเข้า `net/http/pprof`
  แล้วจะได้ endpoint `/debug/pprof/goroutineleak` อัตโนมัติ
- นิยาม leak: goroutine ที่บล็อกอยู่บน primitive (channel, `sync.Mutex`, `sync.Cond`)
  ซึ่ง **unreachable** จาก goroutine ที่ยังรันได้ → ปลุกไม่ขึ้นแน่นอน จึงไม่มี false positive
- ตรวจโดยอาศัย GC cycle พิเศษ ที่เกิดตอนเรียก `WriteTo` เท่านั้น จึงไม่มี overhead ตอนไม่ใช้
- ทีม Go บอกว่า implementation "production-ready" ที่ยังเป็น experiment เพราะรอ feedback
  เรื่อง API และตั้งใจเปิดเป็น default ใน Go 1.27
- ข้อจำกัดที่ต้องเขียนให้ตรง: จับไม่ได้ถ้า primitive ยัง reachable ผ่าน global variable
  หรือ local variable ของ goroutine ที่ยังรันอยู่

**Outline:**
1. อาการ: RSS ไต่ขึ้นเรื่อย ๆ, goroutine count ไม่ยอมลง, restart แล้วหาย (ชั่วคราว)
2. ทำไม `/debug/pprof/goroutine` ไม่พอ — มันบอกว่า "บล็อกอยู่ตรงไหน" ไม่ได้บอกว่า
   "จะได้ไปต่อไหม"
3. ตัวการคลาสสิก: unbuffered channel + early return (ใช้ตัวอย่าง fan-out/collect)
4. เปิด experiment แล้วอ่าน profile จริง
5. ทางแก้: buffer ให้พอ หรือ `context` + `select` และปิดท้ายด้วยการใส่เช็คใน `TestMain`
6. บทเรียน: อ่านต่อจากรุ่นก่อน — วัดก่อนเดา แต่รอบนี้ของที่วัดได้เพิ่งจะวัดได้

**Tags:** `["Go", "Performance"]` · ประมาณ 7 min read

**แหล่งอ้างอิง:**
- https://go.dev/doc/go1.26 (หัวข้อ Experimental goroutine leak profile)
- https://go.dev/blog/go1.26
- https://github.com/golang/go/issues/74609 (proposal + รายละเอียด API)

> ร่างเต็มอยู่ที่ `content/drafts/hunting-goroutine-leaks-in-production-go.md`

---

### #2 — Green Tea GC: performance ที่ได้ฟรีโดยไม่ต้องแก้โค้ดสักบรรทัด

**Hook:** อัปเกรด Go แล้ว p99 ดีขึ้นเอง — แล้วมันดีขึ้นเพราะอะไรกันแน่

**ข้อเท็จจริงที่ตรวจแล้ว:**
- Green Tea GC เป็น default แล้วใน Go 1.26 (เคยเป็น experiment ใน 1.25)
- ทีม Go คาดว่าลด GC overhead ได้ 10–40% ในโปรแกรมที่ใช้ GC หนัก
- ได้เพิ่มอีกราว 10% บน CPU ใหม่ (Intel Ice Lake / AMD Zen 4 ขึ้นไป) เพราะใช้ vector
  instruction ในการ scan object เล็ก
- ปิดได้ด้วย `GOEXPERIMENT=nogreenteagc` แต่ทางออกนี้จะถูกถอดใน Go 1.27
- ของแถมในรุ่นเดียวกัน: cgo overhead ลดราว 30%, compiler วาง slice backing store
  บน stack ได้บ่อยขึ้น

**มุมที่ทำให้ไม่ซ้ำใคร:** อย่าเขียนสรุป release note (มีคนเขียนเยอะแล้ว) ให้เขียนเป็น
"before/after ของ service ตัวเอง" — วัด `GODEBUG=gctrace=1` ก่อน/หลัง แล้วเทียบ
GC CPU fraction กับ p99 จริง เป็นบทความที่ต่อยอดจากสาย profiling ของบล็อกโดยตรง

**Tags:** `["Go", "Performance"]` · 6 min read

**แหล่งอ้างอิง:** https://go.dev/doc/go1.26 · https://go.dev/blog/go1.26

---

### #3 — TypeScript 7: type-checker ที่เขียนด้วย Go

**Hook:** บล็อกนี้เขียนทั้ง Go และ TypeScript อยู่แล้ว — ปีนี้สองอย่างนี้มาบรรจบกันพอดี

**ข้อเท็จจริงที่ตรวจแล้ว:**
- TypeScript 7.0 ออก 8 ก.ค. 2026 เป็น native port เขียนด้วย Go (โค้ดเนม Project Corsa)
- Microsoft รายงาน full build เร็วขึ้น 8–12x; ตัวเลขทางการที่ `--checkers 8`:
  vscode 125.7s → 7.51s (16.7x), sentry 139.8s → 12.08s, bluesky 24.3s → 2.01s,
  playwright 12.8s → 1.16s, tldraw 11.2s → 1.06s
- flag ใหม่: `--checkers` (default 4), `--builders` สำหรับ project references,
  `--singleThreaded` สำหรับ debug หรือ CI ที่ทรัพยากรจำกัด
- ข้อควรระวังใหญ่: 7.0 **ยังไม่มี** programmatic API เครื่องมืออย่าง typescript-eslint,
  Volar (Vue), Svelte, Astro, MDX, Angular template checking จึงยังใช้ไม่ได้
  ต้องรอ 7.1; ระหว่างนี้ลงคู่กันได้ผ่าน `@typescript/typescript6` (ได้ binary `tsc6`)
- ชื่อ `tsgo` เลิกใช้แล้ว ทุกอย่างกลับมาเป็น `tsc`

**มุมที่แนะนำ:** ไม่ใช่ข่าว แต่เป็น "checklist การย้ายจริง" — ใครย้ายได้เลย ใครควรรอ 7.1,
ตั้ง `--checkers` เท่าไรบน CI runner ที่ core น้อย, และทำไมควรแยก type-check ออกจาก build
เข้ากับธีมเดิมของโพสต์ *Type-safe API clients without code generation* ได้ดี

**Tags:** `["TypeScript", "Performance"]` · 8 min read

**แหล่งอ้างอิง:**
- https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
- https://github.com/microsoft/typescript-go/discussions/4576 (ยืนยันสถานะ `tsgo`)

---

### #4 — Postgres 18 async I/O: ตอนที่ EXPLAIN ANALYZE เริ่มโกหก

**Hook:** ภาคต่อของ *Slow queries I have known and loved* — คราวนี้ตัวเลขที่เคยเชื่อได้
เริ่มเชื่อไม่ได้

**ข้อเท็จจริงที่ตรวจแล้ว:**
- Postgres 18 (ออก 25 ก.ย. 2025) เพิ่ม async I/O ผ่านพารามิเตอร์ `io_method`
  สามค่า: `sync`, `worker` (ค่า default), `io_uring` (Linux kernel 5.1+ และต้อง build
  ด้วย `--with-liburing`)
- เบนช์มาร์กของ pganalyze บน `c7i.8xlarge` + EBS (sequential scan 3.5 GB):
  PG17 sync 15,830ms · PG18 sync 15,071ms · PG18 worker 10,052ms · PG18 io_uring 5,723ms
- ข้อสังเกตที่ทำให้บทความมีน้ำหนัก: `io_uring` ไม่ได้ชนะเสมอ — checksum และ memcpy
  เข้า shared buffers เกิดใน backend process เอง จึงไปกิน CPU ที่ควรใช้รันคิวรี
  ส่วน `worker` กระจาย overhead ออกไปให้ process อื่น
- workload แบบ OLTP point lookup ผ่าน B-tree แทบไม่ได้ประโยชน์ ส่วน index range scan
  บางเคสดีขึ้นระดับ 5–10x
- ผลข้างเคียงด้าน observability: `EXPLAIN ANALYZE` อาจรายงาน I/O ต่ำกว่าจริง
  ต้องดู view ใหม่ `pg_aios` และ `pg_stat_io` ประกอบ

**Tags:** `["SQL", "Performance"]` · 9 min read

**แหล่งอ้างอิง:**
- https://pganalyze.com/blog/postgres-18-async-io
- https://www.credativ.de/en/blog/postgresql-en/postgresql-18-asynchronous-disk-i-o-deep-dive-into-implementation/
- https://news.ycombinator.com/item?id=45412494 (คอมเมนต์จาก committer เรื่องทำไม default เป็น worker)

---

### #5 — Go 1.26 ลบ helper package ของผมทิ้งไปสามตัว

**Hook:** โพสต์แนวสบาย ๆ สั้น ๆ เรื่องโค้ดที่ได้ "ลบ" ไม่ใช่โค้ดที่ได้เขียนเพิ่ม

**ข้อเท็จจริงที่ตรวจแล้ว:**
- `new` รับ expression ได้แล้ว: `new(yearsSince(born))` แทน generic helper `ptr[T]()`
  ที่แทบทุกโค้ดเบสมี
- `errors.AsType[T]` เป็นเวอร์ชัน generic ของ `errors.As` — type-safe กว่า เร็วกว่า
  และตัดการประกาศตัวแปรทิ้ง ๆ ก่อน `if` ออกไป
- generic type อ้างถึงตัวเองใน type parameter list ได้แล้ว (ทำ builder/tree แบบ
  type-safe ได้โดยไม่ต้องหนีไป `any`)
- `go fix` ถูกเขียนใหม่บน analysis framework เดียวกับ `go vet` มี modernizer
  ราว 24 ตัวคอยเสนอแก้โค้ดเก่าให้เป็นสำนวนใหม่แบบอัตโนมัติ
- `slog.NewMultiHandler`, `io.ReadAll` เร็วขึ้นราวเท่าตัว

**ทำไมน่าเขียน:** เข้าธีมเดียวกับ *On readable code* — โค้ดที่อ่านง่ายที่สุดคือโค้ดที่ไม่มี
และเป็นโพสต์ที่ใช้แรงน้อย เหมาะคั่นระหว่างชิ้นยาว

**Tags:** `["Go", "Code Quality"]` · 5 min read

**แหล่งอ้างอิง:** https://go.dev/doc/go1.26 · https://go.dev/blog/go1.26

---

### #6 — (เชิงความเห็น) เครื่องมือของภาษาหนึ่ง ถูกเขียนด้วยอีกภาษาหนึ่ง

**Hook:** type-checker ของ TypeScript เขียนด้วย Go, ส่วน Go ก็เพิ่งได้ SIMD กับ GC ใหม่
เพื่อไล่ตามงานที่เคยเป็นของ C++ — เรากำลังเห็นการจัดตำแหน่งใหม่ของ tooling ทั้งวงการ

**วัตถุดิบที่มี:** Project Corsa เลือก Go เพราะ native speed + shared-memory
multithreading; Go 1.26 เพิ่ม `simd/archsimd` (ทดลอง, ต้อง `GOEXPERIMENT=simd`),
`runtime/secret`, `crypto/hpke` — ทิศทางชัดว่า Go ขยับไปหางาน performance-critical

**ข้อควรระวัง:** เป็นบทความความเห็น ต้องมีจุดยืนของตัวเองชัด ไม่งั้นจะกลายเป็นบทสรุปข่าว
ควรเขียนหลังจากมีชิ้น #1 หรือ #3 ปูพื้นไว้แล้ว

**Tags:** `["Go", "TypeScript"]` · 6 min read

---

## 3. ตารางสรุปเพื่อเลือก

| # | หัวข้อ | แรงที่ใช้ | ความสดของข่าว | ต่อยอดโพสต์เดิม |
|---|--------|-----------|----------------|-------------------|
| 1 | Goroutine leak profile | กลาง | สูง | ต่อจาก pprof โดยตรง |
| 2 | Green Tea GC | ต่ำ–กลาง | สูง | ต่อจาก pprof |
| 3 | TypeScript 7 migration | กลาง–สูง | สูงมาก | ต่อจากสาย TypeScript |
| 4 | Postgres 18 async I/O | สูง (ต้องเบนช์เอง) | กลาง | ต่อจาก slow queries |
| 5 | Go 1.26 ลบโค้ดทิ้ง | ต่ำ | กลาง | ต่อจาก readable code |
| 6 | Go/TS convergence | กลาง | กลาง | ธีมรวมของบล็อก |

**ลำดับที่แนะนำ:** #1 → #3 → #2 → #5 → #4 → #6
เริ่มที่ #1 เพราะได้ทั้งความสด ความต่อเนื่องจากโพสต์ที่ดีที่สุดของบล็อก และมีโค้ดให้เล่นจริง

---

## 4. ข้อควรระวังก่อนกดเผยแพร่

- ตัวเลขในร่าง (`content/drafts/`) ที่เป็นเรื่องเล่าของ service ตัวเอง เช่น RSS หรือ
  จำนวน goroutine เป็น **ตัวอย่างที่ต้องแทนด้วยของจริง** ก่อนเผยแพร่ ส่วนตัวเลขที่อ้าง
  จากเอกสารทางการถูกตรวจแล้วและอ้างแหล่งไว้ในไฟล์นี้
- ทั้ง goroutine leak profile และ `simd/archsimd` ยังเป็น experiment ต้องเขียนกำกับ
  ให้ชัด และควรทวนสถานะอีกครั้งเมื่อ Go 1.27 ออก (คาดว่า ส.ค. 2026) เพราะแผนคือ
  เปิด leak profile เป็น default
- สถานะ TypeScript 7.1 (คาดราว ต.ค. 2026) จะเปลี่ยนคำแนะนำใน #3 ไปพอสมควร
  ถ้าเขียนช้าให้ทวนก่อน
- การเผยแพร่: ย้ายไฟล์จาก `content/drafts/` ไป `content/blog/` แล้วเช็ค frontmatter
  ให้ครบ (`title`, `excerpt`, `date`, `readTime`, `tags`, `year`) — ตัว loader อ่านฟิลด์
  เหล่านี้ตรง ๆ และใช้ `year` ในการกรองหน้า blog
