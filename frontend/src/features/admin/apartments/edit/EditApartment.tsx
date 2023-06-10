
import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {cleanError, selectOneApartment} from "../../../apartments/apartmentsSlice";
import {fetchOneApartment, updateApartment} from "../../../apartments/apartmentsThunks";
import {IApartment} from "../../../../types";
import AdminSidebar from "../../../../Components/UI/AdminSidebar/AdminSidebar";
import ApartmentForm from "../../../apartments/components/ApartmentForm/ApartmentForm";

const EditApartment = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const apartment = useAppSelector(selectOneApartment);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchOneApartment(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (apartmentMutation: IApartment) => {
    await dispatch(updateApartment({ id, apartment: apartmentMutation })).unwrap();
    dispatch(cleanError());
    void navigate('/admin/apartments');
  };

  const existingApartment = apartment && {
    title: apartment.title,
    description: apartment.description,
    category: apartment.category._id,
    apartmentArea: apartment.apartmentArea.toString(),
    readiness: apartment.readiness,
    numberOfApartments: apartment.numberOfApartments.toString(),
    cost: apartment.cost.toString(),
    image: null,
  };

  return (
    <AdminSidebar pageTitle="Редактировать категорию">
      {existingApartment && (
        <ApartmentForm
          isEdit
          onSubmit={onSubmit}
          existingApartment={existingApartment}
        />
      )}
    </AdminSidebar>
  );
};

export default EditApartment;
