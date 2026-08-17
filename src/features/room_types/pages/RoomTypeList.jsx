import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoomTypes, deleteRoomType, createRoomType, updateRoomType } from "../services/roomTypeService";
import DataTable from "@/common/components/DataTable";
import Modal from "@/common/components/Modal";
import Dialog from "@/common/components/Dialog";
import { Input } from "@/common/components/input";

export default function RoomTypeList() {
  const [items, setItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    base_price: "",
    description: "",
    max_occupancy: 2,
    total_floors: 1,
    bed_type: "",
    view_type: "",
  });
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [messageDialog, setMessageDialog] = useState({ open: false, title: "", description: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getRoomTypes();
    setItems(res.data.data);
  };

  const handleEdit = (row) => {
    setEditForm({ ...row });
    setShowEdit(true);
  };

  const handleDelete = (row) => {
    setDeleteTarget(row);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRoomType(deleteTarget.id);
      setShowConfirmDelete(false);
      setDeleteTarget(null);
      setMessageDialog({ open: true, title: "Deleted", description: "Room type deleted successfully." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error deleting room type." });
    }
  };

  const handleCreate = async () => {
    const payload = {
      name: form.name,
      base_price: parseFloat(form.base_price) || 0,
      description: form.description,
      max_occupancy: parseInt(form.max_occupancy) || 1,
      total_floors: parseInt(form.total_floors) || 1,
      bed_type: form.bed_type,
      view_type: form.view_type,
    };
    await createRoomType(payload);
    setShowAdd(false);
    setForm({ name: "", base_price: "", description: "", max_occupancy: 2, total_floors: 1, bed_type: "", view_type: "" });
    fetchItems();
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        name: editForm.name,
        base_price: parseFloat(editForm.base_price) || 0,
        description: editForm.description,
        max_occupancy: parseInt(editForm.max_occupancy) || 1,
        total_floors: parseInt(editForm.total_floors) || 1,
        bed_type: editForm.bed_type,
        view_type: editForm.view_type,
      };
      await updateRoomType(editForm.id, payload);
      setShowEdit(false);
      setMessageDialog({ open: true, title: "Updated", description: "Room type updated successfully." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error updating room type." });
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Base Price", accessor: "base_price" },
    { header: "Max Occupancy", accessor: "max_occupancy" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Room Types</h2>
      <DataTable
        title={"Room Types"}
        columns={columns}
        data={items}
        onAdd={() => setShowAdd(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={showAdd} title="Add Room Type" onClose={() => setShowAdd(false)} onSubmit={handleCreate}>
        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm text-gray-700">Name</label>
          <Input placeholder="e.g. Deluxe King" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <label className="text-sm text-gray-700">Base Price</label>
          <Input placeholder="e.g. 120.00" value={form.base_price} onChange={(e) => setForm({ ...form, base_price: e.target.value })} />

          <label className="text-sm text-gray-700">Max Occupancy</label>
          <Input placeholder="e.g. 2" value={form.max_occupancy} onChange={(e) => setForm({ ...form, max_occupancy: e.target.value })} />

          <label className="text-sm text-gray-700">Total Floors</label>
          <Input placeholder="e.g. 1" value={form.total_floors} onChange={(e) => setForm({ ...form, total_floors: e.target.value })} />

          <label className="text-sm text-gray-700">Bed Type</label>
          <Input placeholder="e.g. king, twin" value={form.bed_type} onChange={(e) => setForm({ ...form, bed_type: e.target.value })} />

          <label className="text-sm text-gray-700">View Type</label>
          <Input placeholder="e.g. sea, city" value={form.view_type} onChange={(e) => setForm({ ...form, view_type: e.target.value })} />

          <label className="text-sm text-gray-700">Description</label>
          <Input placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
      </Modal>

      <Modal isOpen={showEdit} title="Edit Room Type" onClose={() => setShowEdit(false)} onSubmit={handleUpdate}>
        {editForm && (
          <div className="grid grid-cols-1 gap-3">
            <label className="text-sm text-gray-700">Name</label>
            <Input placeholder="e.g. Deluxe King" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />

            <label className="text-sm text-gray-700">Base Price</label>
            <Input placeholder="e.g. 120.00" value={editForm.base_price} onChange={(e) => setEditForm({ ...editForm, base_price: e.target.value })} />

            <label className="text-sm text-gray-700">Max Occupancy</label>
            <Input placeholder="e.g. 2" value={editForm.max_occupancy} onChange={(e) => setEditForm({ ...editForm, max_occupancy: e.target.value })} />

            <label className="text-sm text-gray-700">Total Floors</label>
            <Input placeholder="e.g. 1" value={editForm.total_floors} onChange={(e) => setEditForm({ ...editForm, total_floors: e.target.value })} />

            <label className="text-sm text-gray-700">Bed Type</label>
            <Input placeholder="e.g. king, twin" value={editForm.bed_type} onChange={(e) => setEditForm({ ...editForm, bed_type: e.target.value })} />

            <label className="text-sm text-gray-700">View Type</label>
            <Input placeholder="e.g. sea, city" value={editForm.view_type} onChange={(e) => setEditForm({ ...editForm, view_type: e.target.value })} />

            <label className="text-sm text-gray-700">Description</label>
            <Input placeholder="Short description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
          </div>
        )}
      </Modal>

      <Dialog isOpen={showConfirmDelete} title="Confirm Delete" description="Are you sure you want to delete this room type?" onClose={() => setShowConfirmDelete(false)} onConfirm={confirmDelete} confirmLabel="Delete" cancelLabel="Cancel" />

      <Dialog isOpen={messageDialog.open} title={messageDialog.title} description={messageDialog.description} onClose={() => setMessageDialog({ open: false, title: "", description: "" })} />
    </div>
  );
}
