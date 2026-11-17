"use client";

import { useApiError } from "@/hooks/useApiError";
import { getImage } from "@/middleware/GetImage/getImageUrl";
import { apiClinet } from "@/services/api/apiClient";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

type bookType = {
  id: number;
  image: string;
  name: string;
  status: string;
  type: string;
  price: number;
  stock: string;
  category: {
    name: string;
  };
};
export default function Main() {
  const [menus, setmenus] = useState<bookType[]>([]);
  const [quantities, setquantity] = useState<{
    [key: number]: number | undefined;
  }>({});
  const [pick, setPick] = useState<number[]>([]);
  const [saving, setsaving] = useState(false);
  const [error, seterror] = useState("");
  const { handleError } = useApiError();
  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await apiClinet.get("/book");
        setmenus(res.data);
      } catch (err) {
        handleError(err);
      }
    }
    fetchBook();
  }, []);
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setsaving(true);
    const selectItem = menus
      .filter((menu) => pick.includes(menu.id))
      .map((menu) => ({
        bookId: Number(menu.id),
        quantity: Number(quantities[menu.id] || 1),
      }));
      console.log(selectItem)
      console.log(error)
    if (selectItem.length === 0) {
      seterror("โปรดเลือกสินค้า");
    }
    try {
      await apiClinet.post(`/order`, {
        order: selectItem,
      });
      setPick([]);
    } catch (err) {
      handleError(err);
    } finally {
      setsaving(false);
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
    <form onSubmit={onSubmit} className="space-y-4">
      {menus.map((m) => {
        const isSelected = pick.includes(m.id);
  
        return (
          <div
            key={m.id}
            className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
              isSelected
                ? "border-black bg-neutral-50 shadow-md"
                : "border-neutral-200 bg-white hover:border-neutral-400 shadow-sm"
            }`}
          >
            {/* ฝั่งซ้าย: Checkbox + รูปภาพ + ข้อมูลหนังสือ */}
            <div className="flex items-start md:items-center gap-4 flex-1">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() =>
                  setPick((c) =>
                    c.includes(m.id)
                      ? c.filter((id) => id !== m.id)
                      : [...c, m.id]
                  )
                }
                className="w-5 h-5 accent-black rounded cursor-pointer mt-1 md:mt-0"
              />
  
              <img
                src={getImage(m.image)}
                alt={m.name}
                className="w-20 h-28 object-cover rounded-lg border border-neutral-200 bg-neutral-100 flex-shrink-0"
              />
  
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-lg text-black">{m.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded border border-neutral-300 bg-neutral-100 text-neutral-700 font-medium">
                    {m.category.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded border border-neutral-200 text-neutral-500 font-semibold uppercase">
                    {m.status}
                  </span>
                </div>
  
                <p className="text-sm text-neutral-600">
                  จำนวนทั้งหมด: <span className="font-medium text-black">{m.stock}</span> เล่ม
                </p>
  
                <p className="text-lg font-bold text-black pt-1">
                  ฿{Number(m.price).toLocaleString("th-TH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
  
            {/* ฝั่งขวา: ช่องกรอกจำนวน (เมื่อถูกเลือก) + ปุ่มสั่งซื้อ */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-neutral-100">
              {isSelected && (
                <div className="flex items-center gap-2">
                  <NumericFormat
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    suffix=" เล่ม"
                    placeholder="จำนวน"
                    value={quantities[m.id] || 1}
                    onValueChange={(v) =>
                      setquantity({ ...quantities, [m.id]: v.floatValue })
                    }
                    className="w-28 text-center border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black rounded-lg px-3 py-1.5 text-sm outline-none transition bg-white"
                  />
                </div>
              )}
  
              <button
                type="submit"
                disabled={saving}
                className="bg-black hover:bg-neutral-800 active:bg-neutral-900 text-white font-medium px-5 py-2 rounded-lg text-sm transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed shadow-sm"
              >
                Buy
              </button>
            </div>
          </div>
        );
      })}
    </form>
  </div>
  );
}
