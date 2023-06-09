import React from 'react';
import AdminSidebar from "../../../../Components/UI/AdminSidebar/AdminSidebar";
import {cleanError, selectOneCategory} from "../../../categories/categoriesSlice";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {ICategory} from "../../../../types";
import {fetchOneCategory, updateCategory} from "../../../categories/categoriesThunks";
import CategoryForm from "../../../categories/components/CategoryForm/CategoryForm";
import {useNavigate, useParams} from "react-router-dom";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectOneCategory);

  React.useEffect(() => {
    if (id) {
      void dispatch(fetchOneCategory(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (categoryMutation: ICategory) => {
    await dispatch(updateCategory({ id, categoryMutation })).unwrap();
    dispatch(cleanError());
    void navigate('/admin/categories');
  };

  const existingCategory = category && {
    title: category.title,
    description: category.description,
    image: null,
  };

  return (
    <AdminSidebar pageTitle="Редактировать категорию">
      {existingCategory && (
        <CategoryForm
          isEdit
          onSubmit={onSubmit}
          existingCategory={existingCategory}
        />
      )}
    </AdminSidebar>
  );
};

export default EditCategory;
