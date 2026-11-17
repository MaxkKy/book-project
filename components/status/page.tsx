"use client";

import useStatusForm from "@/hooks/UpdateStatus/useStatusForm";
import { StatusBook, StatusOrder } from "@/utils/typeSchema";
export default function StatusPage() {
  const { Status, message, onUpdate, order, saving, setStaus } =
    useStatusForm();
  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-4">
      {order.map((item) => (
        <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3">
          <h1 className="flex flex-col gap-2">
            {item.order.map((post) => (
              <div key={post.book.id} className="flex items-center gap-3">
                <h1 className="font-medium text-gray-800">{post.book.name}</h1>
                <img
                  src={post.book.image}
                  className="w-20 h-28 object-cover rounded-lg border border-neutral-200 bg-neutral-100 flex-shrink-0"
                />
                <div className="flex flex-col gap-1">
                  {post.book.status === "FREE" ? (
                    <label className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium w-fit">
                      {
                        StatusBook.find((s) => s.value === post.book.status)
                          ?.label
                      }
                    </label>
                  ) : (
                    <label className="text-sm font-semibold text-indigo-600">
                      ฿ {Number(post.book.price).toLocaleString("th-TH", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                    </label>
                  )}
                  <h1 className="text-sm text-gray-500"> จำนวน : {post.quantity}</h1>
                </div>
              </div>
            ))}
          </h1>
          <h1 className="text-sm text-gray-500">สั่ง by <span className="font-medium text-gray-700">{item.user.username}</span></h1>

          {StatusOrder.find((s) => s.value === item.status)?.label && (
            <select
              name="status"
              onChange={(e) =>
                setStaus({ ...Status, [item.id]: e.target.value })
              }
              value={Status[item.id] ?? item.status}
              className="w-fit text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              {StatusOrder.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          )}

          <button
            disabled={saving === item.id}
            onClick={() => onUpdate(item.id)}
            className="w-fit px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save
          </button>
          {message && <div className="text-sm text-green-600 font-medium">{message}</div>}
        </div>
      ))}
    </div>
  );
}
