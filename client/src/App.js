import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orenda from "./pages/Orenda";
import Prodaj from "./pages/Prodaj";
import MyPosters from "./pages/MyPosters";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import "./index.css";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="orenda" element={<Orenda />} />
        <Route path="prodaj" element={<Prodaj />} />
        <Route element={<RequireAuth />}>
          <Route path="myposters" element={<MyPosters />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}
