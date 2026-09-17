import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contracts from "@/components/Contracts";

vi.mock("next/link", () => ({ default: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a> }));
vi.mock("next/navigation", () => ({ usePathname: () => "/contracts", useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

describe("Contracts UI", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => [] }));
  });

  it("แสดงรายชื่อจากข้อมูลที่ส่งเข้ามา", () => {
    render(<Contracts initialContacts={[{ id: "1", name: "Test User", company: "Test Co", email: "test@example.com", tel: "0800000000", contract: "CT-1", interest: "CRM", status: "New", followupDate: "2026-09-17", comment: "Note" }]} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Test Co")).toBeInTheDocument();
  });
});
