import React from "react";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
};
