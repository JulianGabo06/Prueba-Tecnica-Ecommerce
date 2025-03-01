import Products from "@/views/products";
import { getSSRProducts } from "@/views/products/useProducts";

const ProductsPage = async () => {
  const products = await getSSRProducts();
  return <Products products={products} />;
};

export default ProductsPage;
