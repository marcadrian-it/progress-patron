"use client";

import React, { useState } from "react";
import Card from "@/components/Card";

const CalendarCard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return prevMonthDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        1
      );
      return nextMonthDate;
    });
  };

  const renderCalendarHeader = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };

    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    return (
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-purple-500 hover:text-gray-700 text-2xl px-2 py-1"
          onClick={prevMonth}
        >
          {"<"}
        </button>
        <h2 className="text-xl font-bold">{formattedDate}</h2>
        <button
          className="text-purple-500 hover:text-gray-700 text-2xl px-2 py-1"
          onClick={nextMonth}
        >
          {">"}
        </button>
      </div>
    );
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfWeek = getFirstDayOfMonth(currentDate);

    const emptyCells = Array(
      firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
    ).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const todayIndex = (new Date().getDay() + 6) % 7;

    return (
      <div className="h-full grid grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => (
          <span
            key={day}
            className={`flex items-center justify-center text-center font-bold w-full h-10 ${
              index === todayIndex &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear()
                ? "rounded-3xl border border-purple-500 text-white bg-purple-500"
                : ""
            }`}
          >
            {day}
          </span>
        ))}
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="invisible" />
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`text-center border rounded-lg ${
              day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear()
                ? "bg-purple-500 text-white"
                : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col pt-8 items-center">
      {renderCalendarHeader()}
      <div className="w-full flex-grow text-xl">{renderCalendarGrid()}</div>
    </Card>
  );
};

export default CalendarCard;
