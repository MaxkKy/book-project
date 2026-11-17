import { apiClinet } from "@/services/api/apiClient";
import { useEffect, useState } from "react";
import { useApiError } from "../useApiError";
type typeUser = {
  id: number;
  username: string;
  lastname: string;
  gmail: string;
  role: string;
};
 export default function useManage(){
    const [form, setform] = useState({
    username: "",
    lastname: "",
    gmail: "",
    role: "",
  });
  const [saving, setsaving] = useState<number | null>(null);
  const [user, setuser] = useState<typeUser[]>([]);
  const [ManageId, setManageId] = useState<number | null>(null);
  const { handleError } = useApiError();
  const [appliedSearch, setappliedSearch] = useState("");
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setform({ ...form, [e.target.name]: e.target.value });
  const [role, setrole] = useState("");
  const [search, setsearch] = useState("");
  const [sort, setsort] = useState("desc");
  const [loading, setloading] = useState(false);
  async function fetchData(searchValue: string) {
    setloading(true);
    try {
      const query = new URLSearchParams({
        role,
        search: searchValue,
        sort,
      }).toString();
      const res = await apiClinet.get(`/users?${query}`);
      setuser(res.data);
    } catch (err) {
      handleError(err);
    } finally {
      setloading(false);
    }
  }
  function handleFilter(e: React.FormEvent) {
    e.preventDefault();
    setappliedSearch(search);
    fetchData(search);
  }
  useEffect(() => {
    fetchData("");
  }, []);
  function onCancel() {
    setManageId(null);
  }
  function onManage(item: typeUser) {
    setManageId(item.id);
    setform({
      username: item.username,
      lastname: item.lastname,
      gmail: item.gmail,
      role: item.role,
    });
  }
  async function onSubmit(itemId: number) {
    setsaving(itemId);
    try {
      await apiClinet.put(`/user/${itemId}`, {
        username: form.username,
        lastname: form.lastname,
        gmail: form.gmail,
        role: form.role,
      });
      fetchData(appliedSearch);
    } catch (err) {
      handleError(err);
    }
  }
  return {handleFilter,search,setsearch,sort,setsort,form,onChange,onCancel,onSubmit,saving,role,setrole,onManage,loading,user,ManageId}
 }