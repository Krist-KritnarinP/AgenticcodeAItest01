"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const result = await authClient.signUp.email({
      name: String(form.get("name")), email: String(form.get("email")), password: String(form.get("password")),
    });
    setLoading(false);
    if (result.error) setError(result.error.message || "สมัครสมาชิกไม่สำเร็จ");
    else router.push("/dashboard");
  }

  return <main className="mx-auto flex min-h-screen max-w-md items-center px-6"><form onSubmit={submit} className="w-full space-y-4 rounded-xl border bg-white p-8 shadow-sm"><h1 className="text-2xl font-bold">Create account</h1><input name="name" required placeholder="Name" className="w-full rounded-lg border p-3" /><input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border p-3" /><input name="password" type="password" minLength={8} required placeholder="Password" className="w-full rounded-lg border p-3" />{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={loading} className="w-full rounded-lg bg-indigo-600 p-3 text-white">{loading ? "Creating..." : "Sign up"}</button><p className="text-sm">มีบัญชีแล้ว? <Link href="/sign-in" className="text-indigo-600">Sign in</Link></p></form></main>;
}
