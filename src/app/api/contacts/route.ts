import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function session(request: Request) {
  return auth.api.getSession({ headers: request.headers });
}

const contactFields = ["name", "company", "email", "tel", "contract", "interest", "status", "followupDate", "comment"] as const;
function clean(body: Record<string, unknown>) {
  return Object.fromEntries(contactFields.map(field => [field, String(body[field] ?? "")])) as Record<string, string>;
}

export async function GET(request: Request) {
  if (!(await session(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await prisma.contact.findMany({ orderBy: { createdAt: "desc" } }));
}

export async function POST(request: Request) {
  const current = await session(request);
  if (!current) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await prisma.contact.create({ data: { ...(clean(await request.json()) as any), userId: current.user.id } }), { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await session(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...body } = await request.json();
  const ownerId = (await session(request))?.user.id;
  const owned = await prisma.contact.findFirst({ where: { id, OR: [{ userId: ownerId }, { userId: null }] } });
  if (!owned) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(await prisma.contact.update({ where: { id }, data: { ...clean(body), userId: ownerId } }));
}

export async function DELETE(request: Request) {
  if (!(await session(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  const ownerId = (await session(request))?.user.id;
  const owned = await prisma.contact.findFirst({ where: { id, OR: [{ userId: ownerId }, { userId: null }] } });
  if (!owned) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.contact.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
