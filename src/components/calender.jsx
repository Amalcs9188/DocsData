'use client'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css' // ✅ Required

import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { useDocContext } from '@/app/context/MyContext'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export const MyCalendar = (props) => {
  const { Data_Items } = useDocContext()
  function getLocalDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // Local time, avoids UTC offset
  }

  const myEventsList = Data_Items.map((item) => ({
    ...item,
    title: item.patientName,
    name: item.time,
    start: getLocalDate(item.date),
    end: getLocalDate(item.date),
  }))
  // select date
  const setOpen = props.setOpen
  const setMyDate = props.setMyDate
  const setEmpty = props.setEmpty
  const setValue = props.setValue


  const handeClick = (slotInfo) => {
    if (slotInfo.end >= Date.now()) {
      setOpen(true)
    }
    setMyDate(slotInfo.end)
    setEmpty()
  }

  const handleView = (event) => {
    console.log("Raw event:", event)
    let selectedDate;
    if (typeof event.date === 'string') {
      const [year, month, day] = event.date.split('-').map(Number);
      selectedDate = new Date(`${year}, ${month} , ${day + 1}`); // 
    } else if (event.start instanceof Date) {
      selectedDate = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate());
    } else {
      selectedDate = new Date(); // fallback
    }
    selectedDate.setHours(0, 0, 0, 0)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("Parsed selected date:", selectedDate);
    console.log("Today:", today);

    if (selectedDate >= today) {
      setOpen(true);
      setMyDate(selectedDate);
      setValue(event)

    }
  };






  const { className } = props
  if (!myEventsList || myEventsList.length === 0) {
    return <div className="text-center text-gray-500">No events scheduled</div>
  }
  if (!localizer) {
    return <div className="text-center text-red-500">Calendar not initialized</div>
  }
  if (!Array.isArray(myEventsList)) {
    return <div className="text-center text-red-500">Invalid events data</div>
  }
  const CustomEvent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <div>{event.name}</div>
    </div>
  );


  return (

    <div className="h-[500px] overflow-scroll scroll-smooth custom-calendar grid grid-cols-1 gap-4 px-4 lg:px-6 rounded-md shadow">

      <Calendar
        localizer={localizer}
        events={myEventsList}
        defaultDate={new Date()}
        startAccessor="start"
        endAccessor="end"
        popup={true}
        selectable={true}
        views={['month', 'agenda', 'day']}
        toolbar={true}
        onView={(view) => console.log('View changed:', view)}
        onNavigate={(date, view, action) =>
          console.log('Navigated:', { date, view, action })
        }
        onSelectEvent={handleView}
        onSelectSlot={handeClick}
        components={{
          event: CustomEvent,
        }}
        dayPropGetter={(date) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          const current = new Date(date)
          current.setHours(0, 0, 0, 0)

          if (current < today) {
            return {
              style: {
                backgroundColor: '#181926',
                color: '#7f1d1d',
                
              },
            }
          }
          return {}
        }}
        style={{ height: '100%' }}
        className={className}
      />


    </div>
  )
}