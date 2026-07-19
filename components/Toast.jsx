"use client";

import { useStore } from "@/lib/store";

export default function Toast() {
  const { toast } = useStore();
  return (
    <div className={`toast ${toast ? "show" : ""} ${toast?.type || ""}`} role="status">
      {toast?.msg}
    </div>
  );
}
