import { useApi } from "@/hooks/useApi";
import { BasicIResponse } from "@/interfaces/user_response.interface";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const useCart = () => {
  const [orderResponse, setOrderResponse] = useState<BasicIResponse | null>(
    null
  );
  const { loadApi } = useApi();

  const CreateOrder = async (
    userId: number,
    products: any[],
    totalAmount: number
  ) => {
    try {
      const response = await loadApi<BasicIResponse>({
        token: true,
        endpoint: "/orders/orders",
        type: "POST",
        body: { userId, totalAmount, products },
      });
      setOrderResponse(response);
      enqueueSnackbar("Orden creada exitosamente", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error inesperado al crear el producto", {
        variant: "error",
      });
    }
  };

  return { CreateOrder, orderResponse };
};

export default useCart;
