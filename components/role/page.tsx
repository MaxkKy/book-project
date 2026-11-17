"use client";
import useManage from "@/hooks/ManageUser/useUserForm";
import { Role } from "@/utils/typeSchema";
export default function ManageRole() {
  const {
    handleFilter,
    search,
    setsearch,
    sort,
    setsort,
    form,
    onCancel,
    onChange,
    onSubmit,
    saving,
    role,
    setrole,
    onManage,
    ManageId,
    loading,
    user,
  } = useManage();
  return (
    <div>
      <form onSubmit={handleFilter}>
        <input
          type="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="ค้นหาข้อมูล"
        />
        <select
          name="sort"
          value={sort}
          onChange={(e) => setsort(e.target.value)}
        >
          <option value="desc">ล่าสุด</option>
          <option value="asc">เก่าสุด</option>
        </select>
        <select
          name="role"
          value={role}
          onChange={(e) => setrole(e.target.value)}
        >
          <option value="">โปรดกรอกข้อมูล</option>
          {Role.map((R) => (
            <option key={R.value} value={R.value}>
              {R.label}
            </option>
          ))}
        </select>
        <button disabled={loading}>{loading ? "กำลังค้นหา" : "Search"}</button>
        {user.map((u) => {
          const isEdit = ManageId === u.id;
          return (
            <div key={u.id}>
              <div>
                <h1>
                  ชื่อ {u.username} นามสกุล {u.lastname}
                </h1>
                <div>
                  <label>Email {u.gmail}</label>
                </div>
                <div>
                  <label>{u.role}</label>
                </div>
                <button onClick={() => onManage(u)}>แก้ไข</button>
                {isEdit && (
                  <div>
                    <input
                      type="text"
                      name="username"
                      placeholder="ชื่อ"
                      value={form.username}
                      onChange={onChange}
                    />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="นามสกุล"
                      value={form.lastname}
                      onChange={onChange}
                    />
                    <div>
                      <input
                        type="text"
                        name="gmail"
                        placeholder="อีเมล"
                        value={form.gmail}
                        onChange={onChange}
                      />
                      <select name="role" onChange={onChange} value={form.role}>
                        {Role.map((R) => (
                          <option key={R.value} value={R.value}>
                            {R.label}
                          </option>
                        ))}
                      </select>
                      <button
                        disabled={saving === u.id}
                        onClick={() => onSubmit(u.id)}
                      >
                        {saving ? "กำลังบันทึก" : "Save"}
                      </button>
                      <button onClick={() => onCancel()}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
}
