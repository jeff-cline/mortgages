"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore — navigate regardless
    }
    router.push("/admin/login");
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="inline-flex h-9 items-center rounded-md border border-white/20 bg-white/5 px-3 text-sm text-white/90 hover:bg-white/10 disabled:opacity-60"
    >
      {loading ? "Signing out…" : "Logout"}
    </button>
  );
}
