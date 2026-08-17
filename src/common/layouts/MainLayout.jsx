import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-black text-white p-4">
        <h1 className="text-xl font-bold mb-6">Hotel Admin</h1>

        <nav className="flex flex-col gap-6 ">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/worker-types">Worker Types</Link>
          <Link to="/accessory-types">Accessory Types</Link>
          <Link to="/room-types">Room Types</Link>
          <Link to="/workers">Workers</Link>
          <Link to="/accessories">Accessories</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/bookings">Bookings</Link>
          <Link to="/payments">Payments</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}