"use client"
import { removeReservation } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { updateReservation } from "@/redux/features/bookSlice";

export default function BookingList () {
    const bookItems = useAppSelector((state)=> state.bookSlice.reservationItems)
    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession();
    const [selectedItem, setSelectedItem] = useState<ReservationItem | null>(null);
    const [editDate, setEditDate] = useState("");
    const [editTime, setEditTime] = useState("");

    if (!session?.user?.email) {
        return (
            <div className="text-center mt-10 text-gray-500">
                Please login to view your bookings
            </div>
        )
    }

    const visibleItems = bookItems.filter(
        (item) => item.userEmail === session?.user?.email
    );

    return (
        <div className="space-y-4 w-[80%] mx-auto px-4 pt-10">
            <div className="text-2xl font-bold">
                Booking List ({visibleItems.length}/3)
            </div>
        {   
            visibleItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-5">
                    No Restaurant Booking
                </div>
            ) : (
                visibleItems.map((item, key)=> (
                <div key={key} className="flex items-center gap-4">

                    {/* Number */}
                    <div className="text-orange-500 text-3xl font-bold w-8">
                    {key + 1}.
                    </div>

                    {/* Card */}
                    <div className="relative flex items-center w-full h-[90px] rounded-xl overflow-hidden shadow-md">

                    {/* Background */}
                    <img
                        src={`/img/restaurant/banner/${item.restaurant}.png`}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 flex items-center flex-1 px-4 gap-4 text-white">

                        {/* Logo */}
                        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                        <img
                            src={`/img/restaurant/logo/${item.restaurant}.png`}
                            className="w-full h-full object-cover"
                        />
                        </div>

                        {/* Text */}
                        <div>
                        <div className="text-lg font-semibold">
                            {item.restaurant}
                        </div>

                        <div className="flex gap-4 text-xs opacity-80">
                            <span>📍 Central World, Bangkok</span>
                            <span>👤 {item.name}</span>
                            <span>📞 {item.tel}</span>
                            <span>🕒 {item.reservationDate}</span>
                        </div>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => {
                            if (selectedItem === item) {
                                setSelectedItem(null)
                            } else {
                                setSelectedItem(item)

                                const date = new Date(item.reservationDate)
                                const yyyy = date.toISOString().split("T")[0]
                                const hhmm = date.toTimeString().slice(0,5)

                                setEditDate(yyyy)
                                setEditTime(hhmm)
                            }
                        }}
                        className="h-full w-16 bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white text-xl font-bold z-10"
                    >
                        :
                    </button>

                    </div>
                    {selectedItem?.reservationDate === item.reservationDate && (
                        <div className="bg-orange-500 p-3 rounded-xl w-200">
                            
                            <div className="bg-white p-3 rounded-lg">
                            <div className="font-semibold mb-2">Edit Reservation</div>
                            <div className="flex gap-2">
                                <input
                                type="date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="w-full border p-2 rounded"
                                />

                                <input
                                type="time"
                                value={editTime}
                                onChange={(e) => setEditTime(e.target.value)}
                                className="w-full border p-2 rounded"
                                />
                                <button
                                onClick={() => {
                                    console.log("start update")
                                    if (!editDate || !editTime) {
                                        alert("Please fill date and time")
                                        return
                                    }

                                    const updatedDate = new Date(`${editDate}T${editTime}`)
                                    console.log(updatedDate)
                                    const updatedItem = {
                                        ...item,
                                        reservationDate: updatedDate.toString()
                                    }

                                    dispatch(updateReservation({
                                        ...updatedItem,
                                        oldReservationDate: item.reservationDate
                                    }))
                                    setSelectedItem(null)
                                }}
                                className="w-20     bg-orange-500 text-white px-4 py-1 rounded">Update</button>

                                <button
                                onClick={()=>dispatch(removeReservation(item))}
                                className="w-20 bg-red-500 text-white px-4 py-1 rounded">
                                    Delete
                                </button>
                            </div>
                            </div>

                        </div>
                    )}
                </div>
            ))
        )
    }
    </div>
    )
}