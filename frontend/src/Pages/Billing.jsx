import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Billing = () => {
  const billingData = useLoaderData();
  const invoices = billingData ? billingData.outstandingInvoices : [];
  const overview = billingData ? billingData.billingOverview : null;
  const [newInvoice, setNewInvoice] = useState(null);
  return (
    <div className="w-full p-4 space-y-6">
      <h1 className="text-4xl font-extrabold text-black">Billing Overview</h1>
      <div className="flex flex-row items-center justify-start gap-6">
        <span className="grid grid-cols-1 gap-3 p-8 bg-white rounded-lg shadow-lg">
          <p className="flex flex-row text-lg font-medium gap-9">
            Total Outstanding:
            <CurrencyDollarIcon className="inline w-6 h-6" />
          </p>
          <h2 className="text-xl font-semibold">
            {overview ? overview.totalOutstanding : 0}
          </h2>
          <p>As of current date</p>
        </span>
        <span className="grid grid-cols-1 gap-3 p-8 bg-white rounded-lg shadow-lg">
          <p className="flex flex-row text-lg font-medium gap-9">
            Paid Last Month:
            <CalendarIcon className="inline w-6 h-6" />
          </p>
          <h2 className="text-xl font-semibold">
            {overview ? overview.paidLastMonth : 0}
          </h2>
          <p>In the previous month</p>
        </span>
        <span className="grid grid-cols-1 gap-3 p-8 bg-white rounded-lg shadow-lg">
          <p className="flex flex-row text-lg font-medium gap-9">
            Overdue Invoices:
            <ClockIcon className="inline w-6 h-6" />
          </p>
          <h2 className="text-xl font-semibold">
            {overview ? overview.overdueInvoices : 0}
          </h2>
          <p>Requires immediate attention</p>
        </span>
        <span className="grid grid-cols-1 gap-3 p-8 bg-white rounded-lg shadow-lg">
          <p className="flex flex-row text-lg font-medium gap-9">
            Patients Billed:
            <UserGroupIcon className="inline w-6 h-6" />
          </p>
          <h2 className="text-xl font-semibold">
            {overview ? overview.totalPatientsBilled : 0}
          </h2>
          <p>Across all departments</p>
        </span>
      </div>

      <div>
        <h1 className="text-xl font-extrabold text-black">
          Outstanding Invoices
        </h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Invoice ID</th>
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Issue Date</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(invoices) &&
              invoices.map((invoice) => (
                <tr
                  key={invoice.invoiceId}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{invoice.invoiceId}</td>
                  <td className="px-4 py-2">{invoice.patientName}</td>
                  <td className="px-4 py-2">{invoice.amount}</td>
                  <td className="px-4 py-2">{invoice.issueDate}</td>
                  <td className="px-4 py-2">{invoice.dueDate}</td>
                  <td className="px-4 py-2">{invoice.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-black">
          Billing Operations
        </h1>
        <h3 className="text-xl font-semibold">Generate New Invoice</h3>
        <p className="text-gray-700">
          Fill in the details to create a new patient invoice.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const payload = {
              ...Object.fromEntries(formData.entries()),
            };
            axios
              .post(`http://localhost:3000/webpages/setbillings`, payload, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then((response) => {
                console.log("Shifts assigned successfully:", response.data);
              })
              .catch((error) => {
                console.error("Error assigning shifts:", error);
              });
          }}
        >
          <section className="grid grid-cols-1 gap-4 ">
            <label htmlFor="patientName" className="text-lg font-semibold">
              Patient Name:
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              placeholder="patient's full name"
              className="px-3 py-1 text-lg rounded-lg outline-1 w-fit"
            />
          </section>
          <section>
            <label htmlFor="issueDate" className="text-xl font-semibold">
              Issue Date:
            </label>
            <input type="date" id="issueDate" name="issueDate" />
          </section>

          <section className="grid grid-cols-1 gap-4 ">
            <label htmlFor="dueDate" className="text-xl font-semibold">
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="px-3 text-lg rounded-lg outline-2 w-fit"
            />
          </section>

          <section>
            <label htmlFor="services" className="text-lg font-semibold">
              Services Rendered:
            </label>
            <textarea
              id="services"
              name="services"
              placeholder="Describe the services provided"
              cols={14}
              className="h-32 px-3 text-lg rounded-lg outline-1 w-fit"
            ></textarea>
          </section>

          <section className="grid grid-cols-1 gap-4">
            <label htmlFor="amount" className="text-lg font-semibold">
              Total Amount:
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="e.g 100.00"
            />
          </section>
        </form>
      </div>
    </div>
  );
};

export default Billing;

export const OutstandingInvoice = async () => {
  try {
    const response = await fetch("http://localhost:3000/webpages/billing", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching outstanding invoices:", error.message);
  } finally {
    console.log("Fetch attempt completed.");
  }
};
