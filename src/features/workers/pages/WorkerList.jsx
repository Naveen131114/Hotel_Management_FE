import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkers, deleteWorker, createWorker, updateWorker } from "../services/workerService";
import { getWorkerTypes } from "@/features/worker_types/services/workerTypeService";
import DataTable from "@/common/components/DataTable";
import Modal from "@/common/components/Modal";
import Dialog from "@/common/components/Dialog";
import { Input } from "@/common/components/input";

export default function WorkerList() {
  const [items, setItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", worker_type_id: "", email: "", phone: "" });
  const [workerTypes, setWorkerTypes] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [messageDialog, setMessageDialog] = useState({ open: false, title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    fetchWorkerTypes();
  }, []);

  const fetchItems = async () => {
    const res = await getWorkers();
    setItems(res.data.data);
  };

  const fetchWorkerTypes = async () => {
    const res = await getWorkerTypes();
    setWorkerTypes(res.data.data || []);
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
      await deleteWorker(deleteTarget.id);
      setShowConfirmDelete(false);
      setDeleteTarget(null);
      setMessageDialog({ open: true, title: "Deleted", description: "Worker deleted successfully." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error deleting worker." });
    }
  };

  const handleCreate = async () => {
    await createWorker({
      first_name: form.first_name,
      last_name: form.last_name,
      worker_type_id: parseInt(form.worker_type_id) || null,
      email: form.email,
      phone: form.phone,
    });
    setShowAdd(false);
    setForm({ first_name: "", last_name: "", worker_type_id: "", email: "", phone: "" });
    fetchItems();
  };

  const handleUpdate = async () => {
    try {
      await updateWorker(editForm.id, {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        worker_type_id: parseInt(editForm.worker_type_id) || null,
        email: editForm.email,
        phone: editForm.phone,
      });
      setShowEdit(false);
      setMessageDialog({ open: true, title: "Updated", description: "Worker updated successfully." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error updating worker." });
    }
  };

  const columns = [
    { header: "Name", accessor: "first_name" },
    { header: "Last Name", accessor: "last_name" },
    { header: "Email", accessor: "email" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Workers</h2>
      <DataTable
        title={"Workers"}
        columns={columns}
        data={items}
        onAdd={() => setShowAdd(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={showAdd} title="Add Worker" onClose={() => setShowAdd(false)} onSubmit={handleCreate}>
        <div className="grid gap-2">
          <label className="text-sm text-gray-700">First Name</label>
          <Input placeholder="e.g. John" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />

          <label className="text-sm text-gray-700">Last Name</label>
          <Input placeholder="e.g. Doe" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />

          <label className="text-sm text-gray-700">Worker Type</label>
          <select className="border p-2 rounded" value={form.worker_type_id} onChange={(e) => setForm({ ...form, worker_type_id: e.target.value })}>
            <option value="">Select worker type</option>
            {workerTypes.map((wt) => (
              <option key={wt.id} value={wt.id}>{wt.title}</option>
            ))}
          </select>

          <label className="text-sm text-gray-700">Email</label>
          <Input placeholder="e.g. john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <label className="text-sm text-gray-700">Phone</label>
          <Input placeholder="e.g. +123456789" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
      </Modal>

      <Modal isOpen={showEdit} title="Edit Worker" onClose={() => setShowEdit(false)} onSubmit={handleUpdate}>
        {editForm && (
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">First Name</label>
            <Input placeholder="e.g. John" value={editForm.first_name} onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })} />

            <label className="text-sm text-gray-700">Last Name</label>
            <Input placeholder="e.g. Doe" value={editForm.last_name} onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })} />

            <label className="text-sm text-gray-700">Worker Type</label>
            <select className="border p-2 rounded" value={editForm.worker_type_id} onChange={(e) => setEditForm({ ...editForm, worker_type_id: e.target.value })}>
              <option value="">Select worker type</option>
              {workerTypes.map((wt) => (
                <option key={wt.id} value={wt.id}>{wt.title}</option>
              ))}
            </select>

            <label className="text-sm text-gray-700">Email</label>
            <Input placeholder="e.g. john@example.com" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />

            <label className="text-sm text-gray-700">Phone</label>
            <Input placeholder="e.g. +123456789" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
          </div>
        )}
      </Modal>

      <Dialog isOpen={showConfirmDelete} title="Confirm Delete" description="Delete this worker?" onClose={() => setShowConfirmDelete(false)} onConfirm={confirmDelete} confirmLabel="Delete" />
      <Dialog isOpen={messageDialog.open} title={messageDialog.title} description={messageDialog.description} onClose={() => setMessageDialog({ open: false, title: "", description: "" })} />
    </div>
  );
}
