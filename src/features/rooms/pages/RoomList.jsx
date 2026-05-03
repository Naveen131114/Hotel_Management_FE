import { useEffect, useState } from "react";
import { getRooms } from "../services/roomService";
import DataTable from "@/common/components/DataTable";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await getRooms();
    setRooms(res.data.data);
  };

  const columns = [
    { header: "Room No", accessor: "room_number" },
    { header: "Status", accessor: "status" },
    { header: "Floor", accessor: "floor" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Rooms</h2>
      <DataTable columns={columns} data={rooms} />
    </div>
  );
}