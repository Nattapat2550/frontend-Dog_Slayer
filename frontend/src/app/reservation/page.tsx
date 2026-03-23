"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dayjs } from "dayjs";
import { ReservationItem, RestaurantItem } from "interface";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

import TextField from "@mui/material/TextField";

import HeroCard from "@/components/HeroCard";
import InfoCard from "@/components/InfoCard";
import BookingCard from "@/components/BookingCard";

type Props = {
  restaurant: RestaurantItem;
};

export default function Booking({ restaurant }: Props) {
    const urlParams = useSearchParams();
    const rid = urlParams.get("id");

    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState("");

    const dispatch = useDispatch<AppDispatch>()

    const handleBooking = () => {
        if (!name || !tel || !reserveDate) {
            alert("Please fill all required fields");
            return;
        }

        // combine date + time
        const reservationDate = time
        ? `${reserveDate.format("YYYY-MM-DD")}T${time}`
        : reserveDate.format("YYYY-MM-DD");

        const item:ReservationItem = {
            name: name,
            tel: tel,
            restaurant: restaurant.name,
            address: restaurant.address,
            reservationDate: reservationDate,
        };

        dispatch(addBooking(item));

        alert("Booking success!");
    };

    return (
        <main className="bg-slate-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                
                <HeroCard restaurant={restaurant}/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InfoCard restaurant={restaurant}/>

                    <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
                        <h2 className="text-lg font-semibold">Book a Table</h2>

                        <div>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <TextField
                                label="Telephone"
                                variant="outlined"
                                fullWidth
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                            />
                        </div>

                        <BookingCard
                            onDateChange={(value: Dayjs) => setReserveDate(value)}
                            onTimeChange={(value: string) => setTime(value)}
                        />

                        <button
                            onClick={handleBooking}
                            className="w-full bg-[#FF6200] hover:bg-[#e55a00] text-white py-2 rounded-lg">Confirm Booking</button>
                    </div>
                </div>

            </div>
        </main>
    );
}