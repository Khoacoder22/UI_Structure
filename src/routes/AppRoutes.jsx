import { Routes, Route } from 'react-router-dom'

import MainLayout from '../components/layout/MainLayout'

import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Customers from '../pages/Customers/Customers'
import Orders from '../pages/Orders/Orders'
import Profile from '../pages/Profile/Profile'
import NotFound from '../pages/NotFound/NotFound'

import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}