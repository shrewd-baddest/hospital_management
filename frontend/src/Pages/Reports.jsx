import {
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import Linegraph from "../assets/Graphs/Linegraph";
import pdf from "jspdf";
import axios from "axios";
const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({});
  const [days, setDays] = useState(30);
  const [bgColor, setBgColor] = useState("30");
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/webpages/getdataExport",
          { reportType: selectedReport, dateRange: dateRange, days: days },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setExportData(response.data);
      } catch (error) {
        console.error("Error fetching export data:", error);
      }
    };
    fetchData();
  }, [selectedReport, dateRange, days]);

  const generatePDF = () => {
    const doc = new pdf();
    doc.text("Hospital Report", 10, 10);
    var y = 20;
    switch (selectedReport) {
      case "admissions":
        exportData.forEach((item) => {
          doc.text(
            `Name: ${item.name}, Ward: ${item.wardName}, Admission Date: ${item.admissionDate}, Discharge Date: ${item.dischargeDate}`,
            10,
            y,
          );
          if (y > 280) {
            doc.addPage();
            y = 20;
          } else {
            y += 10;
          }
        });
        break;
      case "billing":
        exportData.forEach((item) => {
          doc.text(
            `Patient Name: ${item.name}, Billing Date: ${item.billingDate}, Amount: ${item.amount}, Status: ${item.status}`,
            10,
            y,
          );
          if (y > 280) {
            doc.addPage();
            y = 20;
          } else {
            y += 10;
          }
        });
        break;
      case "occupancy":
        exportData.forEach((item) => {
          doc.text(
            `Ward Name: ${item.wardName}, Date: ${item.date}, Occupied Beds: ${item.occupiedBeds}, Total Beds: ${item.totalBeds}`,
            10,
            y,
          );
          if (y > 280) {
            doc.addPage();
            y = 20;
          } else {
            y += 10;
          }
        });
        break;
      case "staff":
        exportData.forEach((item) => {
          doc.text(
            `Staff Name: ${item.staffName}, Date: ${item.date}, Hours Worked: ${item.hoursWorked}`,
            10,
            y,
          );
          if (y > 280) {
            doc.addPage();
            y = 20;
          } else {
            y += 10;
          }
        });
        break;
      default:
        break;
    }
  };

  const detailedData = async (reportType) => {
    switch (reportType) {
      case "admissions":
        return (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">ward Name</th>
                <th className="px-4 py-2 text-left">Admission Date</th>
                <th className="px-4 py-2 text-left">Discharge Date</th>
              </tr>
            </thead>
            <tbody>
              {exportData.map((item) => (
                <tr key={item.patientId}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.wardName}</td>
                  <td className="px-4 py-2">{item.admissionDate}</td>
                  <td className="px-4 py-2">{item.dischargeDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "billing":
        return (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Patient Name</th>
                <th className="px-4 py-2 text-left">Billing Date</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {exportData.map((item) => (
                <tr key={item.patientId}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.billingDate}</td>
                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "occupancy":
        return (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Ward Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Occupied Beds</th>
                <th className="px-4 py-2 text-left">Total Beds</th>
              </tr>
            </thead>
            <tbody>
              {exportData.map((item) => (
                <tr key={item.wardId} className="transition hover:bg-gray-50">
                  <td className="px-4 py-2">{item.wardName}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.occupiedBeds}</td>
                  <td className="px-4 py-2">{item.totalBeds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "staff":
        return (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Staff Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Hours Worked</th>
              </tr>
            </thead>
            <tbody>
              {exportData.map((item) => (
                <tr key={item.staffId} className="transition hover:bg-gray-50">
                  <td className="px-4 py-2">{item.staffName}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.hoursWorked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
  };

  return (
    <>
      <h1>Hospital Reports</h1>
      <p>
        Generate and analyze key hospital data across various departments and
        time periods.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="p-4 bg-white rounded shadow outline-2">
            <h2>Report Type</h2>
            <button
              onClick={() => setSelectedReport("admissions")}
              className="shadow-lg hover:rounded-md hover:bg-gray-500"
            >
              <PresentationChartLineIcon className="w-6 h-6 text-blue-500" />
              <p>Admissions</p>
            </button>
            <button
              onClick={() => setSelectedReport("billing")}
              className="shadow-lg hover:rounded-md hover:bg-gray-500"
            >
              <ClipboardDocumentCheckIcon className="w-6 h-6 text-green-500" />
              <p>Billing</p>
            </button>
            <button
              onClick={() => setSelectedReport("occupancy")}
              className="shadow-lg hover:rounded-md hover:bg-gray-500"
            >
              <BuildingStorefrontIcon className="w-6 h-6 text-purple-500" />
              <p>Occupancy</p>
            </button>
            <button
              onClick={() => setSelectedReport("staff")}
              className="shadow-lg hover:rounded-md hover:bg-gray-500"
            >
              <UserGroupIcon className="w-6 h-6 text-yellow-500" />
              <p>Staff Activity</p>
            </button>
          </div>

          <div className="p-4 mt-4 bg-white rounded shadow outline-2">
            <h2>Date Range</h2>
            <div>
              <section className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => {
                    setDays(7);
                    setDateRange({});
                    setBgColor("7");
                  }}
                  className={`rounded-md   p-2 text-center ${bgColor === "7" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => {
                    setDays(30);
                    setDateRange({});
                    setBgColor("30");
                  }}
                  className={`rounded-md   p-2 text-center ${bgColor === "30" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  Last 30 Days
                </button>
                <button
                  onClick={() => {
                    setDays(90);
                    setDateRange({});
                    setBgColor("90");
                  }}
                  className={`rounded-md p-2 text-center ${bgColor === "90" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  This Quater
                </button>
                <button
                  onClick={() => {
                    setDays(365);
                    setDateRange({});
                    setBgColor("365");
                  }}
                  className={`rounded-md  p-2 text-center ${bgColor === "365" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  Last Year
                </button>
              </section>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target.value);
                  const range = Object.fromEntries(formData.entries());
                  setDateRange(range);
                }}
              >
                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="startDate" name="startDate" />
                <label htmlFor="endDate">End Date:</label>
                <input type="date" id="endDate" name="endDate" />
                <input type="submit" value="Apply Custom Range" />
              </form>
            </div>
          </div>
          <div className="p-4 mt-4 bg-white rounded shadow outline-2">
            <h2>Export Report</h2>
            <button
              className="rounded-md shadow-lg hover:bg-gray-500 outline-1"
              onClick={generatePDF}
            >
              <p>Export as PDF</p>
            </button>
            <button className="rounded-md shadow-lg hover:bg-gray-500 outline-1">
              <p>Export as CSV</p>
            </button>
          </div>
        </div>
        <div>
          <div>
            <h2>Monthly Admissions Trend</h2>
            <p>
              Overview of patient admissions and discharges over the selected
              period
            </p>

            <Linegraph
              reportType={selectedReport}
              dateRange={dateRange}
              days={days}
            />
          </div>
          <div className="p-4 mt-4 bg-white rounded shadow outline-2">
            <h2>Detailed Report Data</h2>
            <p>Raw data for the selected report within the chosen date range</p>
            {detailedData(selectedReport)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
