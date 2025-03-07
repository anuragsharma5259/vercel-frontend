import * as React from "react";
import { cn } from "./utils";

const Button = React.forwardRef(({ className, ...props }, ref) => (
    <button ref={ref} className={cn("px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600", className)} {...props} />
));
Button.displayName = "Button";

export { Button };
