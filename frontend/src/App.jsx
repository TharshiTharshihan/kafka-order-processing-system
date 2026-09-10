//import { useState } from 'react'

import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

//import Header from "./pages/Header/Header";
import Home from "./pages/Home";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import AllTickets from "./pages/AllTickets";
import AssignedTickets from "./pages/AssignedTickets";
import UserManagement from "./pages/AllUsers";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";

const ProtectedRoute = () => {
  const user = true;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={3000} />

        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>

          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create-ticket" element={<CreateTicket />}></Route>
          <Route path="/my-tickets" element={<MyTickets />}></Route>
          <Route path="/assigned-tickets" element={<AssignedTickets />}></Route>
          <Route path="/all-tickets" element={<AllTickets />}></Route>
          <Route path="/all-users" element={<UserManagement />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
