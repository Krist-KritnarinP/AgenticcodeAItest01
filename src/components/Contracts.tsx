"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Sidebar from "@/components/Sidebar";
import type { Contact, ContactStatus } from "@/data/contracts.mock";

const statuses: ContactStatus[] = ["New", "inprogress", "close"];
const labels = { New: "ผู้ติดต่อใหม่", inprogress: "กำลังติดตาม", close: "ปิดงานแล้ว" };
const tones = { New: "bg-sky-50 text-sky-700", inprogress: "bg-amber-50 text-amber-700", close: "bg-emerald-50 text-emerald-700" };
const fieldClass = "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
const buttonClass = "rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-500";
const primaryClass = "rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";
const empty: Contact = { id: "", name: "", company: "", email: "", tel: "", contract: "", interest: "", status: "New", followupDate: "", comment: "" };
const fields = [
  ["name", "ชื่อผู้ติดต่อ", "text"], ["company", "บริษัท", "text"],
  ["email", "อีเมล", "email"], ["tel", "เบอร์โทรศัพท์", "tel"],
  ["contract", "Contract", "text"], ["interest", "สิ่งที่สนใจ", "text"],
  ["followupDate", "วันที่ต้องติดตาม", "date"],
] as const;

function Badge({ status }: { status: ContactStatus }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${tones[status]}`}>● {labels[status]}</span>;
}
function dateLabel(value: string) {
  return value ? new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`)) : "ยังไม่กำหนด";
}

