import React, { useEffect } from "react";

export const Toast = ({
  message,
  duration = 3000,
  onClose,
}: {
  message: string;
  duration?: number;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-5 left-[45%] bg-blue-100  text-black px-4 py-3 rounded-md shadow-lg transition-opacity duration-500 z-50">
      {message}
    </div>
  );
};
