export type FollowUp = {
  id: string;
  name: string;
  company: string;
  statusLabel: string;
  statusTone: "overdue" | "call" | "doc" | "demo";
  phone?: string;
  detail?: string;
  note: string;
  assignee?: string;
  timeLabel: string;
  priorityLabel?: string;
  initials: string;
  avatarColor: string;
};

export const kpis = [
  { id: "total", label: "ผู้ติดต่อทั้งหมด", sub: "Total Contacts", value: "248", unit: "ราย", icon: "groups", delta: "+12% วีคนี้" },
  { id: "due", label: "ต้องติดตามวันนี้", sub: "Due Today", value: "6", unit: "ราย", icon: "notification_important", delta: "กำหนดส่งวันนี้" },
  { id: "overdue", label: "เกินกำหนดติดตาม", sub: "Overdue", value: "2", unit: "ราย", icon: "warning", delta: "เตือนด่วน" },
  { id: "done", label: "ติดตามสำเร็จแล้ว", sub: "Completed", value: "184", unit: "ราย", icon: "task_alt", delta: "74% Success" },
] as const;

export const followUps: FollowUp[] = [
  {
    id: "siriporn",
    name: "ศิริพร วงศ์สุวรรณ",
    company: "Green Agri Tech",
    statusLabel: "เกินกำหนด 1 วัน (เมื่อวาน)",
    statusTone: "overdue",
    phone: "089-987-6543",
    detail: "ต้องโทรซ้ำด่วน",
    note: "โทรไม่ติดเมื่อวาน ติดต่อฝ่ายจัดซื้อไม่ได้ แอดมินแจ้งว่าสะดวกช่วงบ่าย 13:30 น. เป็นต้นไป ต้องโทรซ้ำเพื่อยืนยันใบ PO",
    assignee: "คุณนภัสสร",
    timeLabel: "ผู้รับผิดชอบ: คุณนภัสสร",
    priorityLabel: "High Priority",
    initials: "ศว",
    avatarColor: "bg-rose-100 text-rose-700",
  },
  {
    id: "kittisak",
    name: "กิตติศักดิ์ อานันท์",
    company: "บจก. สยาม โลจิสติกส์",
    statusLabel: "นัดโทรติดตาม (10:30 น.)",
    statusTone: "call",
    phone: "081-234-5678",
    detail: "Enterprise Deal ฿450,000",
    note: "สนใจแพ็กเกจ Enterprise ส่งใบเสนอราคาฉบับปรับปรุง 30 User ไปทางอีเมลแล้ว ลูกค้าขอนัดสายเพื่อเจรจาส่วนลด Payment terms 60 วัน",
    timeLabel: "นัดหมาย: วันนี้ 10:30 น. (อีก 45 นาที)",
    priorityLabel: "รอคอนเฟิร์ม PO",
    initials: "กอ",
    avatarColor: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "waraporn",
    name: "วราภรณ์ สุขประเสริฐ",
    company: "TechNova Co.",
    statusLabel: "ส่งเอกสารสัญญา (14:00 น.)",
    statusTone: "doc",
    detail: "LINE @varaporn",
    note: "ขอใบหัก ณ ที่จ่าย 3% และไฟล์สัญญาฉบับแก้ไขเงื่อนไข SLA แบบลงนาม Digital Signature ผ่านช่องทาง LINE",
    timeLabel: "กำหนดส่งเอกสาร: 14:00 น. วันนี้",
    priorityLabel: "พร้อมทำสัญญา",
    initials: "วส",
    avatarColor: "bg-sky-100 text-sky-700",
  },
  {
    id: "pakpoom",
    name: "ภาคภูมิ ธนาสิทธิ์",
    company: "BKK Retail Group",
    statusLabel: "นัด Demo ระบบออนไลน์ (16:00 น.)",
    statusTone: "demo",
    phone: "pakpoom@bkkretail.com",
    detail: "Google Meet",
    note: "ผู้บริหารระดับสูง 3 ท่านเข้าร่วม นัดหมายผ่าน Google Meet เพื่อชมการสาธิตฟีเจอร์ Multi-store Tracking เตรียม Slide สรุป ROI 15 นาทีแรก",
    timeLabel: "เวลาจัดประชุม: 16:00 - 17:00 น.",
    priorityLabel: "3 ผู้บริหารเข้าร่วม",
    initials: "ภท",
    avatarColor: "bg-amber-100 text-amber-700",
  },
];

export const statusBreakdown = [
  { label: "ลูกค้าเป้าหมายใหม่ (New Leads)", value: 34, pct: "14%", dot: "bg-sky-500" },
  { label: "กำลังติดต่อ / เจรจา (In Discussion)", value: 58, pct: "23%", dot: "bg-indigo-600" },
  { label: "นัดหมาย / ส่งใบเสนอราคา", value: 26, pct: "10%", dot: "bg-amber-500" },
  { label: "ปิดการขายสำเร็จ (Closed Won)", value: 112, pct: "45%", dot: "bg-emerald-600", highlight: true },
  { label: "ยังไม่สนใจ / พักการติดต่อ", value: 18, pct: "8%", dot: "bg-slate-400" },
];

export const activities = [
  {
    icon: "call",
    bg: "bg-emerald-100 text-emerald-700",
    user: "กิตติพงษ์ (Sales)",
    time: "10 นาทีที่แล้ว",
    text: "โทรคุยกับ คุณสมศักดิ์ (SCG Logistics) ยืนยันสัญญารายปี เรียบร้อยแล้ว",
    sub: "เปลี่ยนสถานะเป็น Closed Won",
  },
  {
    icon: "rate_review",
    bg: "bg-sky-100 text-sky-700",
    user: "นภัสสร รัตนเวช",
    time: "45 นาทีที่แล้ว",
    text: "ส่งใบเสนอราคา Enterprise ให้ลูกค้า บจก. สยาม โลจิสติกส์",
  },
  {
    icon: "person_add",
    bg: "bg-[#e2dfff] text-[#3525cd]",
    user: "ระบบนำเข้าอัตโนมัติ",
    time: "2 ชม. ที่แล้ว",
    text: "เพิ่ม Lead ใหม่ 3 ราย จากแบบฟอร์มหน้าเว็บไซต์ Web Contact Form",
  },
  {
    icon: "schedule",
    bg: "bg-amber-100 text-amber-700",
    user: "ชัชวาลย์ (Account Exec)",
    time: "4 ชม. ที่แล้ว",
    text: "เลื่อนวันนัดหมาย Demo สำหรับ TechSolutions Asia เป็นพรุ่งนี้ 14:00 น.",
  },
];
