import React from 'react';
import Register from "./features/users/Register";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login";
import {Container} from "@mui/material";
import AppToolbar from "./Components/UI/AppToolbar/AppToolbar";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/UI/Footer/Footer";
import Profile from "./features/profile/Profile";
import EditUser from "./features/profile/EditUser";
import ChangePassword from "./features/profile/ChangePassword";
import Categories from "./features/categories/Categories";
import Contacts from "./Components/StaticComponents/Contacts/Contacts";
import AboutUs from "./Components/StaticComponents/AboutUs/AboutUs";
import CategoriesAdmin from "./features/admin/categories";
import EditCategory from "./features/admin/categories/edit-category/EditCategory";
import NewCategory from "./features/admin/categories/new-category";
import Apartments from "./features/apartments/Apartments";
import OneApartament from "./features/apartments/OneApartament";
import EditApartment from "./features/admin/apartments/edit/EditApartment";
import NewApartment from "./features/admin/apartments/NewApartment";
import ApartmentsAdmin from "./features/admin/apartments";
import CourseId from "./features/admin/apartments/[courseId]";

function App() {
  const user = useAppSelector(selectUser);

  return (
    <div className="app-wrapper">
      <header style={{marginBottom: '40px'}}>
        <AppToolbar/>
      </header>

      <main style={{marginTop: '40px'}}>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Apartments/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/admin/categories/edit" element={
              <ProtectedRoute isAllowed={!!user}>
                <h1>Edit</h1>
              </ProtectedRoute>
            }/>
            <Route path="/profile" element={
              <ProtectedRoute isAllowed={!!user}>
                <Profile/>
              </ProtectedRoute>
            }/>
            <Route path="/edit-user" element={
              <ProtectedRoute isAllowed={!!user}>
                <EditUser/>
              </ProtectedRoute>
            }/>
            <Route path="/change-password" element={<ChangePassword/>} />
            <Route path="/categories" element={<Categories/>} />
            <Route path='/contacts' element={<Contacts/>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path="/admin/categories" element={
              <CategoriesAdmin/>
            }/>
            <Route path="/admin/categories/edit-category/:id" element={
              <EditCategory/>
            }/>
            <Route path="/admin/categories/categories/new-category" element={
              <NewCategory/>
            }/>
            <Route path="/apartments" element={
              <Apartments/>
            }/>
            <Route path="/apartments/:id" element={
              <OneApartament/>
            }/>
            <Route path="/admin/apartments" element={
              <ApartmentsAdmin/>
            }/>
            <Route path="/admin/apartments/apartments/edit/:id" element={
              <EditApartment/>
            }/>
            <Route path="/admin/apartments/apartments/new-apartment" element={
              <NewApartment/>
            }/>
            <Route path="/admin/apartments/apartments/:id" element={
              <CourseId/>
            }/>
          </Routes>
        </Container>
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
