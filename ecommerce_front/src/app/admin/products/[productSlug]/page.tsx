import CreateOrUpdateProduct from "@/views/admin/products/createOrUpdateProduct";
import React from "react";

interface Props {
  params: { productSlug: string; };
}

const CreateOrUpdateProductPage = ({params: {productSlug}}: Props) => {
  return <CreateOrUpdateProduct productSlug={productSlug} />;
};

export default CreateOrUpdateProductPage;
