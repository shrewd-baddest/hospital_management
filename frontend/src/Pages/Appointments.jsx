import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import React from "react";
import Calendar from "../assets/Calendar/Calendar";

const Appointments = () => {
  return (
    <div className="grid w-screen space-y-6 overflow-hidden p-[5%] ">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-extrabold text-black">Appointments</h1>
        <button className="flex mr-[20%] py-1 text-white bg-blue-700 rounded-lg shadow-lg min-w-fit h-fit">
          <ClipboardDocumentIcon className="inline w-6 h-6" />
          <h2 className="text-lg font-bold">Create New Appointment</h2>
        </button>
      </div>

      <div>
        <Calendar />
      </div>
    </div>
  );
};

export default Appointments;
