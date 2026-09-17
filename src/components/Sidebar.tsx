"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const MENU = [
  { href: "/dashboard", icon: "grid_view", label: "ภาพรวม (Dashboard)", badge: null },
  { href: "/contracts", icon: "group", label: "รายชื่อผู้ติดต่อ (Contracts)", badge: null },
  { href: "/today", icon: "calendar_today", label: "ติดตามวันนี้ (Today's)", badge: "3" },
  { href: "/settings", icon: "settings", label: "ตั้งค่า (Settings)", badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-72 flex-col justify-between bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 md:flex">
      <div className="flex flex-col">
        <div className="flex h-16 items-center px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4f46e5] text-white font-bold">
              F
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-[16px] font-semibold text-[#131b2e]">
                Follow-up Board
              </span>
              <span className="text-[11px] font-semibold text-[#464555]">Workspace CRM</span>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[#464555] opacity-80">
            เมนูหลัก
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-4 pt-2">
          {MENU.map((m) => {
            const active = pathname === m.href || (m.href === "/dashboard" && pathname === "/");
            return (
              <Link
                key={m.href}
                href={m.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex items-center justify-between rounded-lg bg-[#4f46e5] px-4 py-2.5 text-white shadow-sm transition-colors"
                    : "flex items-center justify-between rounded-lg px-4 py-2.5 text-[#464555] transition-colors hover:bg-[#f2f3ff] hover:text-[#131b2e]"
                }
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
                  <span className="text-[13px] font-semibold">{m.label}</span>
                </span>
                {m.badge && (
                  <span className="rounded-full bg-[#ba1a1a] px-2 py-0.5 text-[11px] font-semibold text-white">
                    {m.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between rounded-xl bg-[#f2f3ff] p-2 transition-colors hover:bg-[#eaedff]">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#3525cd] text-[12px] font-bold text-white">
              นร
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[13px] font-semibold text-[#131b2e]">
                นภัสสร รัตนเวช
              </span>
              <span className="truncate text-[11px] font-semibold text-[#464555]">Sales Lead</span>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={handleSignOut} className="p-1 text-[#464555] transition-colors hover:text-[#131b2e]" title="Sign out" aria-label="Sign out" type="button">
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
