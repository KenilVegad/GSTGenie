
import React, { useState } from 'react';

const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(month, year);
    const monthData = [];

    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (day > totalDays) {
          week.push(null);
        } else {
          week.push(day);
          day++;
        }
      }
      monthData.push(week);
      if (day > totalDays) break;
    }
    return monthData;
  };

  const monthData = getMonthData();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
          className="text-gray-400 hover:text-white"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold">
          {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
          className="text-gray-400 hover:text-white"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {weekdays.map((day) => (
          <div key={day} className="font-semibold text-gray-400">{day}</div>
        ))}
        {monthData.map((week, i) =>
          week.map((day, j) => (
            <div
              key={`${i}-${j}`}
              className={`p-2 rounded-full ${
                day ? 'hover:bg-gray-700 cursor-pointer' : ''
              } ${
                day && new Date().getDate() === day && date.getMonth() === new Date().getMonth()
                  ? 'bg-blue-500 text-white'
                  : ''
              }`}
            >
              {day}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
