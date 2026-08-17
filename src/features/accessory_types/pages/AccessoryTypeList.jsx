import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessoryTypes, deleteAccessoryType, createAccessoryType, updateAccessoryType } from "../services/accessoryTypeService";
import DataTable from "@/common/components/DataTable";
import Modal from "@/common/components/Modal";
import Dialog from "@/common/components/Dialog";
import { Input } from "@/common/components/input";

export default function AccessoryTypeList() {
  const [items, setItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [messageDialog, setMessageDialog] = useState({ open: false, title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getAccessoryTypes();
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
      await deleteAccessoryType(deleteTarget.id);
      setShowConfirmDelete(false);
      setDeleteTarget(null);
      setMessageDialog({ open: true, title: "Deleted", description: "Accessory type deleted." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error deleting accessory type." });
    }
  };

  const handleCreate = async () => {
    await createAccessoryType({ name: form.name, description: form.description });
    setShowAdd(false);
    setForm({ name: "", description: "" });
    fetchItems();
  };

  const handleUpdate = async () => {
    try {
      await updateAccessoryType(editForm.id, { name: editForm.name, description: editForm.description });
      setShowEdit(false);
      setMessageDialog({ open: true, title: "Updated", description: "Accessory type updated." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error updating accessory type." });
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Accessory Types</h2>
      <DataTable
        title={"Accessory Types"}
        columns={columns}
        data={items}
        onAdd={() => setShowAdd(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={showAdd} title="Add Accessory Type" onClose={() => setShowAdd(false)} onSubmit={handleCreate}>
        <div className="grid gap-2">
          <label className="text-sm text-gray-700">Name</label>
          <Input placeholder="e.g. Electronics" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <label className="text-sm text-gray-700">Description</label>
          <Input placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
      </Modal>

      <Modal isOpen={showEdit} title="Edit Accessory Type" onClose={() => setShowEdit(false)} onSubmit={handleUpdate}>
        {editForm && (
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Name</label>
            <Input placeholder="e.g. Electronics" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />

            <label className="text-sm text-gray-700">Description</label>
            <Input placeholder="Short description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
          </div>
        )}
      </Modal>

      <Dialog isOpen={showConfirmDelete} title="Confirm Delete" description="Delete this accessory type?" onClose={() => setShowConfirmDelete(false)} onConfirm={confirmDelete} confirmLabel="Delete" />
      <Dialog isOpen={messageDialog.open} title={messageDialog.title} description={messageDialog.description} onClose={() => setMessageDialog({ open: false, title: "", description: "" })} />
    </div>
  );
}
