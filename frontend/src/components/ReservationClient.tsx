"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addReservation } from "@/redux/features/bookSlice";
import { useSession } from 'next-auth/react';

import TextField from "@mui/material/TextField";

import HeroCard from "@/components/HeroCard";
import InfoCard from "@/components/InfoCard";
import BookingCard from "@/components/BookingCard";

export default function Reservation({ restaurants }: { restaurants: RestaurantItem[] }) {
    const searchParams = useSearchParams()
    const rid = searchParams.get("rid")
    
    useEffect(() => {
        if (rid) {
            const found = restaurants.find(r => r.id === rid)
            if (found) setRestaurant(found)
        }
    }, [rid, restaurants])

    const bookItems = useAppSelector((state)=> state.bookSlice.reservationItems)
    const { data: session } = useSession();
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState("");
    const [restaurant, setRestaurant] = useState<RestaurantItem>(restaurants[0]);

    const dispatch = useDispatch<AppDispatch>()

    const userBookings = bookItems.filter(
        (item) => item.userEmail === session?.user?.email
    );

    //For check Hour
    const isWithinOpeningHours = (
        reserveDate: Dayjs,
        openTime: string,
        closeTime: string
        ) => {
        const [openH, openM] = openTime.split(":").map(Number);
        const [closeH, closeM] = closeTime.split(":").map(Number);

        let open = reserveDate.hour(openH).minute(openM).second(0);
        let close = reserveDate.hour(closeH).minute(closeM).second(0);

        const now = dayjs();
        if (reserveDate.isBefore(now)) return false;

        // ถ้าข้ามวัน
        if (close.isBefore(open)) {
            close = close.add(1, "day");

            if (reserveDate.isBefore(open)) {
            reserveDate = reserveDate.add(1, "day");
            }
        }

        return (
            (reserveDate.isAfter(open) || reserveDate.isSame(open)) &&
            (reserveDate.isBefore(close) || reserveDate.isSame(close))
        );
    };

    const makeReservation = () => {
        if (name && tel && reserveDate && time && restaurant.address) {

            const [hour, minute] = time.split(":").map(Number);
            const selected = reserveDate
                .hour(hour)
                .minute(minute)
                .second(0);
            
            if (!isWithinOpeningHours(selected, restaurant.opentime, restaurant.closetime)) {
                alert(`Restaurant is open from ${restaurant.opentime} to ${restaurant.closetime} and must not be the past`);
                return;
            }

            const item:ReservationItem = {
                name: name,
                tel: tel,
                restaurant: restaurant.name,
                address: restaurant.address,
                reservationDate: selected.toString(),
                userEmail: session?.user?.email!
            }

            if (session?.user?.role !== "admin" && userBookings.length >= 3) {
                alert("Maximum Reservation Booking (3)");
                return;
            }

            dispatch(addReservation(item));
            alert("Booking success!");
        } else if (!name) {
            alert("Missing name!");
        } else if (!tel) {
            alert("Missing Telephone number!");
        } else if (!reserveDate) {
            alert("Missing reservation Date!");
        } else if (!restaurant.address) {
            alert("Missing Address!");
        } else if (!time) {
            alert("Missing Time!");
        }
    };

    return (
        <main className="bg-slate-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                
                <HeroCard
                    restaurant={restaurant}
                    restaurants={restaurants}
                    onSelect={setRestaurant}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InfoCard 
                        restaurant={restaurant}
                    />

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
                            onClick={makeReservation}
                            className="w-full bg-[#FF6200] hover:bg-[#e55a00] text-white py-2 rounded-lg">Confirm Booking</button>
                    </div>
                </div>

            </div>
        </main>
    );
}