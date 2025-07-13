'use client'

import { useEffect, useRef, useState } from 'react'
import { format, addDays, subDays } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { ArrowBigLeftDash, ArrowBigRightDash, CalendarDays } from 'lucide-react'
import { Card } from './ui/card' // Make sure you have a Card component or replace with <div>
import { useDocContext } from '@/app/context/MyContext'

export const MobileCalendar = ({setMyDate,handleMbSet}) => {

  const { Data_Items, setopen} = useDocContext();
  
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showFullCalendar, setShowFullCalendar] = useState(false)


  const filterdDate = Data_Items.filter((item) => {
    const itemDate = new Date(item.date)
    return itemDate.toDateString() === selectedDate.toDateString()
  })

  const handleNext = () => {
    setSelectedDate((prev) => addDays(prev, 1))
  }

  const handlePrev = () => {
    setSelectedDate((prev) => subDays(prev, 1))
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    const deltaX = touchEndX.current - touchStartX.current

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        handleNext() 
      } else {
        handlePrev() 
      }
    }
  }

  return (
    <div className="p-4 text-center">
      <div
        className="flex justify-center flex-col items-center gap-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <CalendarDays  onClick={() => setShowFullCalendar(!showFullCalendar)}  size={32} strokeWidth={2.5} absoluteStrokeWidth />
        <Card  className="w-full flex justify-around items-center flex-row p-4">
          <button onClick={handlePrev}><ArrowBigLeftDash /></button>
          <span  onClick={()=>{format(selectedDate,  'yyyy-MM-dd')>= Date.now() && setopen(true) ,format(selectedDate,  'yyyy-MM-dd')>= Date.now() &&  setMyDate(format(selectedDate,  'yyyy-MM-dd'))}} className="text-lg font-semibold">
            {format(selectedDate, 'PP')}
            <br />{

              filterdDate.length > 0 ? (
                filterdDate.map((item) => (
                  <div onClick={()=>{ handleMbSet(item.id)}} key={item.id}>
                    <p>{item.patientName}</p>
                    <p>{item.time}</p>
                    <hr />
                  </div>
                ))
              )
              : (
                <p>No appointments</p>
              )
            }
          </span>
          <button onClick={handleNext}><ArrowBigRightDash /></button>
        </Card>
      </div>

      <button
        className="mt-2 underline text-blue-500"
        onClick={() => setShowFullCalendar(!showFullCalendar)}
      >
        {showFullCalendar ? 'Hide calendar' : ''}
      </button>

      {showFullCalendar && (
        <div className="mt-2 flex w-full justify-center items-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) =>{ date && setSelectedDate(date); }}
          />
        </div>
      )}
    </div>
  )
}
