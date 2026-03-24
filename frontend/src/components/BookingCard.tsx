'use client'

import { useState } from "react";
import { Dayjs } from "dayjs";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Select, MenuItem } from "@mui/material";

export default function BookingCard ({onDateChange, onTimeChange} : {onDateChange:Function, onTimeChange:Function}) {
    
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState("");

    const handleBooking = () => {
        if (!reserveDate) {
        alert("Please select a date");
        return;
        }
    };

    return (
        <>
            <div className="flex flex-col">
            {/* Date */}
            <label className="text-sm text-gray-600">Reservation Date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className='bg-white'
                value={reserveDate}
                onChange={(value)=>{setReserveDate(value); onDateChange(value)}}
            />
            </LocalizationProvider>
            </div>
            {/* Time */}
            <div>
                <label className="text-sm text-gray-600">Time</label>
                <input 
                    type="time"
                    className="w-full border rounded-lg p-2 mt-1"
                    value={time}
                    onChange={(e)=>{setTime(e.target.value); onTimeChange(e.target.value)}}
                />
            </div>
        </>
    );
}