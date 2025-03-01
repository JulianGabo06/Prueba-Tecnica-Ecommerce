import { useApi } from "@/hooks/useApi";
import { BasicIResponse } from "@/interfaces/user_response.interface";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const useOrders = () => {
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [AllOrders, setAllOrders] = useState<any[]>([]);
  const { loadApi } = useApi();

  const GetOrderAll = async () => {
    try {
      const response = await loadApi<{ orders: any[] }>({
        token: true,
        endpoint: "/orders/orders",
        type: "GET",
      });
      console.log(response);
      setAllOrders(response.orders);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error inesperado al obtener las ordenes", {
        variant: "error",
      });
    }
  };
  const GetOrderById = async (idUser: number) => {
    try {
      const response = await loadApi<{ orders: any[] }>({
        token: true,
        endpoint: `/orders/orders/user/${idUser}`,
        type: "GET",
      });
      console.log(response);
      setUserOrders(response.orders);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };
  const updateStatus = async (idOrder: number, status: string) => {
    console.log(idOrder, status);
    try {
      const response = await loadApi<BasicIResponse>({
        token: true,
        endpoint: `/orders/orders/${idOrder}/status`,
        type: "PUT",
        body: {
          status,
        },
      });
      enqueueSnackbar("Estado actualizado correctamente", {
        variant: "success",
      });
      GetOrderAll(); // Refresca la lista de órdenes
      console.log(response);
      // setOrderResponse(response);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error inesperado al actualizar el estado", {
        variant: "error",
      });
    }
  };

  return { GetOrderAll, GetOrderById, userOrders, updateStatus, AllOrders };
};

export default useOrders;
