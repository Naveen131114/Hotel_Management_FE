import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPayments, deletePayment, createPayment, updatePayment } from "../services/paymentService";
import { getBookings } from "@/features/bookings/services/bookingService";
import DataTable from "@/common/components/DataTable";
import Modal from "@/common/components/Modal";
import Dialog from "@/common/components/Dialog";
import { Input } from "@/common/components/input";

export default function PaymentList() {
  const [items, setItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ room_record_id: "", amount: "", method: "", status: "completed", transaction_ref: "" });
  const [records, setRecords] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [messageDialog, setMessageDialog] = useState({ open: false, title: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    fetchRecords();
  }, []);

  const fetchItems = async () => {
    const res = await getPayments();
    setItems(res.data.data);
  };

  const fetchRecords = async () => {
    const res = await getBookings();
    setRecords(res.data.data || []);
  };

  const handleEdit = (row) => { setEditForm({ ...row }); setShowEdit(true); };
  const handleDelete = (row) => { setDeleteTarget(row); setShowConfirmDelete(true); };
  const confirmDelete = async () => {
    try {
      await deletePayment(deleteTarget.id);
      setShowConfirmDelete(false);
      setDeleteTarget(null);
      setMessageDialog({ open: true, title: "Deleted", description: "Payment deleted." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error deleting payment." });
    }
  };

  const handleCreate = async () => {
    await createPayment({
      room_record_id: parseInt(form.room_record_id) || null,
      amount: parseFloat(form.amount) || 0,
      method: form.method,
      status: form.status,
      transaction_ref: form.transaction_ref,
    });
    setShowAdd(false);
    setForm({ room_record_id: "", amount: "", method: "", status: "completed", transaction_ref: "" });
    fetchItems();
  };

  const handleUpdate = async () => {
    try {
      await updatePayment(editForm.id, {
        room_record_id: parseInt(editForm.room_record_id) || null,
        amount: parseFloat(editForm.amount) || 0,
        method: editForm.method,
        status: editForm.status,
        transaction_ref: editForm.transaction_ref,
      });
      setShowEdit(false);
      setMessageDialog({ open: true, title: "Updated", description: "Payment updated." });
      fetchItems();
    } catch (err) {
      setMessageDialog({ open: true, title: "Error", description: "Error updating payment." });
    }
  };

  const columns = [
    { header: "Room Record", accessor: "room_record_id" },
    { header: "Amount", accessor: "amount" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payments</h2>
      <DataTable
        title={"Payments"}
        columns={columns}
        data={items}
        onAdd={() => setShowAdd(true)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal isOpen={showAdd} title="Add Payment" onClose={() => setShowAdd(false)} onSubmit={handleCreate}>
        <div className="grid gap-2">
          <label className="text-sm text-gray-700">Room Record</label>
          <select className="border p-2 rounded" value={form.room_record_id} onChange={(e) => setForm({ ...form, room_record_id: e.target.value })}>
            <option value="">Select record</option>
            {records.map((r) => (
              <option key={r.id} value={r.id}>{`#${r.id} - Room ${r.room_id}`}</option>
            ))}
          </select>

          <label className="text-sm text-gray-700">Amount</label>
          <Input placeholder="e.g. 100.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />

          <label className="text-sm text-gray-700">Method</label>
          <Input placeholder="e.g. card" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} />

          <label className="text-sm text-gray-700">Status</label>
          <select className="border p-2 rounded" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>

          <label className="text-sm text-gray-700">Transaction Ref</label>
          <Input placeholder="e.g. TXN12345" value={form.transaction_ref} onChange={(e) => setForm({ ...form, transaction_ref: e.target.value })} />
        </div>
      </Modal>

      <Modal isOpen={showEdit} title="Edit Payment" onClose={() => setShowEdit(false)} onSubmit={handleUpdate}>
        {editForm && (
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Room Record</label>
            <select className="border p-2 rounded" value={editForm.room_record_id} onChange={(e) => setEditForm({ ...editForm, room_record_id: e.target.value })}>
              <option value="">Select record</option>
              {records.map((r) => (
                <option key={r.id} value={r.id}>{`#${r.id} - Room ${r.room_id}`}</option>
              ))}
            </select>

            <label className="text-sm text-gray-700">Amount</label>
            <Input placeholder="e.g. 100.00" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} />

            <label className="text-sm text-gray-700">Method</label>
            <Input placeholder="e.g. card" value={editForm.method} onChange={(e) => setEditForm({ ...editForm, method: e.target.value })} />

            <label className="text-sm text-gray-700">Status</label>
            <select className="border p-2 rounded" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>

            <label className="text-sm text-gray-700">Transaction Ref</label>
            <Input placeholder="e.g. TXN12345" value={editForm.transaction_ref} onChange={(e) => setEditForm({ ...editForm, transaction_ref: e.target.value })} />
          </div>
        )}
      </Modal>

      <Dialog isOpen={showConfirmDelete} title="Confirm Delete" description="Delete this payment?" onClose={() => setShowConfirmDelete(false)} onConfirm={confirmDelete} confirmLabel="Delete" />
      <Dialog isOpen={messageDialog.open} title={messageDialog.title} description={messageDialog.description} onClose={() => setMessageDialog({ open: false, title: "", description: "" })} />
    </div>
  );
}
