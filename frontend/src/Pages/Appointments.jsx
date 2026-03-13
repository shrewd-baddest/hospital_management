import {
  ClipboardDocumentIcon,
  ClockIcon,
  FunnelIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDateRangeIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Calendar from "../assets/Calendar/Calendar";
import { useLoaderData } from "react-router-dom";
const Appointments = () => {
  // const role = localStorage.getItem(role);
  const role = "doctor";
  const appointments = useLoaderData();
  const lab = appointments.lab;
  const Schedules = appointments.details;
  const overview = appointments.appointments;
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const durationCalc = (schedule) => {
    var duration = schedule.end_time - schedule.start_time;
    return duration;
  };

  const displayAppointments = () => {
    switch (role) {
      case "admin": {
        return (
          <div className="grid w-screen space-y-6 overflow-hidden p-[5%] ">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-extrabold text-black">
                Appointments
              </h1>
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
      }

      case "doctor": {
        return (
          <>
            <div className="flex flex-row items-center justify-between lg:px-[5%] w-fit lg:w-[90%]">
              <h1 className="text-xl font-bold">Appointments</h1>

              <div className="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-lg w-fit">
                <button
                  onClick={() => changeDate(-1)}
                  className="flex items-center gap-2 px-2 py-1 border-2 border-gray-300 rounded-lg"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                </button>

                <span className="font-medium text-gray-800">
                  {formattedDate}
                </span>

                <button
                  onClick={() => changeDate(1)}
                  className="flex items-center gap-2 px-2 py-1 border-2 border-gray-300 rounded-lg"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-lg w-fit">
                <section className="flex items-center gap-2 px-2 py-1 border-2 border-gray-300 rounded-lg">
                  <FunnelIcon className="w-4 h-4 text-gray-600" />
                  <h3>Filters</h3>
                </section>

                <button className="px-2 py-1 text-white bg-blue-600 border-2 border-gray-300 rounded-lg shadow-lg hover:bg-blue-700">
                  <h3>+ Add Appointment</h3>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap flex-row gap-[5%]">
              {Array.isArray(Schedules) &&
                Schedules.map((schedule) => (
                  <div key={schedule.id} className="flex flex-col gap-5">
                    <div className="flex flex-row gap-[3%] p-4 w-[18%]">
                      <section>
                        <h3>{schedule.patients}</h3>
                        <h5>{`${schedule.start_time}-${schedule.end_time}`}</h5>
                        <p>
                          {`<ClockIcon w-4 h-4 />${durationCalc(schedule)} 
                        <MapPinIcon w-4 h-4 /> ${schedule.department}`}
                        </p>
                      </section>
                      <section>{schedule.status}</section>
                    </div>
                    <div className="flex flex-row gap-[4%]">
                      <button className="px-2 py-1 border-2 border-black shadow-lg">
                        Reschedule
                      </button>
                      <button className="px-2 py-1 border-2 border-black shadow-lg">
                        View Patient
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        );
      }
    }
  };
  return (
    <div className="w-screen h-screen overflow-hidden">
      {displayAppointments()}
    </div>
  );
};

export default Appointments;

export const appointments = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/webpages/doctor/appointment",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    return await response.json();
  } catch (error) {
    return error.message;
  }
};
