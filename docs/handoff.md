# สถานะงาน Follow-up Board
อัปเดต: 17 กันยายน 2026 — เอกสารส่งต่องานให้แชตใหม่ อ่านไฟล์จริงก่อนแก้ไข เพราะผู้ใช้อาจเปลี่ยนแล้ว

## กฎที่ตกลงกัน
- อ่าน AGENTS.md และ docs/spec.md ก่อนทำงาน และอ่านคู่มือ Next.js ใน node_modules/next/dist/docs/ ก่อนเขียนโค้ดที่เกี่ยวข้อง
- ทำเฉพาะงานที่ผู้ใช้สั่งในแต่ละครั้ง ไม่เพิ่ม feature, logic, UI หรือแก้ส่วนอื่นเอง
- ใช้แพ็กเกจ stable ล่าสุดและตรวจ compatibility; ห้าม beta/canary/experimental
- ไม่รัน npm run build ผู้ใช้จะทดสอบเอง
- ประหยัด token: ตอบสั้น อ่านเฉพาะไฟล์ที่จำเป็น ไม่ดึงประวัติหรือผลเครื่องมือขนาดใหญ่ ไม่ใช้ sub-agent ถ้าไม่ได้สั่ง
- อัปเดตเอกสารนี้เมื่อจบงานที่เปลี่ยนสถานะสำคัญ โดยไม่บันทึกรหัสผ่านหรือ connection string

## โปรเจกต์และข้อกำหนด
- โฟลเดอร์: /Users/kritnarinp/Desktop/Codecamp_23/agentic/Project01D2
- แอปจัดการรายชื่อผู้ติดต่อ สถานะ และวันติดตาม
- Next.js 16.3.5, React 19.2.8, TypeScript, Tailwind 4
- เป้าหมายฐานข้อมูล: Supabase PostgreSQL + Prisma Client + PG adapter
- ไฟล์ข้อกำหนดผู้ติดต่อจริงคือ docs/feature/contacts.md (ผู้ใช้เรียก contracts.md)
- ใช้ URL /contracts และเมนู Contracts ตามเอกสาร แม้คำ Contact/Contract จะปะปนกัน
- ช่องข้อมูล: name, company, email, tel, contract, interest, status (New/inprogress/close), followupDate, comment

## งานที่ทำแล้ว
- MCP Stitch เชื่อมต่อและ list_projects/list_screens สำเร็จ
- Stitch project: 1610285645734780716 — Follow-up Board Web App
- Contacts List screen: 84de840ed826493283d8f7500910b6da
- มีดีไซน์ Dashboard, Today's Follow-ups, Contacts List, Add/Edit Contact ใน Stitch; ไม่ได้หมายความว่าทุกหน้าถูกสร้างในแอปแล้ว
- /dashboard มีอยู่เดิม; สร้าง /contracts แล้ว โดยอ้างอิง HTML จาก Stitch และ Sidebar เดิม
- src/components/Contracts.tsx: ค้นหา กรองสถานะ สรุปจำนวน ดูรายละเอียด เพิ่ม แก้ไข ลบพร้อมยืนยัน ผ่าน React state
- src/data/contracts.mock.ts: ข้อมูลจำลอง 6 รายชื่อ; รีเฟรชแล้วกลับค่าเริ่มต้น ยังไม่เชื่อม DB
- เพิ่ม pg 8.23.0 และ @types/pg 8.23.1 แล้ว
- package.json ปัจจุบันมี @prisma/client 7.10.0, @prisma/adapter-pg 7.10.0, prisma ^7.10.0, dotenv ^17.4.2
- ก่อนหน้านี้ผู้ใช้ขอเพิ่ม Prisma เฉพาะ manifest; ตอนสั่ง init ตรวจพบ Prisma CLI 7.10.0 ติดตั้งอยู่แล้ว
- รัน prisma init --datasource-provider postgresql: สร้าง prisma/schema.prisma, .env, prisma7.config.ts
- init ค้างขั้นตอนติดตั้ง agent skills จึงหยุดขั้นตอนนั้นหลังไฟล์ถูกสร้าง
- config เดิม prisma.config.ts ใช้ definePrismaConfig ที่ไม่รองรับ จึงแก้เป็น defineConfig และเติม schema/migrations/datasource โดยเก็บค่า skills เดิม
- มี config สองไฟล์: prisma.config.ts และ prisma7.config.ts; prisma validate ล่าสุดแจ้งโหลด prisma7.config.ts อย่าลบ/รวมโดยไม่มีงานที่เกี่ยวข้อง
- schema ใช้ generator prisma-client, output ../src/generated/prisma, datasource postgresql; ยังไม่มี business models
- .env มี DATABASE_URL ตัวอย่าง ณ ตอน init; ห้ามพิมพ์ค่า secret ออกมา ตรวจสถานะจริงก่อนใช้
- ยังไม่ได้เชื่อม Supabase, migrate, db push หรือ generate Client

