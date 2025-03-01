import { redirect } from "next/navigation";

export const getProductById = async (productId: number) => {
  try {
    const response = await fetch(
      `${process.env.URL_BACK}products/${productId}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      redirect("/products");
    }
    const responseJson = await response.json();
    return responseJson.product;
  } catch (error) {
    console.error(error);
    redirect("/products");
  }
};
