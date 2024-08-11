"use client";

import * as React from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/utilities/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    className: string;
    value: Date | null;
    setDue: Dispatch<SetStateAction<Date | null>>;
}

export function DatePicker({ className, value, setDue }: DatePickerProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        value || undefined
    );

    const onSelect: SelectSingleEventHandler = (date) => {
        setSelectedDate(date as Date);
        setDue(date as Date | null);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl font-inter focus:outline-none focus:ring-2 focus:ring-black ",
                        !selectedDate && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                        format(selectedDate, "dd/MM/yyyy")
                    ) : (
                        <span>Pick due date:</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={onSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
