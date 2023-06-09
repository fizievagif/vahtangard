import React from 'react';
import AdminSidebar from "../../../Components/UI/AdminSidebar/AdminSidebar";
import CategoryAdmin from "../../categories/components/CategoryAdmin/CategoryAdmin";

const CategoriesAdmin: React.FC = () => {
  return (
    <AdminSidebar pageTitle="Категории" createLink="categories/new-category">
      <CategoryAdmin />
    </AdminSidebar>
  );
};

export default CategoriesAdmin;
