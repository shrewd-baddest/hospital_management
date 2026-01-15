import React, { useEffect,useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
const Calendar = () => {

    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await fetch('http://localhost:3000/webpages/appointments/events', {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setEvents(data);
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };

    fetchEvents();
}, []);

    const handleDateClick = (arg) => {
        alert(arg.dateStr);
      }
  return (
    <FullCalendar 
    plugins={[dayGridPlugin]}
    initialView='dayGridMonth'
    dateClick={handleDateClick}
    events={events}

     />
  )
}

export default Calendar