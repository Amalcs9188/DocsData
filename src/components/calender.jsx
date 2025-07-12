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
const {Data_Items} = useDocContext()

const myEventsList = Data_Items.map((item) => ({
  ...item,
  title: item.patientName,
  name:item.time,
  start: new Date(item.date),
  end: new Date(item.date),
}))
  // select date
  const setOpen = props.setOpen
  const setMyDate = props.setMyDate
  const setEmpty = props.setEmpty

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
        popup={true}
        endAccessor="end"
        components={{
          event: CustomEvent,
        }}
        style={{ height: '100%' }}
        className={className}
        selectable={true}
        onSelectEvent={(event) => console.log('Event selected:', event)}
        onSelectSlot={(slotInfo) => { setOpen(true), setMyDate(slotInfo.end) , setEmpty() }}
      />
    </div>
  )
}