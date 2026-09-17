"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    const form = new FormData(event.currentTarget);
    const result = await authClient.signIn.email({ email: String(form.get("email")), password: String(form.get("password")) });
    setLoading(false);
    if (result.error) setError(result.error.message || "เข้าสู่ระบบไม่สำเร็จ"); else router.push("/dashboard");
  }

  return <main className="mx-auto flex min-h-screen max-w-md items-center px-6"><form onSubmit={submit} className="w-full space-y-4 rounded-xl border bg-white p-8 shadow-sm"><h1 className="text-2xl font-bold">Sign in</h1><input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border p-3" /><input name="password" type="password" required placeholder="Password" className="w-full rounded-lg border p-3" />{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={loading} className="w-full rounded-lg bg-indigo-600 p-3 text-white">{loading ? "Signing in..." : "Sign in"}</button><p className="text-sm">ยังไม่มีบัญชี? <Link href="/sign-up" className="text-indigo-600">Sign up</Link></p></form></main>;
}
