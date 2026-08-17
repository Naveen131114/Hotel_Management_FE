import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookings, createBooking, deleteBooking, updateBooking } from "../services/bookingService";
import { getRooms } from "@/features/rooms/services/roomService";
import { getUsers } from "@/features/users/services/userService";
import DataTable from "@/common/components/DataTable";
import Modal from "@/common/components/Modal";
import Dialog from "@/common/components/Dialog";
import { Input } from "@/common/components/input";

export default function BookingList() {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ room_id: "", user_id: "", check_in_date: "", check_out_date: "", total_price: "" });
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [messageDialog, setMessageDialog] = useState({ open: false, title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
    fetchRooms();
    fetchUsers();
  }, []);

  const loadBookings = async () => {
    const res = await getBookings();
    setData(res.data.data);
  };
  const fetchRooms = async () => {
    const res = await getRooms();
    setRooms(res.data.data || []);
  };
  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data.data || []);
  };
  const handleEdit = (row) => { setEditForm({ ...row }); setShowEdit(true); };
  const handleDelete = (row) => { setDeleteTarget(row); setShowConfirmDelete(true); };
  const confirmDelete = async () => {
    try {
      await deleteBooking(deleteTarget.id);
      setShowConfirmDelete(false);
      setDeleteTarget(null);
      setMessageDialog({ open: true, title: "Deleted", description: "Booking deleted." });
      loadBookings();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error deleting booking." });
    }
  };

  const handleCreate = async () => {
    await createBooking({
      room_id: parseInt(form.room_id) || null,
      user_id: parseInt(form.user_id) || null,
      check_in_date: form.check_in_date,
      check_out_date: form.check_out_date,
      total_price: parseFloat(form.total_price) || 0,
    });
    setShowAdd(false);
    setForm({ room_id: "", user_id: "", check_in_date: "", check_out_date: "", total_price: "" });
    loadBookings();
  };
  const handleUpdate = async () => {
    try {
      await updateBooking(editForm.id, {
        room_id: parseInt(editForm.room_id) || null,
        user_id: parseInt(editForm.user_id) || null,
        check_in_date: editForm.check_in_date,
        check_out_date: editForm.check_out_date,
        total_price: parseFloat(editForm.total_price) || 0,
      });
      setShowEdit(false);
      setMessageDialog({ open: true, title: "Updated", description: "Booking updated." });
      loadBookings();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error updating booking." });
    }
  };
  const columns = [
    { header: "Room", accessor: "room_id" },
    { header: "User", accessor: "user_id" },
    { header: "Status", accessor: "booking_status" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookings</h2>
      <DataTable
        title={"Bookings"}
        columns={columns}
        data={data}
        onAdd={() => setShowAdd(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={showAdd} title="Add Booking" onClose={() => setShowAdd(false)} onSubmit={handleCreate}>
        <div className="grid gap-2">
          <label className="text-sm text-gray-700">Room</label>
          <select className="border p-2 rounded" value={form.room_id} onChange={(e) => setForm({ ...form, room_id: e.target.value })}>
            <option value="">Select room</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>{`Room ${r.room_number}`}</option>
            ))}
          </select>

          <label className="text-sm text-gray-700">User</label>
          <select className="border p-2 rounded" value={form.user_id} onChange={(e) => setForm({ ...form, user_id: e.target.value })}>
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.email || `${u.first_name} ${u.last_name}`}</option>
            ))}
          </select>

          <label className="text-sm text-gray-700">Check In</label>
          <Input type="date" placeholder="" value={form.check_in_date} onChange={(e) => setForm({ ...form, check_in_date: e.target.value })} />

          <label className="text-sm text-gray-700">Check Out</label>
          <Input type="date" placeholder="" value={form.check_out_date} onChange={(e) => setForm({ ...form, check_out_date: e.target.value })} />

          <label className="text-sm text-gray-700">Total Price</label>
          <Input placeholder="e.g. 200.00" value={form.total_price} onChange={(e) => setForm({ ...form, total_price: e.target.value })} />
        </div>
      </Modal>

      <Modal isOpen={showEdit} title="Edit Booking" onClose={() => setShowEdit(false)} onSubmit={handleUpdate}>
        {editForm && (
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Room</label>
            <select className="border p-2 rounded" value={editForm.room_id} onChange={(e) => setEditForm({ ...editForm, room_id: e.target.value })}>
              <option value="">Select room</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>{`Room ${r.room_number}`}</option>
              ))}
            </select>

            <label className="text-sm text-gray-700">User</label>
            <select className="border p-2 rounded" value={editForm.user_id} onChange={(e) => setEditForm({ ...editForm, user_id: e.target.value })}>
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.email || `${u.first_name} ${u.last_name}`}</option>
              ))}
            </select>

            <label className="text-sm text-gray-700">Check In</label>
            <Input type="date" placeholder="" value={editForm.check_in_date} onChange={(e) => setEditForm({ ...editForm, check_in_date: e.target.value })} />

            <label className="text-sm text-gray-700">Check Out</label>
            <Input type="date" placeholder="" value={editForm.check_out_date} onChange={(e) => setEditForm({ ...editForm, check_out_date: e.target.value })} />

            <label className="text-sm text-gray-700">Total Price</label>
            <Input placeholder="e.g. 200.00" value={editForm.total_price} onChange={(e) => setEditForm({ ...editForm, total_price: e.target.value })} />
          </div>
        )}
      </Modal>

      <Dialog isOpen={showConfirmDelete} title="Confirm Delete" description="Delete this booking?" onClose={() => setShowConfirmDelete(false)} onConfirm={confirmDelete} confirmLabel="Delete" />
      <Dialog isOpen={messageDialog.open} title={messageDialog.title} description={messageDialog.description} onClose={() => setMessageDialog({ open: false, title: "", description: "" })} />
    </div>
  );
}