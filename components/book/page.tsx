"use client";

import useBookForm from "@/hooks/MangeBook/useBookform";
import { StatusBook } from "@/utils/typeSchema";
import { DropdownMenu } from "@radix-ui/themes";
import { NumericFormat } from "react-number-format";

export default function Book() {
  const {
    onChange,
    form,
    onDelete,
    onSubmit,
    selectedCategoryName,
    categorys,
    onSelect,
    category,
    setcategory,
    message,
    onCategory,
    selectAdd,
    saving,
    onFileChange,
    setForm,
    uploadProgress,
    imagePreview,
    ObjectError,
    CancelClick,
    CancelImageClick,
    image,
  } = useBookForm();

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-neutral-200 rounded-xl shadow-sm text-neutral-900 font-sans">
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Upload Image Section */}
        <div>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 cursor-pointer transition-colors"
          >
            {image ? image.name : "โปรดเลือกไฟล์"}
          </label>
          {ObjectError && ObjectError.status && (
            <div className="mt-1 text-xs text-red-600 font-medium">
              {ObjectError.status}
            </div>
          )}
        </div>

        {/* Image Preview & Cancel */}
        {imagePreview && (
          <div className="flex flex-col items-center gap-2 py-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-[120px] h-[160px] object-cover rounded-md border border-neutral-200 shadow-sm"
            />
            <button
              type="button"
              onClick={CancelImageClick}
              className="px-3 py-1 text-xs text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Upload Progress */}
        {uploadProgress && (
          <progress
            max={100}
            value={uploadProgress ?? 0}
            className="w-full h-2 rounded overflow-hidden accent-neutral-900"
          ></progress>
        )}

        {/* Book Name Input */}
        <div>
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={form.name}
            placeholder="ชื่อหนังสือ"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
          {ObjectError.name && (
            <div className="mt-1 text-xs text-red-600 font-medium">
              {ObjectError.name}
            </div>
          )}
        </div>

        {/* Price Input */}
        <div>
          <NumericFormat
            name="price"
            value={form.price}
            onValueChange={(v) => setForm({ ...form, price: v.floatValue ?? 0})}
            suffix=" บาท"
            decimalScale={2}
            fixedDecimalScale
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            placeholder="ราคา"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
          {ObjectError.price && (
            <div className="mt-1 text-xs text-red-600 font-medium">
              {ObjectError.price}
            </div>
          )}
        </div>

        {/* Stock Input */}
        <div>
          <NumericFormat
            name="stock"
            value={form.stock}
            onValueChange={(v) => setForm({ ...form, stock: v.value})}
            suffix=" จำนวน"
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            placeholder="จำนวน"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
          {ObjectError.stock && (
            <div className="mt-1 text-xs text-red-600 font-medium">
              {ObjectError.stock}
            </div>
          )}
        </div>

        {/* Status Select */}
        <div>
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all cursor-pointer"
          >
            <option value="">สถานะของหนังสือ</option>
            {StatusBook.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {ObjectError && ObjectError.status && (
            <div className="mt-1 text-xs text-red-600 font-medium">
              {ObjectError.status}
            </div>
          )}
        </div>

        {/* Category Dropdown */}
        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger type="button" className="w-full">
              <div className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer">
                <span>{selectedCategoryName}</span>
                <span className="text-xs text-neutral-400">▼</span>
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-[--radix-dropdown-menu-trigger-width] bg-white border border-neutral-200 rounded-lg shadow-lg p-1 text-sm text-neutral-800 z-50">
              {categorys.map((c) => (
                <DropdownMenu.Item
                  key={c.id}
                  onSelect={() => onSelect(String(c.id))}
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-neutral-100 cursor-pointer outline-none"
                >
                  <span>{c.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(c.id);
                    }}
                    className="text-xs text-red-600 hover:text-red-700 font-medium ml-2"
                  >
                    delete
                  </button>
                </DropdownMenu.Item>
              ))}
              <DropdownMenu.Separator className="h-px bg-neutral-200 my-1" />
              <DropdownMenu.Item
                onSelect={() => onSelect("add_type")}
                className="px-3 py-2 rounded-md font-medium text-neutral-900 hover:bg-neutral-100 cursor-pointer outline-none"
              >
                เพิ่มหมวดหมู่
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {ObjectError && ObjectError.type && (
            <div className="mt-1 text-xs text-red-600 font-medium">
              {ObjectError.type}
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          disabled={saving}
          className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 active:bg-black text-white font-medium text-sm rounded-lg disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Saving..." : "Save"}
        </button>

        {message && (
          <div className="p-2.5 bg-neutral-100 border border-neutral-200 rounded-lg text-xs text-emerald-700 text-center font-medium">
            {message}
          </div>
        )}
      </form>

      {/* Add Category Drawer/Form */}
      {selectAdd && (
        <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
          <input
            type="text"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            placeholder="ชื่อหมวดหมู่"
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={onCategory}
              className="flex-1 py-2 px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-lg transition-colors"
            >
              บันทึก
            </button>
            <button
              onClick={CancelClick}
              className="px-4 py-2 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
          {message && (
            <div className="p-2 bg-neutral-100 border border-neutral-200 rounded-lg text-xs text-emerald-700 text-center font-medium">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
