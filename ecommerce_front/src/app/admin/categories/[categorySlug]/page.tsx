import CreateOrUpdateCategory from "@/views/admin/categories/createOrUpdateCategory";

interface Props {
  params: { categorySlug: string };
}

const CreateOrUpdateCategoryPage = ({ params: {categorySlug} }: Props) => {
  return <CreateOrUpdateCategory categorySlug={categorySlug} />;
};

export default CreateOrUpdateCategoryPage;
