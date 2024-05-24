import { useState } from 'react'
import Home from './pages/home/home'
import { useSelector } from 'react-redux';
import { useCheckAuthQuery } from "./store/api";
import { selectAuthStatus } from "./store/user-slicer";
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./components/protected-route/protected-route";
import DashboardBudget from "./pages/dashboard-budget/dashboard-budget";
import DaashboardCategory from "./pages/dashboard-category/dashboard-category";
import DashboardProfile from "./pages/dashboard-profile/dashboard-profile";

function App() {
  const isAuth = useSelector(selectAuthStatus);
  const { isLoading } = useCheckAuthQuery();

  return (
    <div id="#app">
      <Routes>
        <Route index element={<Home />} />
        <Route path="dashboard">
          <Route index element={
            <ProtectedRoute isAuth={isAuth} isAuthLoading={isLoading}>
              <DashboardBudget />
            </ProtectedRoute>
          } />
          <Route path="budget" element={
            <ProtectedRoute isAuth={isAuth} isAuthLoading={isLoading}>
              <DashboardBudget />
            </ProtectedRoute>
          } />
          <Route path="category" element={
            <ProtectedRoute isAuth={isAuth} isAuthLoading={isLoading}>
              <DaashboardCategory />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute isAuth={isAuth} isAuthLoading={isLoading}>
              <DashboardProfile />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </div>
  )
}

export default App
