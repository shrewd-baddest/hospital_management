import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = ({ role }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        var url = {
          event: "http://localhost:3000/webpages/appointments/events",
          nurse: "http://localhost:3000/webpages/appointments/nurse",
        };
        const response = await fetch(url.role, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };
  return (
    <div className="w-3/4 shadow-lg h-3/4 p-[5%]">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        eventClassNames={() => ["text-base", "font-bold"]}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "List",
        }}
      />
    </div>
  );
};

export default Calendar;
