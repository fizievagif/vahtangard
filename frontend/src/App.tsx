import React from 'react';
import Register from "./features/users/Register";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login";
import {Container} from "@mui/material";
import AppToolbar from "./Components/UI/AppToolbar/AppToolbar";

function App() {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<h1></h1>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
