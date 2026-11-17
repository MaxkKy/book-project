"use client";
import { useApiError } from "@/hooks/useApiError";
import { apiClinet } from "@/services/api/apiClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ gmail: "", password: "" });
  const [saving, setsaving] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const { handleError } = useApiError();
  const router = useRouter();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setsaving(true);
    try {
      await apiClinet.post("/login", {
        gmail: form.gmail,
        password: form.password,
      });
      router.push("/")
    } catch (err) {
      handleError(err);
    } finally {
      setsaving(false);
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="gmail"
          value={form.gmail}
          onChange={onChange}
          placeholder="โปรดกรอก Email"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="โปรดกรอกรหัสผ่าน"
        />
        <button disabled={saving}>{saving ? "กำลังดำเนินการ" : "Login"}</button>
      </form>
    </div>
  );
}
