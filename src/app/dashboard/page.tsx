import Sidebar from "@/components/Sidebar";
import { activities } from "@/data/dashboard.mock";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth-guard";

function statusPillClasses(tone: string) {
  switch (tone) {
    case "overdue":
      return "bg-rose-100 text-rose-800";
    case "call":
      return "bg-sky-50 text-sky-700";
    case "doc":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-indigo-50 text-indigo-700";
  }
}

export default async function DashboardPage() {
  await requireSession();
  const contacts = await prisma.contact.findMany({ orderBy: { followupDate: "asc" } });
  const today = new Date().toISOString().slice(0, 10);
  const dueToday = contacts.filter(contact => contact.followupDate === today).length;
  const overdue = contacts.filter(contact => contact.followupDate && contact.followupDate < today && contact.status !== "close").length;
  const followUps = contacts.filter(contact => contact.status !== "close").slice(0, 6).map(contact => ({
    id: contact.id,
    name: contact.name,
    company: contact.company,
    statusLabel: contact.followupDate && contact.followupDate < today ? "เกินกำหนด" : contact.followupDate === today ? "ติดตามวันนี้" : "รอติดตาม",
    statusTone: contact.followupDate && contact.followupDate < today ? "overdue" as const : "call" as const,
    phone: contact.tel || contact.email,
    detail: contact.interest,
    note: contact.comment,
    priorityLabel: contact.status === "New" ? "New Lead" : undefined,
    timeLabel: contact.followupDate ? `กำหนดติดตาม: ${contact.followupDate}` : "ยังไม่กำหนดวันติดตาม",
    initials: contact.name.slice(0, 2),
    avatarColor: "bg-indigo-100 text-indigo-700",
  }));
  const statusBreakdown = [
    { label: "ผู้ติดต่อใหม่ (New)", value: contacts.filter(c => c.status === "New").length, dot: "bg-sky-500" },
    { label: "กำลังติดตาม (In Progress)", value: contacts.filter(c => c.status === "inprogress").length, dot: "bg-amber-500" },
    { label: "ปิดงานแล้ว (Closed)", value: contacts.filter(c => c.status === "close").length, dot: "bg-emerald-600", highlight: true },
  ].map(item => ({ ...item, pct: contacts.length ? `${Math.round(item.value / contacts.length * 100)}%` : "0%" }));
  const kpis = [
    { id: "total", label: "ผู้ติดต่อทั้งหมด", sub: "Total Contacts", value: String(contacts.length), unit: "ราย", icon: "groups", delta: "จากฐานข้อมูลจริง" },
    { id: "due", label: "ต้องติดตามวันนี้", sub: "Due Today", value: String(dueToday), unit: "ราย", icon: "notification_important", delta: "กำหนดส่งวันนี้" },
    { id: "overdue", label: "เกินกำหนดติดตาม", sub: "Overdue", value: String(overdue), unit: "ราย", icon: "warning", delta: "เตือนด่วน" },
    { id: "done", label: "ติดตามสำเร็จแล้ว", sub: "Completed", value: String(contacts.filter(contact => contact.status === "close").length), unit: "ราย", icon: "task_alt", delta: "สถานะ close" },
  ];
  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e]">
      <Sidebar />

      {/* Mobile top bar */}
      <div className="flex h-14 items-center justify-between bg-white px-4 shadow-sm md:hidden">
        <span className="font-display text-[15px] font-bold">Follow-up Board</span>
        <nav className="flex gap-3 text-[13px] font-semibold text-[#4f46e5]">
          <a href="/dashboard">Dashboard</a>
          <a href="/contracts" className="text-[#464555]">Contacts</a>
          <a href="/today" className="text-[#464555]">Today</a>
        </nav>
      </div>

      <div className="md:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-[#eaedff] bg-[#faf8ff]/90 backdrop-blur-xl">
          <div className="flex h-16 w-full items-center justify-between gap-4 px-4 md:px-8">
            <div className="relative flex max-w-xl flex-1 items-center">
              <span className="material-symbols-outlined absolute left-3 text-[20px] text-[#464555]">
                search
              </span>
              <input
                className="h-10 w-full rounded-lg bg-white pl-10 pr-4 text-[14px] shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] outline-none placeholder:text-[#464555]/60 focus:ring-2 focus:ring-[#4f46e5]/20"
                placeholder="ค้นหารายชื่อ เบอร์โทร หรือบริษัท..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button
                className="hidden h-10 items-center gap-2 rounded-lg bg-white px-4 text-[13px] font-semibold shadow-sm hover:bg-[#f2f3ff] sm:flex"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                ทุกสถานะ
              </button>
              <button
                className="flex h-10 items-center gap-1 rounded-lg bg-[#4f46e5] px-3 md:px-4 text-[13px] font-semibold text-white hover:opacity-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="hidden sm:inline">เพิ่มรายชื่อ</span>
              </button>
              <button
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#464555] shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ba1a1a]" />
              </button>
            </div>
          </div>
        </header>

        <main className="min-h-screen w-full px-4 py-6 md:px-8">
          <div className="flex w-full flex-col gap-6">
            {/* Greeting */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#464555]">
                  <span className="material-symbols-outlined text-[16px] text-[#4f46e5]">
                    calendar_month
                  </span>
                  <span>วันพุธที่ 24 เมษายน 2025 • ซิงก์ข้อมูลล่าสุด 1 นาทีที่แล้ว</span>
                </div>
                <h1 className="font-display text-[24px] font-bold tracking-tight md:text-[30px] md:leading-[38px]">
                  สวัสดีคุณนภัสสร, วันนี้มี{" "}
                  <span className="text-[#4f46e5] underline decoration-[#4f46e5]/20 underline-offset-8">
                    6 งานติดตาม
                  </span>{" "}
                  ที่ต้องดำเนินการ
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-10 items-center gap-1 rounded-lg bg-white px-4 text-[13px] font-semibold shadow-sm hover:bg-[#f2f3ff]" type="button">
                  <span className="material-symbols-outlined text-[18px]">file_download</span>
                  ส่งออกรายงาน
                </button>
                <button className="flex h-10 items-center gap-1 rounded-lg bg-[#4f46e5] px-4 text-[13px] font-semibold text-white hover:opacity-95" type="button">
                  <span className="material-symbols-outlined text-[18px]">add_task</span>
                  เพิ่มนัดหมายติดตาม
                </button>
              </div>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((k) => (
                <div key={k.id} className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[13px] font-semibold text-[#464555]">{k.label}</div>
                      <div className="text-[11px] text-[#777587]">{k.sub}</div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2f3ff] text-[#4f46e5]">
                      <span className="material-symbols-outlined text-[22px]">{k.icon}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[30px] font-bold">{k.value}</span>
                      <span className="text-[13px] text-[#464555]">{k.unit}</span>
                    </div>
                    <span className="rounded-full bg-[#f2f3ff] px-2 py-0.5 text-[11px] font-semibold text-[#3525cd]">
                      {k.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main 2 col */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
              {/* Left */}
              <div className="flex flex-col gap-3 lg:col-span-8">
                <div className="flex flex-col justify-between gap-3 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-2.5 rounded-full bg-[#4f46e5]" />
                    <div>
                      <h2 className="font-display text-[22px] font-semibold">รายการที่ต้องติดตามวันนี้</h2>
                      <p className="text-[13px] text-[#464555]">
                        จัดลำดับความเร่งด่วนตามเวลานัดหมายและระดับความสนใจของลูกค้า
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 self-start rounded-lg bg-[#f2f3ff] p-1 sm:self-auto">
                    <button className="rounded-md bg-white px-3 py-1 text-[11px] font-semibold shadow-sm" type="button">
                      ทั้งหมด (6)
                    </button>
                    <button className="px-3 py-1 text-[11px] font-semibold text-[#464555]" type="button">
                      เกินกำหนด (2)
                    </button>
                  </div>
                </div>

                {followUps.map((f) => (
                  <div key={f.id} className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-white p-5 shadow-sm hover:shadow-md">
                    {f.statusTone === "overdue" && <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-[#ba1a1a]" />}
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-[14px] font-bold ${f.avatarColor}`}>
                          {f.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-[16px] font-bold">{f.name}</h3>
                            <span className="rounded-full bg-[#eaedff] px-2 py-0.5 text-[11px] text-[#464555]">
                              {f.company}
                            </span>
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusPillClasses(f.statusTone)}`}>
                              {f.statusLabel}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-[13px] text-[#464555]">
                            {f.phone && <span>☎ {f.phone}</span>}
                            {f.detail && <span>{f.detail}</span>}
                          </div>
                        </div>
                      </div>
                      {f.priorityLabel && (
                        <span className="self-end rounded-md bg-[#f2f3ff] px-2.5 py-1 text-[11px] font-bold text-[#3525cd] sm:self-start">
                          {f.priorityLabel}
                        </span>
                      )}
                    </div>
                    <div className="flex items-start gap-2 rounded-lg bg-[#f2f3ff] p-3 text-[13px] text-[#464555]">
                      <span className="material-symbols-outlined mt-0.5 text-[18px]">sticky_note_2</span>
                      <div>
                        <strong className="font-semibold text-[#131b2e]">หมายเหตุ:</strong> {f.note}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold text-[#464555]">{f.timeLabel}</span>
                      <div className="flex items-center gap-2">
                        <button className="h-9 rounded-lg bg-[#4f46e5] px-4 text-[13px] font-semibold text-white" type="button">
                          โทรแล้ว (Log)
                        </button>
                        <button className="h-9 rounded-lg bg-[#eaedff] px-3 text-[13px] font-semibold" type="button">
                          เลื่อนนัด
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between rounded-xl bg-white p-4 text-[13px] text-[#464555]">
                  <span>แสดง 4 จากทั้งหมด 6 รายการที่ต้องดำเนินการวันนี้</span>
                  <button className="font-semibold text-[#4f46e5] hover:underline" type="button">
                    ดูคิวนัดหมายทั้งหมด →
                  </button>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-4 lg:col-span-4">
                <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-[16px] font-semibold">สรุปสถานะผู้ติดต่อ</h2>
                    <span className="text-[11px] text-[#777587]">รวม 248 ราย</span>
                  </div>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#eaedff]">
                    <div className="h-full bg-sky-500" style={{ width: "14%" }} />
                    <div className="h-full bg-indigo-600" style={{ width: "23%" }} />
                    <div className="h-full bg-amber-500" style={{ width: "10%" }} />
                    <div className="h-full bg-emerald-600" style={{ width: "45%" }} />
                    <div className="h-full bg-slate-400" style={{ width: "8%" }} />
                  </div>
                  <div className="flex flex-col gap-1">
                    {statusBreakdown.map((s) => (
                      <div key={s.label} className="flex items-center justify-between rounded-lg p-2 hover:bg-[#f2f3ff]">
                        <span className="flex items-center gap-2 text-[13px]">
                          <span className={`h-3 w-3 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                        <span className="flex items-center gap-2">
                          <b>{s.value}</b>
                          <span className="w-9 text-right text-[11px] text-[#777587]">{s.pct}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-[16px] font-semibold">บันทึกและกิจกรรมล่าสุด</h2>
                    <span className="text-[11px] font-semibold text-emerald-700">● Real-time</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {activities.map((a) => (
                      <div key={a.user + a.time} className="flex items-start gap-3">
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${a.bg}`}>
                          <span className="material-symbols-outlined text-[16px]">{a.icon}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-1">
                            <span className="truncate text-[13px] font-semibold">{a.user}</span>
                            <span className="flex-shrink-0 text-[11px] text-[#777587]">{a.time}</span>
                          </div>
                          <p className="mt-0.5 text-[13px] text-[#464555]">{a.text}</p>
                          {a.sub && <div className="mt-1 text-[11px] font-medium text-emerald-700">✓ {a.sub}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#3525cd] p-5 text-white shadow-sm">
                  <span className="text-[11px] font-semibold uppercase tracking-wide opacity-90">
                    Daily Sales Tip
                  </span>
                  <p className="mt-1 text-[14px] leading-relaxed">
                    &quot;การติดตามลูกค้าหลังส่งใบเสนอราคาภายใน <strong>24 ชั่วโมง</strong> ช่วยเพิ่มโอกาสปิดการขายได้มากกว่าเดิมถึง 3.2 เท่า&quot;
                  </p>
                  <span className="mt-3 text-[11px] opacity-80">ระบบ AI วิเคราะห์จาก 184 ดีลที่สำเร็จ</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
