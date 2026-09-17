export type ContactStatus = "New" | "inprogress" | "close";
export type Contact = {
  id: string;
  name: string;
  company: string;
  email: string;
  tel: string;
  contract: string;
  interest: string;
  status: ContactStatus;
  followupDate: string;
  comment: string;
};

export const initialContacts: Contact[] = [
  { id: "1", name: "กมลชนก วัฒนกุล", company: "บริษัท สยาม ดิจิทัล จำกัด", email: "kamonchanok@example.com", tel: "081-234-5678", contract: "CT-2026-001", interest: "ระบบ CRM สำหรับทีมขาย", status: "inprogress", followupDate: "2026-09-17", comment: "ส่งใบเสนอราคาแล้ว รอติดตามความคิดเห็นจากทีมจัดซื้อ" },
  { id: "2", name: "ธนกร สุขสวัสดิ์", company: "บริษัท กรีน เทค จำกัด", email: "thanakorn@example.com", tel: "089-456-7890", contract: "CT-2026-002", interest: "แพ็กเกจ Enterprise", status: "New", followupDate: "2026-09-18", comment: "สนใจทดลองใช้งาน นัดสาธิตผลิตภัณฑ์สัปดาห์นี้" },
  { id: "3", name: "พิมพ์ชนก แสงทอง", company: "บริษัท บลูโอเชียน จำกัด", email: "pimchanok@example.com", tel: "082-345-6789", contract: "CT-2026-003", interest: "ระบบติดตามลูกค้า", status: "inprogress", followupDate: "2026-09-15", comment: "ต้องการรายละเอียดการเชื่อมต่อระบบเดิมเพิ่มเติม" },
  { id: "4", name: "วิศรุต เจริญทรัพย์", company: "บริษัท นอร์ทสตาร์ จำกัด", email: "wissarut@example.com", tel: "086-789-0123", contract: "CT-2026-004", interest: "แพ็กเกจ Business", status: "close", followupDate: "2026-09-12", comment: "ดำเนินการเรียบร้อยแล้ว ส่งต่อให้ทีมดูแลลูกค้า" },
  { id: "5", name: "ศิริพร ใจดี", company: "บริษัท ไลท์เฮาส์ จำกัด", email: "siriporn@example.com", tel: "083-567-8901", contract: "", interest: "เครื่องมือจัดการทีมขาย", status: "New", followupDate: "2026-09-21", comment: "ได้รับข้อมูลจากงานสัมมนา รอติดต่อครั้งแรก" },
  { id: "6", name: "ณัฐพล รัตนวงศ์", company: "บริษัท เอเวอร์โกรว์ จำกัด", email: "nattapon@example.com", tel: "085-678-9012", contract: "CT-2026-006", interest: "รายงานและ Dashboard", status: "inprogress", followupDate: "2026-09-19", comment: "นำเสนอให้ผู้บริหารพิจารณาในวันศุกร์" },
];
