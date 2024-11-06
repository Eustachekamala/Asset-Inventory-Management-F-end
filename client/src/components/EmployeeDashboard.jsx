// eslint-disable-next-line no-unused-vars
import React from "react";
import RequestForm from "./Request/RequestForm";
import RequestHistory from "./Request/RequestHistory";

const EmployeeDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Employee Dashboard</h2>
      <div className="flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Requests</h3>
          <RequestForm />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Request History</h3>
          <RequestHistory />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;