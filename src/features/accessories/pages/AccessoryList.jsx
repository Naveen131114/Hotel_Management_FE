import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessories, deleteAccessory, createAccessory, updateAccessory } from "../services/accessoryService";
import { getAccessoryTypes } from "@/features/accessory_types/services/accessoryTypeService";
import DataTable from "@/common/components/DataTable";
import Modal from "@/common/components/Modal";
import Dialog from "@/common/components/Dialog";
import { Input } from "@/common/components/input";

export default function AccessoryList() {
  const [items, setItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", accessory_type_id: "", unit: "", unit_price: "", is_chargeable: false });
  const [types, setTypes] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [messageDialog, setMessageDialog] = useState({ open: false, title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    fetchTypes();
  }, []);

  const fetchItems = async () => {
    const res = await getAccessories();
    setItems(res.data.data);
  };

  const fetchTypes = async () => {
    const res = await getAccessoryTypes();
    setTypes(res.data.data || []);
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
      await deleteAccessory(deleteTarget.id);
      setShowConfirmDelete(false);
      setDeleteTarget(null);
      setMessageDialog({ open: true, title: "Deleted", description: "Accessory deleted." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error deleting accessory." });
    }
  };

  const handleCreate = async () => {
    await createAccessory({
      name: form.name,
      accessory_type_id: parseInt(form.accessory_type_id) || null,
      unit: form.unit,
      unit_price: parseFloat(form.unit_price) || 0,
      is_chargeable: !!form.is_chargeable,
    });
    setShowAdd(false);
    setForm({ name: "", accessory_type_id: "", unit: "", unit_price: "", is_chargeable: false });
    fetchItems();
  };

  const handleUpdate = async () => {
    try {
      await updateAccessory(editForm.id, {
        name: editForm.name,
        accessory_type_id: parseInt(editForm.accessory_type_id) || null,
        unit: editForm.unit,
        unit_price: parseFloat(editForm.unit_price) || 0,
        is_chargeable: !!editForm.is_chargeable,
      });
      setShowEdit(false);
      setMessageDialog({ open: true, title: "Updated", description: "Accessory updated." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error updating accessory." });
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Unit Price", accessor: "unit_price" },
    { header: "Chargeable", accessor: "is_chargeable" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Accessories</h2>
      <DataTable
        title={"Accessories"}
        columns={columns}
        data={items}
        onAdd={() => setShowAdd(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={showAdd} title="Add Accessory" onClose={() => setShowAdd(false)} onSubmit={handleCreate}>
        <div className="grid gap-2">
          <label className="text-sm text-gray-700">Name</label>
          <Input placeholder="e.g. Hair Dryer" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <label className="text-sm text-gray-700">Accessory Type</label>
          <select className="border p-2 rounded" value={form.accessory_type_id} onChange={(e) => setForm({ ...form, accessory_type_id: e.target.value })}>
            <option value="">Select type</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <label className="text-sm text-gray-700">Unit</label>
          <Input placeholder="e.g. piece" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />

          <label className="text-sm text-gray-700">Unit Price</label>
          <Input placeholder="e.g. 12.50" value={form.unit_price} onChange={(e) => setForm({ ...form, unit_price: e.target.value })} />

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_chargeable} onChange={(e) => setForm({ ...form, is_chargeable: e.target.checked })} />
            <span>Is Chargeable</span>
          </label>
        </div>
      </Modal>

      <Modal isOpen={showEdit} title="Edit Accessory" onClose={() => setShowEdit(false)} onSubmit={handleUpdate}>
        {editForm && (
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Name</label>
            <Input placeholder="e.g. Hair Dryer" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />

            <label className="text-sm text-gray-700">Accessory Type</label>
            <select className="border p-2 rounded" value={editForm.accessory_type_id} onChange={(e) => setEditForm({ ...editForm, accessory_type_id: e.target.value })}>
              <option value="">Select type</option>
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <label className="text-sm text-gray-700">Unit</label>
            <Input placeholder="e.g. piece" value={editForm.unit} onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })} />

            <label className="text-sm text-gray-700">Unit Price</label>
            <Input placeholder="e.g. 12.50" value={editForm.unit_price} onChange={(e) => setEditForm({ ...editForm, unit_price: e.target.value })} />

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={editForm.is_chargeable} onChange={(e) => setEditForm({ ...editForm, is_chargeable: e.target.checked })} />
              <span>Is Chargeable</span>
            </label>
          </div>
        )}
      </Modal>

      <Dialog isOpen={showConfirmDelete} title="Confirm Delete" description="Delete this accessory?" onClose={() => setShowConfirmDelete(false)} onConfirm={confirmDelete} confirmLabel="Delete" />
      <Dialog isOpen={messageDialog.open} title={messageDialog.title} description={messageDialog.description} onClose={() => setMessageDialog({ open: false, title: "", description: "" })} />
    </div>
  );
}
