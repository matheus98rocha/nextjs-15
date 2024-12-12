import { Loading } from "@/components/Loading/Loading";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Loading />
    </div>
  );
};

export default loading;
