import React from "react";
import { Button } from "./button";

export default function Dialog({ isOpen, title, description, onClose, onConfirm, confirmLabel = "OK", cancelLabel = "Cancel" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="bg-white rounded shadow-lg w-full max-w-md z-10 p-6">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>{cancelLabel}</Button>
          {onConfirm && <Button onClick={onConfirm}>{confirmLabel}</Button>}
        </div>
      </div>
    </div>
  );
}
