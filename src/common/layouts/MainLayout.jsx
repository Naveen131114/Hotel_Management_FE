import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-black text-white p-4">
        <h1 className="text-xl font-bold mb-6">Hotel Admin</h1>

        <nav className="flex flex-col gap-6 ">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/bookings">Bookings</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}