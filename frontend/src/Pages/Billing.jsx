import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const Billing = () => {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-black">Billing Overview</h1>
      <div className="flex flex-row items-center justify-start gap-6">
        <span className="grid grid-cols-1 gap-3 p-8 bg-white rounded-lg shadow-lg">
          <p className="flex flex-row gap-9">
            {" "}
            Total Outstanding:
            <CurrencyDollarIcon className="inline w-6 h-6" />
          </p>
          <h2>$0.00</h2>
        </span>
        <span className="grid grid-cols-1 gap-3 p-8 bg-white rounded-lg shadow-lg">
          <p className="flex flex-row gap-9">
            Paid Last Month:
            <CalendarIcon className="inline w-6 h-6" />
          </p>
          <h2>$0.00</h2>
        </span>
        <span className="grid grid-cols-1 gap-3 p-8 bg-white rounded-lg shadow-lg">
          <p className="flex flex-row gap-9">
            Overdue Invoices:
            <ClockIcon className="inline w-6 h-6" />
          </p>
          <h2>$0.00</h2>
          <p>Requires immediate attention</p>
        </span>
        <span className="grid grid-cols-1 gap-3 p-8 bg-white rounded-lg shadow-lg">
          <p className="flex flex-row gap-9">
            Patients Billed:
            <UserGroupIcon className="inline w-6 h-6" />
          </p>
          <h2>N/A</h2>
          <p>Across all departments</p>
        </span>
      </div>
    </div>
  );
};

export default Billing;
