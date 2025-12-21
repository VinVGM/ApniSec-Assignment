"use client";

import { motion } from "framer-motion";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface CustomToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export function CustomToast({ message, type = "success", onClose, duration = 3000 }: CustomToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
      className={`fixed bottom-8 right-8 z-[100] flex flex-col overflow-hidden rounded-lg border shadow-2xl backdrop-blur-md min-w-[300px]
        ${type === "success" 
          ? "bg-black/90 border-primary/50 text-primary shadow-primary/10" 
          : "bg-black/90 border-destructive/50 text-destructive shadow-destructive/10"
        }`}
    >
      <div className="flex items-start gap-4 p-4">
        {type === "success" ? (
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
        ) : (
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        )}
        
        <div className="flex-1 pt-0.5">
          <h4 className="font-mono text-sm font-bold uppercase tracking-wider">
            {type === "success" ? "System Notification" : "System Alert"}
          </h4>
          <p className="mt-1 font-sans text-sm text-white/90">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className={`shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            ${type === "success" ? "hover:text-primary" : "hover:text-destructive"}`}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>

      {/* Reverse Loading Bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={`h-1 w-full
            ${type === "success" ? "bg-primary" : "bg-destructive"}`}
      />
    </motion.div>
  );
}
