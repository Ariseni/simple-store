import React, { useEffect } from "react";

type ToastProps = {
  message?: string;
  duration?: number;
  onClose: () => void;
};

export function Toast({ message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);
  if (!message) return;
  return (
    <div className="fixed top-5 left-[45%] bg-blue-100  text-black px-4 py-3 rounded-md shadow-lg transition-opacity duration-500 z-50">
      {message}
    </div>
  );
}
