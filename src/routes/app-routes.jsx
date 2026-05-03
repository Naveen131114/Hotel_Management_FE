// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import Login from '../features/auth/pages/login'
// import Register from '../features/auth/pages/register'

// export default function AppRoutes() {
// 	return (
// 		<Router basename="/">
// 			<Routes>
// 				<Route path="/login" element={<Login />} />
// 				<Route path="/register" element={<Register />} />
// 			</Routes>
// 		</Router>
// 	)
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/common/layouts/MainLayout";

import Login from "@/features/auth/pages/Login";
import Dashboard from "@/features/dashboard/pages/Dashboard";
import RoomList from "@/features/rooms/pages/RoomList";
import BookingList from "@/features/bookings/pages/BookingList";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/bookings" element={<BookingList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}