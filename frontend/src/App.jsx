//import { useState } from 'react'

import "./App.css";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Outlet,
//   Navigate,
// } from "react-router-dom";

import Navbar from "./components/Navbar";
import OrderForm from "./components/OrderForm";
import StatsCards from "./components/StatsCards";
import OrderList from "./components/OrderList";
import RetryStatus from "./components/RetryStatus";
import DLQList from "./components/DLQList";
import { ToastContainer } from "react-toastify";

// const ProtectedRoute = () => {
//   const user = true;
//   return user ? <Outlet /> : <Navigate to="/login" />;
// };

function App() {
  return (
    <>
      
        <ToastContainer position="top-center" autoClose={3000} />

          <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-orange-600">
            Kafka + Avro Order Processing
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Order Processing Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Monitor real-time orders, price aggregation, retry processing,
            and permanently failed messages.
          </p>
        </div>

        {/* Statistics */}
        <StatsCards />

        {/* Main Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Create Order */}
          <div className="lg:col-span-1">
            <OrderForm />
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <OrderList />
          </div>
        </div>

        {/* Retry + DLQ */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <RetryStatus />
          <DLQList />
        </div>

      </main>
    </div>
      
    </>
  );
}

export default App;
