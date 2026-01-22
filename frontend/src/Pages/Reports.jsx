import {
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import Linegraph from "../assets/Graphs/Linegraph";
import pdf from "jspdf";
const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({});
  const [days, setDays] = useState(null);
  const [bgColor, setBgColor] = useState("30");
  const [exportData, setExportData] = useState([]);

useEffect(() => {

const fetchData = async () => {
try {
  const response=await axios.post('http://localhost:3000/webpages/getdataExport',{ reportType: selectedReport, dateRange: dateRange, days: days 
},{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  setExportData(response.data);

} catch (error) {
  console.error("Error fetching export data:", error);
}
}
fetchData();
},
 [selectedReport, dateRange, days]);

  const generatePDF = () => {
    const doc = new pdf();
    doc.text("Hospital Report", 10, 10);
    doc.save("hospital-report.pdf");
  };

const detailedData=async(reportType, dateRange, days)=>{

switch(reportType){
  case "admissions":
    return(
<table>
  <thead>
    <tr>
       <th>Name</th>
       <th>ward Name</th>
      <th>Admission Date</th>
      <th>Discharge Date</th>

    </tr>
  </thead>
  <tbody>
    {exportData.map((item) => (
      <tr key={item.patientId}>
         <td>{item.name}</td>
        <td>{item.wardName}</td>
        <td>{item.admissionDate}</td>
        <td>{item.dischargeDate}</td>
      </tr>
    ))}
  </tbody>
</table>
    )
  case "billing":
    return(
<table>
  <thead>
    <tr>
        <th>Patient Name</th>
      <th>Billing Date</th>
      <th>Amount</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {exportData.map((item) => (
      <tr key={item.patientId}>
        <td>{item.name}</td>
        <td>{item.billingDate}</td>
        <td>{item.amount}</td>
        <td>{item.status}</td>
      </tr>
    ))}
  </tbody>
</table>
    )
  case "occupancy":
    return(
<table>
  <thead>
    <tr>
        <th>Ward Name</th>
      <th>Date</th>
      <th>Occupied Beds</th>
      <th>Total Beds</th>
    </tr>
  </thead>
  <tbody>
    {exportData.map((item) => (
      <tr key={item.wardId}>
        <td>{item.wardName}</td>
        <td>{item.date}</td>
        <td>{item.occupiedBeds}</td>
        <td>{item.totalBeds}</td>
      </tr>
    ))}
  </tbody>
</table>
    )
  case "staff":
    return(
<table>
  <thead>
    <tr>
        <th>Staff Name</th>
      <th>Date</th>
      <th>Hours Worked</th>
    </tr>
  </thead>
  <tbody>
    {exportData.map((item) => (
      <tr key={item.staffId}>
        <td>{item.staffName}</td>
        <td>{item.date}</td>
        <td>{item.hoursWorked}</td>
      </tr>
    ))}
  </tbody>
</table>
    )
  }}

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
                <label htmlFor="start-date">Start Date:</label>
                <input type="date" id="start-date" name="start-date" />
                <label htmlFor="end-date">End Date:</label>
                <input type="date" id="end-date" name="end-date" />
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
          <Linegraph
            reportType={selectedReport}
            dateRange={dateRange}
            days={days}
          />
        </div>
      </div>
    </>
  );
};



export default Reports;
