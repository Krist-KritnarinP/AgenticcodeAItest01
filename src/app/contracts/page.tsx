import type { Metadata } from "next";
import Contracts from "@/components/Contracts";
import { requireSession } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Contracts | Follow-up Board" };

export default async function ContractsPage() {
  await requireSession();
  const contacts = (await prisma.contact.findMany({ orderBy: { createdAt: "desc" } })).map(({ id, name, company, email, tel, contract, interest, status, followupDate, comment }) => ({
    id, name, company, email, tel, contract, interest, status: status as "New" | "inprogress" | "close", followupDate, comment,
  }));

  return <Contracts initialContacts={contacts} />;
}
