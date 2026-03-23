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

    alert(`Booking on ${reserveDate.format("YYYY-MM-DD")}${time ? ` at ${time}` : ""}`);
    };

    return (
        <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Book a Table</h2>

            {/* Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className='bg-white'
                value={reserveDate}
                onChange={(value)=>{setReserveDate(value); onDateChange(value)}}
            />
            </LocalizationProvider>

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
        </div>
    );
}