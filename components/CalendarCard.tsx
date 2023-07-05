"use client";

import React, { useState } from "react";
import Card from "@/components/Card";
import { Task } from "@prisma/client";
import { MoreHorizontal } from "react-feather";
import Link from "next/link";
import { getDaysInMonth, getFirstDayOfMonth } from "@/utilities/dateUtils";

interface CalendarCardProps {
  tasks: Task[];
}

const CalendarCard: React.FC<CalendarCardProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
      <div className="h-full grid grid-cols-7 gap-4 md:gap-2">
        {daysOfWeek.map((day, index) => (
          <span
            key={day}
            className={`flex items-center justify-center text-center font-bold w-full h-10 md:text-sm sm:rounded ${
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
          <div key={`empty-${index}`} className="invisible h-30" />
        ))}
        {days.map((day) => {
          const tasksForDay = tasks.filter(
            (task) =>
              task.due.getDate() === day &&
              task.due.getMonth() === currentDate.getMonth() &&
              task.due.getFullYear() === currentDate.getFullYear()
          );
          return (
            <div
              key={day}
              className={`flex flex-col text-center border border-gray-400 rounded-lg h-30 max-h-40 hover:bg-purple-300 hover:text-black ${
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()
                  ? "bg-purple-500 text-white"
                  : ""
              }`}
            >
              {day}
              <div className="flex flex-col align-middle items-center gap-1 w-full text-xs ">
                {tasksForDay.slice(0, 5).map((task) => (
                  <Link
                    className="block md:hidden w-full bg-gray-800 text-white hover:text-purple-400 rounded-md"
                    key={task.id}
                    href={`/project/${task.projectId}`}
                  >
                    <span>{task.name}</span>
                  </Link>
                ))}
                {tasksForDay.length > 5 && (
                  <MoreHorizontal
                    className="block md:hidden text-purple-500 cursor-pointer"
                    strokeWidth={3}
                  />
                )}
                {tasksForDay.length > 1 && (
                  <span className="items-center hidden mt-2 md:block w-6 h-6  bg-blue-400 rounded-full text-white hover:text-purple-400 hover:cursor-pointer">
                    {tasksForDay.length}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col items-center md:px-3">
      {renderCalendarHeader()}
      <div className="w-full flex-grow text-xl">{renderCalendarGrid()}</div>
    </Card>
  );
};

export default CalendarCard;
