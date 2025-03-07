import * as React from "react";
import { cn } from "./utils";

const Input = React.forwardRef(({ className, ...props }, ref) => (
    <input
        ref={ref}
        className={cn("w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white", className)}
        {...props}
    />
));
Input.displayName = "Input";

export { Input };
