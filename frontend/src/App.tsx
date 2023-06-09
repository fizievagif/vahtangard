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

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar/>
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<h1>Vaga</h1>} />
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
          </Routes>
        </Container>
      </main>

      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;
