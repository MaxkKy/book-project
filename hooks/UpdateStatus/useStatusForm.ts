import { apiClinet } from "@/services/api/apiClient";
import { useEffect, useState } from "react";
import { useApiError } from "../useApiError";
type OrderType = {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
  };
  order: {
    quantity: number;
    book: {
      id: number;
      name: string;
      price: string;
      image: string;
      status: string;
    };
  }[];
}[];
export default function useStatusForm(){
     const [message,setmessage] = useState("")
      const [order, setOrder] = useState<OrderType>([]);
      const { handleError } = useApiError();
      const [Status, setStaus] = useState<{ [postId: number]: string }>({});
      const [saving, setsaving] = useState<number | null>(null);
      useEffect(() => {
        async function fetchStatus() {
          try {
            const res = await apiClinet.get("/order");
            console.log("[order data]", res.data);
            setOrder(res.data);
          } catch (error) {
            console.error("[order error]", error);
            handleError(error);
          }
        }
        fetchStatus();
      }, []);
      useEffect(() => {
        if(!message) return;
        const timer = setTimeout(() => {
            setmessage("")
        },3000)
        return () => {
            clearTimeout(timer)
        }
        },[message])
      async function onUpdate(postId: number) {
        setsaving(postId);
        try {
          const status = Status[postId]
          await apiClinet.patch(`/order/${postId}`, {
            status: status,
          });
          setOrder((prev) =>
            prev.map((o) => ({
              ...o,
              status: o.id === postId ? status : o.status,
            })),
          );
          setmessage("Update Order ลูกค้า")
        } catch (err) {
          handleError(err);
        } finally {
          setsaving(null);
        }
      }
      return {order,setStaus,Status,saving,onUpdate,message}
}