import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center bg-gray-800 min-h-screen">
      <div
        className="animate-spin rounded-full  border-t-4 border-blue-500 border-solid border-gray-200 h-12 w-12"
        role="status"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
