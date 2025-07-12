"use client"
import { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { Card } from './ui/card';

export const MobileCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showFullCalendar, setShowFullCalendar] = useState(false);

  const handleNext = () => setSelectedDate((prev) => addDays(prev, 1));
  const handlePrev = () => setSelectedDate((prev) => subDays(prev, 1));

  return (
    <div className="p-4 text-center">
      <div className="flex justify-center items-center gap-4">
       <Card className="w-full flex justify-around items-center flex-row">
          <button onClick={handlePrev}><ArrowBigLeftDash /></button>
          <span className="text-lg font-semibold">
            {format(selectedDate, 'PP')}
            <br />event
          </span>
          <button onClick={handleNext}><ArrowBigRightDash /></button>
       </Card>
      </div>

      <button
        className="mt-2 underline text-blue-500"
        onClick={() => setShowFullCalendar(!showFullCalendar)}
      >
        {showFullCalendar ? 'Hide calendar' : 'Pick date'}
      </button>

      {showFullCalendar && (
        <div className="mt-2 flex w-full justify-center items-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
          />
        </div>
      )}
    </div>
  );
};
