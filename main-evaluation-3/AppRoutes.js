import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import UpdateRestaurant from './pages/admin/UpdateRestaurant'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRole="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customers/dashboard"
                element={
                    <ProtectedRoute allowedRole="customer">
                        <CustomerDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/restaurants/update/:id"
                element={
                    <ProtectedRoute allowedRole="admin">
                        <UpdateRestaurant />
                    </ProtectedRoute>
                }
            />

        </Routes>
     
  )
}

export default AppRoutes