## งาน Authentication ล่าสุด
- ติดตั้ง `better-auth` และ `@better-auth/prisma-adapter`
- เพิ่ม `src/lib/prisma.ts` ใช้ PrismaPg adapter เชื่อม PostgreSQL ของ Supabase
- เพิ่ม `src/lib/auth.ts` เปิด Email/Password และ `nextCookies`
- เพิ่ม API route `src/app/api/auth/[...all]/route.ts`
- เพิ่มหน้า `src/app/sign-up/page.tsx` และ `src/app/sign-in/page.tsx`
- เพิ่มปุ่ม Sign out ใน `src/components/Sidebar.tsx` เรียก Better Auth และ redirect ไป `/sign-in`
- เพิ่ม `proxy.ts` ป้องกัน `/dashboard` และ `/contracts` เมื่อไม่มี Better Auth session cookie โดย redirect ไป `/sign-in`
- เพิ่ม `src/lib/auth-guard.ts` ตรวจ session จริงด้วย `auth.api.getSession` ใน Server Components ของ `/dashboard` และ `/contracts`
- เพิ่มโมเดล Prisma มาตรฐานของ Better Auth: `User`, `Session`, `Account`, `Verification`
- `npx prisma db push` สำเร็จเมื่อรันด้วย network ภายนอก sandbox; Supabase sync แล้ว
- `npx prisma generate` และ `npx tsc --noEmit` ผ่าน
- เพิ่มโมเดล `Contact` ตาม `docs/feature/contacts.md` พร้อม relation แบบ optional กับ `User`
- รัน `db push` และ `generate` สำเร็จ; เพิ่มข้อมูลตัวอย่าง 6 รายการด้วย `prisma/contacts-seed.sql`
- หน้า `/contracts` เชื่อม `GET/POST/PATCH/DELETE /api/contacts` แล้ว และส่ง session cookie สำหรับ CRUD จริง
- เพิ่ม Vitest + Testing Library + jsdom สำหรับ UI และเพิ่ม `src/components/Contracts.test.tsx` ซึ่งผ่าน 1 test
- เพิ่ม `vitest.config.ts`, `vitest.setup.ts` และ script `npm test`
- ยังไม่ได้ทดสอบ flow สมัครสมาชิก/เข้าสู่ระบบ/Sign out และ route protection ผ่าน browser; TypeScript ผ่านหลังเพิ่ม server guard
- เปลี่ยน `src/app/globals.css` จากธีม arcade (พื้นม่วงเข้ม/พิกเซล) เป็น minimal paper สไตล์ Goodnote (พื้นครีมลายจุดจาง, หมึกเข้ม, การ์ดขาวครีม); แตะเฉพาะไฟล์ CSS ไม่ได้แก้ component

## การตรวจที่ผ่านมา
- หน้า /contracts: TypeScript ผ่าน; lint ไม่มี error แต่มีคำเตือนเดิมเรื่อง fonts 3 รายการ; ยังไม่ได้ทดสอบ browser interaction
- ก่อนทราบกฎห้าม build: Webpack build ผ่าน แต่ Turbopack ติดข้อจำกัดเปิดพอร์ต ปัจจุบันไม่ให้รัน build
- หลัง Prisma init: prisma validate และ npx tsc --noEmit ผ่าน

## จุดที่หยุด / งานต่อไป
- ไม่มีคำสั่งพัฒนาใหม่ค้างอยู่ รอผู้ใช้ระบุงานถัดไป
- อย่าเริ่มทำ schema, CRUD API, migration หรือแทน mock data อัตโนมัติ เว้นแต่ผู้ใช้สั่ง
- หากแก้ schema ให้ใช้ `npx prisma db push` และ `npx prisma generate`; ห้ามใช้ `npx prisma migrate dev`
- ผู้ใช้ต้องการประหยัด token: ตั้งค่า Codex default เป็น gpt-5.6-luna, reasoning low, verbosity low แล้วใน ~/.codex/config.toml; ไม่ยืนยันว่าแชตที่เปิดอยู่เปลี่ยนโมเดลแล้ว
