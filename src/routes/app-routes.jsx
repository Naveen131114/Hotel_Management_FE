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
import RoomTypeList from "@/features/room_types/pages/RoomTypeList";
import WorkerTypeList from "@/features/worker_types/pages/WorkerTypeList";
import WorkerList from "@/features/workers/pages/WorkerList";
import AccessoryTypeList from "@/features/accessory_types/pages/AccessoryTypeList";
import AccessoryList from "@/features/accessories/pages/AccessoryList";
import PaymentList from "@/features/payments/pages/PaymentList";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/room-types" element={<RoomTypeList />} />
          <Route path="/worker-types" element={<WorkerTypeList />} />
          <Route path="/workers" element={<WorkerList />} />
          <Route path="/accessory-types" element={<AccessoryTypeList />} />
          <Route path="/accessories" element={<AccessoryList />} />
          <Route path="/payments" element={<PaymentList />} />
          <Route path="/bookings" element={<BookingList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}