// eslint-disable-next-line no-unused-vars
import React from "react";
import RequestList from "./Request/RequestList";
import AssetForm from "./Asset/AssetForm";

const ProcurementManagerDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Procurement Manager Dashboard</h2>
      <div className="flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Requests</h3>
          <RequestList />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Assets</h3>
          <AssetForm />
        </div>
      </div>
    </div>
  );
};

export default ProcurementManagerDashboard;