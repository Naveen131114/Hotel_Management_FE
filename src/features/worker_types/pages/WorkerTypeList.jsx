import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkerTypes, deleteWorkerType, createWorkerType, updateWorkerType } from "../services/workerTypeService";
import DataTable from "@/common/components/DataTable";
import Modal from "@/common/components/Modal";
import Dialog from "@/common/components/Dialog";
import { Input } from "@/common/components/input";

export default function WorkerTypeList() {
  const [items, setItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", base_salary: "" });
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
    const res = await getWorkerTypes();
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
      await deleteWorkerType(deleteTarget.id);
      setShowConfirmDelete(false);
      setDeleteTarget(null);
      setMessageDialog({ open: true, title: "Deleted", description: "Worker type deleted successfully." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error deleting worker type." });
    }
  };

  const handleCreate = async () => {
    await createWorkerType({
      title: form.title,
      description: form.description,
      base_salary: parseFloat(form.base_salary) || 0,
    });
    setShowAdd(false);
    setForm({ title: "", description: "", base_salary: "" });
    fetchItems();
  };
  const handleUpdate = async () => {
      try {
        await updateWorkerType(editForm.id, { title: editForm.title, description: editForm.description, base_salary: parseFloat(editForm.base_salary) || 0 });
        setShowEdit(false);
        setMessageDialog({ open: true, title: "Updated", description: "Worker type updated." });
        fetchItems();
      } catch (err) {
        setMessageDialog({ open: true, title: "Error", description: "Error updating worker type." });
      }
    };
  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Base Salary", accessor: "base_salary" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Worker Types</h2>
      <DataTable
        title={"Worker Types"}
        columns={columns}
        data={items}
        onAdd={() => setShowAdd(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
        <Modal isOpen={showAdd} title="Add Worker Type" onClose={() => setShowAdd(false)} onSubmit={handleCreate}>
          
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Title</label>
            <Input placeholder="e.g. Housekeeping" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />

            <label className="text-sm text-gray-700">Base Salary</label>
            <Input placeholder="e.g. 300.00" value={form.base_salary} onChange={(e) => setForm({ ...form, base_salary: e.target.value })} />

            <label className="text-sm text-gray-700">Description</label>
            <Input placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </Modal>

        <Modal isOpen={showEdit} title="Edit Worker Type" onClose={() => setShowEdit(false)} onSubmit={handleUpdate}>
          {editForm && (
            <div className="grid gap-2">
              <label className="text-sm text-gray-700">Title</label>
              <Input placeholder="e.g. Housekeeping" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />

              <label className="text-sm text-gray-700">Base Salary</label>
              <Input placeholder="e.g. 300.00" value={editForm.base_salary} onChange={(e) => setEditForm({ ...editForm, base_salary: e.target.value })} />

              <label className="text-sm text-gray-700">Description</label>
              <Input placeholder="Short description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
            </div>
          )}
        </Modal>

        <Dialog isOpen={showConfirmDelete} title="Confirm Delete" description="Delete this worker type?" onClose={() => setShowConfirmDelete(false)} onConfirm={confirmDelete} confirmLabel="Delete" />
        <Dialog isOpen={messageDialog.open} title={messageDialog.title} description={messageDialog.description} onClose={() => setMessageDialog({ open: false, title: "", description: "" })} />

      {/* <Modal isOpen={showAdd} title="Add Worker Type" onClose={() => setShowAdd(false)} onSubmit={handleCreate}>
        <div className="grid gap-2">
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Base Salary" value={form.base_salary} onChange={(e) => setForm({ ...form, base_salary: e.target.value })} />
          <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
      </Modal> */}
    </div>
  );
}
