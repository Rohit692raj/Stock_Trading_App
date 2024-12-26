import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CompanyRegister from "./pages/CompanyRegister";
import Home from "./pages/Home";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/companyRegister" element={<CompanyRegister />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
