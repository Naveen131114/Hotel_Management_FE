import * as React from "react";
import { cn } from "@/core/utils/cn";

export const Table = ({ className, ...props }) => (
  <div className="w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);

export const TableHeader = ({ className, ...props }) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);

export const TableBody = ({ className, ...props }) => (
  <tbody
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
);

export const TableRow = ({ className, ...props }) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-gray-100",
      className
    )}
    {...props}
  />
);

export const TableHead = ({ className, ...props }) => (
  <th
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-gray-600",
      className
    )}
    {...props}
  />
);

export const TableCell = ({ className, ...props }) => (
  <td
    className={cn("p-2 align-middle", className)}
    {...props}
  />
);