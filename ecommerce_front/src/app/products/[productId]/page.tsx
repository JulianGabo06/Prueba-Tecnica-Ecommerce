import ProductDetail from "@/views/products/productDetail";
import { getProductById } from "@/views/products/productDetail/useProductDetails";

interface Props {
  params: { productId: string };
}

const ProductDetailPage = async ({ params: { productId } }: Props) => {
  const product = await getProductById(Number(productId));
  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
