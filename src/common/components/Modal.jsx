import React from "react";
import { Button } from "./button";
import { cn } from "@/core/utils/cn";

export default function Modal({ isOpen, title, children, onClose, onSubmit, submitLabel = "Save" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className={cn("bg-white rounded shadow-lg w-full max-w-xl z-10 p-6")}> 
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button className="text-gray-600" onClick={onClose}>✖</button>
        </div>

        <div className="mb-4">{children}</div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          {onSubmit && (
            <Button onClick={onSubmit}>{submitLabel}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
