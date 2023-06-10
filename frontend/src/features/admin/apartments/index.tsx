import React from 'react';
import AdminSidebar from "../../../Components/UI/AdminSidebar/AdminSidebar";
import ApartmentAdmin from "../../apartments/components/ApartmentAdmin/ApartmentAdmin";

const ApartmentsAdmin: React.FC = () => {
  return (
    <AdminSidebar pageTitle="Объекты" createLink="apartments/new-apartment">
      <ApartmentAdmin />
    </AdminSidebar>
  );
};

export default ApartmentsAdmin;
