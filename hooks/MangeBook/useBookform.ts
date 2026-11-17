import { useEffect, useState } from "react";
import { useApiError } from "../useApiError";
import { apiClinet } from "@/services/api/apiClient";
type CategoryType = {
  id: number;
  name: string;
};
type BookType = {
  name: string,
  price: number,
  type: string,
  status: string,
  stock:string
}
export default function useBookForm() {
  const [form, setForm] = useState<BookType>({
    name: "",
    price: 0,
    type: "",
    status: "",
    stock: "",
  });
  const [ObjectError, setObjectError] = useState({
    image: "",
    name: "",
    price: "",
    type: "",
    status: "",
    stock: "",
  });
  const [image, setimage] = useState<File | null>(null);
  const [categorys, setcategorys] = useState<CategoryType[]>([]);
  const [imagePreview, setimagePreview] = useState<string>("");
  const { handleError } = useApiError();
  const [uploadProgress, setuploadProgress] = useState<number | null>(null);
  const [message, setmessage] = useState("");
  useEffect(() => {
    const hashObjectError = Object.values(ObjectError).some(
      (e) => e !== "",
    );
    if (!message && !hashObjectError) return;
    const timer = setTimeout(() => {
      setmessage("");
      setObjectError({
        image: "",
        name: "",
        price: "",
        type: "",
        status: "",
        stock: "",
      });
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message,ObjectError]);
  function Complete() {
    setmessage("Create สำเร็จ");
  }

  const selectedCategoryName =
    categorys.find((c) => String(c.id) === form.type)?.name ||
    "เลือกประเภทหนังสือ";
  const [saving, setsaving] = useState(false);
  const [category, setcategory] = useState("");
  const [selectAdd, setselectAdd] = useState(false);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setimage(file);
      setimagePreview(URL.createObjectURL(file));
    }
  };
  const onSelect = (value: string) => {
    if (value === "add_type") {
      setselectAdd(true);
      setForm((prev) => ({ ...prev, type: "" }));
    } else {
      setselectAdd(false);
      setForm((prev) => ({ ...prev, type: value }));
    }
  };
  async function fetchCategory() {
    try {
      const res = await apiClinet.get("/category");
      setcategorys(res.data);
    } catch (err) {
      handleError(err);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  async function onCategory(e: React.FormEvent) {
    e.preventDefault();
    setsaving(true);
    try {
      const res = await apiClinet.post("/category", { name: category });
      Complete();
      setcategorys((prev) => [...prev, res.data]);
      fetchCategory();
    } catch (err) {
      handleError(err);
    } finally {
      setsaving(false);
    }
  }
  function CancelClick() {
    setselectAdd(false);
  }
  function CancelImageClick() {
    setimage(null);
    setimagePreview("");
  }
  async function onDelete(typeId: number) {
    if (!confirm("Delete this attraction? This cannot be undone")) return;
    try {
      await apiClinet.delete(`/category/${typeId}`);
      setcategorys((prev) => prev.filter((p) => p.id !== typeId));
    } catch (err) {
      handleError(err);
    }
  }
  function ValidateForm() {
    const newError = {
      image: "",
      name: "",
      price: "",
      type: "",
      status: "",
      stock: "",
    };
    if (!form.name) {
      newError.name = "โปรดกรอกชื่อหนังสือ";
    }
    if (!form.price) {
      newError.price = "โปรดกรอกราคา";
    }
    if (!form.status) {
      newError.status = "โปรดกรอกสถานะหนังสือ";
    }
    if (!form.stock) {
      newError.stock = "โปรดกรอกจำนวนของสินค้า";
    }
    if (!form.type) {
      newError.type = "โปรดกรอกประเภทหนังสือ";
    }
    if (!image) {
      newError.image = "กรุณาเลือกรูปภาพ";
    } else if (image.size > 1024 * 1024 * 2) {
      newError.image = "ไม่อนุญาติให้ Upload";
    }
    setObjectError(newError);
    return Object.keys(newError).length === 0;
  }
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(ValidateForm()) return;
    console.log("ข้อมูล Form ปัจจุบัน:", form);
    console.log("สถานะรูป",image)
    // if (!ValidateForm()){
    //   return
    // }   
    setsaving(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", String(form.price));
      formData.append("status", form.status);
      formData.append("stock", form.stock);
      formData.append("typeId", form.type);
      if (image) {
        formData.append("image", image);
      }
      await apiClinet.post("/book", formData, {
        onUploadProgress: function (e) {
          if (e.total) {
            const percent = Math.round(e.loaded * 100);
            setuploadProgress(percent);
          }
        },
      });
      Complete();
    } catch (err) {
      handleError(err);
    } finally {
      setsaving(false);
    }
  }
  return {
    form,
    onChange,
    onDelete,
    onSubmit,
    selectedCategoryName,
    categorys,
    onSelect,
    category,
    setcategory, 
    message,
    selectAdd,
    onCategory,
    saving,
    onFileChange,
    setForm,
    uploadProgress,
    imagePreview,
    ObjectError,
    CancelClick,
    CancelImageClick,
    image,
  };
}
