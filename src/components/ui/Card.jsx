import * as React from "react";
import { cn } from "./utils";

const Card = ({ className, children }) => (
    <div className={cn("p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg", className)}>
        {children}
    </div>
);

const CardHeader = ({ className, children }) => (
    <div className={cn("pb-4 text-xl font-bold text-white", className)}>{children}</div>
);

const CardTitle = ({ className, children }) => (
    <h2 className={cn("text-lg font-semibold text-white", className)}>{children}</h2>
);

const CardContent = ({ className, children }) => (
    <div className={cn("text-gray-300", className)}>{children}</div>
);

export { Card, CardHeader, CardTitle, CardContent };
