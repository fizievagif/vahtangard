import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {IApartment} from "../../../types";
import AdminSidebar from "../../../Components/UI/AdminSidebar/AdminSidebar";
import ApartmentForm from "../../apartments/components/ApartmentForm/ApartmentForm";
import {createApartment} from "../../apartments/apartmentsThunks";
import {cleanError} from "../../apartments/apartmentsSlice";

const NewApartment: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (courseMutation: IApartment) => {
    await dispatch(createApartment(courseMutation)).unwrap();
    dispatch(cleanError());
    void navigate('/admin/apartments');
  };

  return (
    <AdminSidebar pageTitle="Создать объект">
      <ApartmentForm onSubmit={onSubmit} />
    </AdminSidebar>
  );
};

export default NewApartment;
