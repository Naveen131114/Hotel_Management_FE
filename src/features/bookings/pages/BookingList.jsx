import { useEffect, useState } from "react";
import { getBookings } from "../services/bookingService";
import DataTable from "@/common/components/DataTable";

export default function BookingList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await getBookings();
    setData(res.data.data);
  };

  const columns = [
    { header: "Room", accessor: "room_id" },
    { header: "User", accessor: "user_id" },
    { header: "Status", accessor: "booking_status" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookings</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}