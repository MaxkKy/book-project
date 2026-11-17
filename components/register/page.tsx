"use client"
import { useApiError } from "@/hooks/useApiError";
import { apiClinet } from "@/services/api/apiClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    lastname: "",
    gmail: "",
    password: "",
  });
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const [saving, setsaving] = useState(false);
  const { handleError } = useApiError();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setsaving(true);
    try {
      await apiClinet.post("/register", {
        username: form.username,
        lastname: form.lastname,
        gmail: form.gmail,
        password: form.password,
      });
      router.push("/login")
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
          name="username"
          value={form.username}
          onChange={onChange}
          placeholder="ชื่อจริง"
        />
        <input
          type="text"
          name="lastname"
          value={form.lastname}
          onChange={onChange}
          placeholder="นามสกุล"
        />
        <input
          type="text"
          name="gmail"
          value={form.gmail}
          onChange={onChange}
          placeholder="อีเมล"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="รหัสผ่าน"
          autoComplete="new-password"
        />
        <button disabled={saving}>Register</button>
      </form>
    </div>
  );    
}
