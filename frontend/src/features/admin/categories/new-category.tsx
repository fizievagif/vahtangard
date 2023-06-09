import React from 'react';
import {cleanError} from "../../categories/categoriesSlice";
import {useAppDispatch} from "../../../app/hooks";
import {ICategory} from "../../../types";
import {createCategory} from "../../categories/categoriesThunks";
import CategoryForm from "../../categories/components/CategoryForm/CategoryForm";
import AdminSidebar from "../../../Components/UI/AdminSidebar/AdminSidebar";
import {useNavigate} from "react-router-dom";

const NewCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (mutation: ICategory) => {
    await dispatch(createCategory(mutation)).unwrap();
    dispatch(cleanError());
    void navigate('/admin/categories');
  };

  return (
    <AdminSidebar pageTitle="Создать категорию">
      <CategoryForm onSubmit={onFormSubmit} />
    </AdminSidebar>
  );
};

export default NewCategory;
