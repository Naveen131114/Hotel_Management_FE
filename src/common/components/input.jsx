import * as React from "react";
import { cn } from "@/core/utils/cn";

export const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";