export default function Contracts({ initialContacts }: { initialContacts: Contact[] }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ContactStatus | "all">("all");
  const [mode, setMode] = useState<"view" | "edit" | "add" | "delete" | null>(null);
  const [draft, setDraft] = useState<Contact>(empty);
  const [message, setMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    fetch("/api/contacts", { credentials: "include", cache: "no-store" }).then(async response => response.ok ? setContacts(await response.json()) : setMessage("ไม่สามารถโหลดข้อมูลได้"));
  }, []);
  useEffect(() => {
    if (mode) dialog.current?.showModal();
    else dialog.current?.close();
  }, [mode]);

  const filtered = contacts.filter(c => (status === "all" || c.status === status) &&
    [c.name, c.company, c.email, c.tel, c.contract, c.interest].some(v => v.toLowerCase().includes(query.trim().toLowerCase())));
  function open(next: NonNullable<typeof mode>, contact = empty) {
    setDraft({ ...contact });
    setMode(next);
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.name.trim()) return;
    const contact = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, String(value ?? "").trim()])) as Contact;
    const response = await fetch("/api/contacts", { method: mode === "add" ? "POST" : "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(mode === "add" ? contact : { ...contact, id: contact.id }) });
    if (!response.ok) { setMessage("บันทึกข้อมูลไม่สำเร็จ"); return; }
    const saved = await response.json();
    setContacts(current => mode === "add" ? [saved, ...current] : current.map(c => c.id === saved.id ? saved : c));
    setMessage(mode === "add" ? "เพิ่มผู้ติดต่อเรียบร้อยแล้ว" : "บันทึกการแก้ไขเรียบร้อยแล้ว");
    setMode(null);
  }

  return <div className="min-h-screen">
    <Sidebar />
    <div className="md:pl-72">
      <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-indigo-100 bg-white px-4 py-3 md:px-8">
        <nav aria-label="เส้นทาง" className="flex gap-3 text-sm"><Link href="/dashboard" className="text-slate-500 hover:text-indigo-600">Dashboard</Link><span aria-hidden="true">/</span><span className="font-semibold text-indigo-600">Contracts</span></nav>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700">Workspace CRM</span>
      </header>
      <main className="space-y-6 px-4 py-7 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="mb-2 text-xs font-semibold tracking-widest text-indigo-600">CONTACT MANAGEMENT</p><h1 className="font-display text-2xl font-bold md:text-3xl">รายชื่อผู้ติดต่อทั้งหมด</h1><p className="mt-2 text-sm text-slate-500">จัดการ ค้นหา และติดตามสถานะลูกค้าและผู้ติดต่อของคุณ</p></div>
          <button className={primaryClass} onClick={() => open("add")}>+ เพิ่มรายชื่อ</button>
        </div>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {(["all", ...statuses] as const).map(s => <button key={s} onClick={() => setStatus(s)} aria-pressed={status === s} className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:border-indigo-300 ${status === s ? "border-indigo-500 ring-1 ring-indigo-500" : "border-slate-100"}`}><span className="text-sm text-slate-500">{s === "all" ? "ผู้ติดต่อทั้งหมด" : labels[s]}</span><div className="mt-3 flex items-end justify-between"><strong className="font-display text-3xl">{s === "all" ? contacts.length : contacts.filter(c => c.status === s).length}</strong><span className="text-xs text-slate-400">ราย</span></div></button>)}
        </div>
        <section aria-label="รายชื่อผู้ติดต่อ" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap gap-3 border-b border-slate-100 p-5">
            <label className="min-w-48 flex-1"><span className="sr-only">ค้นหาผู้ติดต่อ</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="ค้นหาชื่อ เบอร์โทร อีเมล บริษัท หรือสิ่งที่สนใจ..." className={`${fieldClass} mt-0 bg-slate-50`} type="search" /></label>
            <select aria-label="กรองสถานะ" className="rounded-lg border border-slate-200 px-3 text-sm" value={status} onChange={e => setStatus(e.target.value as typeof status)}><option value="all">ทุกสถานะ</option>{statuses.map(s => <option key={s} value={s}>{labels[s]}</option>)}</select>
            {(query || status !== "all") && <button className={buttonClass} onClick={() => { setQuery(""); setStatus("all"); }}>ล้างตัวกรอง</button>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500"><tr>{["ชื่อผู้ติดต่อ / บริษัท", "ช่องทางติดต่อ", "วันที่ต้องติดตาม", "สถานะ", "หมายเหตุล่าสุด", "การจัดการ"].map(h => <th key={h} scope="col" className="px-5 py-4 font-semibold">{h}</th>)}</tr></thead>
              <tbody>{filtered.map(c => <tr key={c.id} className="border-t border-slate-100 hover:bg-indigo-50/40">
                <td className="px-5 py-5"><div className="flex items-center gap-3"><div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">{c.name.slice(0, 1)}</div><div><button onClick={() => open("view", c)} className="font-semibold hover:text-indigo-600 hover:underline">{c.name}</button><p className="mt-1 text-xs text-slate-500">{c.company || "—"}</p></div></div></td>
                <td className="px-5 py-5"><p>{c.tel || "—"}</p><p className="mt-1 text-xs text-slate-500">{c.email || "—"}</p></td>
                <td className="whitespace-nowrap px-5 py-5">{dateLabel(c.followupDate)}</td><td className="px-5 py-5"><Badge status={c.status} /></td>
                <td className="max-w-56 px-5 py-5"><p className="line-clamp-2 text-xs leading-5 text-slate-500">{c.comment || "—"}</p></td>
                <td className="px-5 py-5"><div className="flex gap-2">{(["view", "edit", "delete"] as const).map(action => <button key={action} aria-label={`${action === "view" ? "ดู" : action === "edit" ? "แก้ไข" : "ลบ"} ${c.name}`} title={action === "view" ? "ดูรายละเอียด" : action === "edit" ? "แก้ไข" : "ลบ"} onClick={() => open(action, c)} className={`rounded-md p-2 hover:bg-indigo-100 ${action === "delete" ? "text-rose-600" : "text-slate-500"}`}><span aria-hidden="true" className="material-symbols-outlined text-[18px]">{action === "view" ? "visibility" : action === "edit" ? "edit" : "delete"}</span></button>)}</div></td>
              </tr>)}</tbody>
            </table>
            {filtered.length === 0 && <div className="py-16 text-center"><p className="font-semibold">ไม่พบผู้ติดต่อ</p><p className="mt-2 text-sm text-slate-500">ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือเพิ่มรายชื่อใหม่</p></div>}
          </div>
          <footer className="flex flex-wrap justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-500"><span>แสดง {filtered.length} จากทั้งหมด {contacts.length} รายชื่อ</span><span>ข้อมูลตัวอย่าง • การเปลี่ยนแปลงจะรีเซ็ตเมื่อรีเฟรชหน้า</span></footer>
        </section>
        <p role="status" className="text-sm text-emerald-700">{message}</p>
      </main>
    </div>
    <dialog ref={dialog} onCancel={() => setMode(null)} onClose={() => setMode(null)} aria-labelledby="contact-dialog-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl backdrop:bg-slate-900/40">
      <div className="mb-6 flex items-center justify-between gap-4"><h2 id="contact-dialog-title" className="text-xl font-bold">{mode === "add" ? "เพิ่มผู้ติดต่อใหม่" : mode === "edit" ? "แก้ไขผู้ติดต่อ" : mode === "delete" ? "ลบผู้ติดต่อ" : "รายละเอียดผู้ติดต่อ"}</h2><button aria-label="ปิด" className={buttonClass} onClick={() => setMode(null)}>✕</button></div>
      {mode === "delete" ? <><p>ต้องการลบ <strong>{draft.name}</strong> ออกจากรายชื่อหรือไม่?</p><div className="mt-6 flex justify-end gap-3"><button className={buttonClass} onClick={() => setMode(null)}>ยกเลิก</button><button className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700" onClick={async () => { const response = await fetch("/api/contacts", { method: "DELETE", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: draft.id }) }); if (response.ok) { setContacts(current => current.filter(c => c.id !== draft.id)); setMessage("ลบผู้ติดต่อเรียบร้อยแล้ว"); setMode(null); } else setMessage("ลบข้อมูลไม่สำเร็จ"); }}>ยืนยันการลบ</button></div></> : mode === "view" ? <><dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">{fields.map(([key, label]) => <div key={key}><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 break-words font-medium">{key === "followupDate" ? dateLabel(draft[key]) : draft[key] || "—"}</dd></div>)}<div><dt className="mb-2 text-xs text-slate-500">สถานะ</dt><dd><Badge status={draft.status} /></dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-500">รายละเอียดความคิดเห็น</dt><dd className="mt-1 whitespace-pre-wrap break-words">{draft.comment || "—"}</dd></div></dl><div className="mt-6 flex justify-end"><button className={primaryClass} onClick={() => setMode("edit")}>แก้ไขผู้ติดต่อ</button></div></> : <form onSubmit={save}><div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{fields.map(([key, label, type]) => <label key={key} className="text-sm font-medium">{label}{key === "name" && " *"}<input className={fieldClass} type={type} required={key === "name"} pattern={key === "name" ? ".*\\S.*" : undefined} maxLength={key === "followupDate" ? undefined : 200} value={draft[key]} onChange={e => setDraft({ ...draft, [key]: e.target.value })} /></label>)}<label className="text-sm font-medium">สถานะ<select className={fieldClass} value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value as ContactStatus })}>{statuses.map(s => <option key={s} value={s}>{s} — {labels[s]}</option>)}</select></label><label className="text-sm font-medium sm:col-span-2">รายละเอียดความคิดเห็น<textarea rows={4} maxLength={2000} className={fieldClass} value={draft.comment} onChange={e => setDraft({ ...draft, comment: e.target.value })} /></label></div><div className="mt-6 flex justify-end gap-3"><button type="button" className={buttonClass} onClick={() => setMode(null)}>ยกเลิก</button><button className={primaryClass} type="submit">บันทึกผู้ติดต่อ</button></div></form>}
    </dialog>
  </div>;
}
