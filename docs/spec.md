#Follow-up Board
Webapp สำหรับจัดการรายชื่อผู้ติดต่อ แสดง สถานะและวัน ติดตาม

#Techstack
-Node.js
-Typescirpt
-Prisma ใช้ PG Adaptor ด้วย ใช้ Client ด้วย
-Supabase PostgreSQL
-Better Auth สำหรับ Email/Password authentication
-Better Auth



## setup  Roles
-ใช้packageเวอชั่นล่าสุด
-ห้ามใช้ Beta canary Expriment version
-หากจำเป็นต้องใช้ package ให้ตรวจสอบความเข้ากัน Next.js 

## Working Rule 
-ทำเฉพาะงานที่สั่ง ในแต่ละครั้ง
-ห้ามเพิ่ม feature logic หรือ ui
-ห้าม แก้ไข ส่วนที่ไม่เกี่ยวข้องกับงานเดิม
-ไม่ต้อง npm run buildเด๊่ยวทดสอบเอง

## Authentication
-สมัครสมาชิกที่ `/sign-up`
-เข้าสู่ระบบที่ `/sign-in`
-เข้าสู่ระบบสำเร็จไป `/dashboard`
-มีปุ่ม Sign out ใน Sidebar และกลับไป `/sign-in` หลังออกจากระบบ
-ใช้ Better Auth ผ่าน Prisma adapter บน Supabase PostgreSQL

## Access
- เข้าดูข้อมูลภายในได้จะต้องเป็น User ที่ล็อกอินอยู่
- ผู้ใช้ดูเพิ่ม แก้ไข และลบได้เฉพาะ Contact ของตัวเอง


