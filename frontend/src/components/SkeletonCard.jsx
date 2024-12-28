import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden relative p-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-4 bg-gray-600 rounded w-24 mb-2" />
          <div className="h-8 bg-gray-700 rounded w-32" />
        </div>
        <div className="h-12 w-12 bg-gray-700 rounded-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 opacity-30" />
    </div>
  );
};

export default SkeletonCard;
