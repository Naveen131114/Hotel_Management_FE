import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms, createRoom, deleteRoom, updateRoom } from "../services/roomService";
import { getRoomTypes } from "@/features/room_types/services/roomTypeService";
import DataTable from "@/common/components/DataTable";
import Modal from "@/common/components/Modal";
import Dialog from "@/common/components/Dialog";
import { Input } from "@/common/components/input";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ room_type_id: "", room_number: "", floor: "", status: "available", notes: "" });
  const [types, setTypes] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [messageDialog, setMessageDialog] = useState({ open: false, title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
    fetchTypes();
  }, []);

  const fetchRooms = async () => {
    const res = await getRooms();
    setRooms(res.data.data);
  };

  const fetchTypes = async () => {
    const res = await getRoomTypes();
    setTypes(res.data.data || []);
  };
  const handleEdit = (row) => { setEditForm({ ...row }); setShowEdit(true); };
  const handleDelete = (row) => { setDeleteTarget(row); setShowConfirmDelete(true); };
  const confirmDelete = async () => {
    try {
      await deleteRoom(deleteTarget.id);
      setShowConfirmDelete(false);
      setDeleteTarget(null);
      setMessageDialog({ open: true, title: "Deleted", description: "Room deleted." });
      fetchRooms();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error deleting room." });
    }
  };

  const handleCreate = async () => {
    await createRoom({
      room_type_id: parseInt(form.room_type_id) || null,
      room_number: form.room_number,
      floor: form.floor,
      status: form.status,
      notes: form.notes,
    });
    setShowAdd(false);
    setForm({ room_type_id: "", room_number: "", floor: "", status: "available", notes: "" });
    fetchRooms();
  };

  const handleUpdate = async () => {
    try {
      await updateRoom(editForm.id, {
        room_type_id: parseInt(editForm.room_type_id) || null,
        room_number: editForm.room_number,
        floor: editForm.floor,
        status: editForm.status,
        notes: editForm.notes,
      });
      setShowEdit(false);
      setMessageDialog({ open: true, title: "Updated", description: "Room updated." });
      fetchRooms();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error updating room." });
    }
  };
  const columns = [
    { header: "Room No", accessor: "room_number" },
    { header: "Status", accessor: "status" },
    { header: "Floor", accessor: "floor" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Rooms</h2>
      <DataTable
        title={"Rooms"}
        columns={columns}
        data={rooms}
        onAdd={() => setShowAdd(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={showAdd} title="Add Room" onClose={() => setShowAdd(false)} onSubmit={handleCreate}>
        <div className="grid gap-2">
          <label className="text-sm text-gray-700">Room Type</label>
          <select className="border p-2 rounded" value={form.room_type_id} onChange={(e) => setForm({ ...form, room_type_id: e.target.value })}>
            <option value="">Select room type</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <label className="text-sm text-gray-700">Room Number</label>
          <Input placeholder="e.g. 101" value={form.room_number} onChange={(e) => setForm({ ...form, room_number: e.target.value })} />

          <label className="text-sm text-gray-700">Floor</label>
          <Input placeholder="e.g. 1" value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} />

          <label className="text-sm text-gray-700">Status</label>
          <select className="border p-2 rounded" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <label className="text-sm text-gray-700">Notes</label>
          <Input placeholder="Special notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </div>
      </Modal>

      <Modal isOpen={showEdit} title="Edit Room" onClose={() => setShowEdit(false)} onSubmit={handleUpdate}>
        {editForm && (
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Room Type</label>
            <select className="border p-2 rounded" value={editForm.room_type_id} onChange={(e) => setEditForm({ ...editForm, room_type_id: e.target.value })}>
              <option value="">Select room type</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <label className="text-sm text-gray-700">Room Number</label>
            <Input placeholder="e.g. 101" value={editForm.room_number} onChange={(e) => setEditForm({ ...editForm, room_number: e.target.value })} />

            <label className="text-sm text-gray-700">Floor</label>
            <Input placeholder="e.g. 1" value={editForm.floor} onChange={(e) => setEditForm({ ...editForm, floor: e.target.value })} />

            <label className="text-sm text-gray-700">Status</label>
            <select className="border p-2 rounded" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <label className="text-sm text-gray-700">Notes</label>
            <Input placeholder="Special notes" value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} />
          </div>
        )}
      </Modal>

      <Dialog isOpen={showConfirmDelete} title="Confirm Delete" description="Delete this room?" onClose={() => setShowConfirmDelete(false)} onConfirm={confirmDelete} confirmLabel="Delete" />
      <Dialog isOpen={messageDialog.open} title={messageDialog.title} description={messageDialog.description} onClose={() => setMessageDialog({ open: false, title: "", description: "" })} />
    </div>
  );
}