"use client"
import { removeReservation } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
export default function BookingList () {
    const bookItems = useAppSelector((state)=> state.bookSlice.reservationItems)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className="space-y-4 w-[80%] mx-auto px-4 pt-10">
            <div className="text-2xl font-bold">
                Booking List ({bookItems.length}/3)
            </div>
        {   
            bookItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-5">
                    No Restaurant Booking
                </div>
            ) : (
                bookItems.map((item, key)=> (
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
                        onClick={()=>dispatch(removeReservation(item))}
                        className="h-full w-16 bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white text-xl font-bold z-10"
                    >
                        –
                    </button>
                    </div>
                </div>
                ))
    )
    }
    </div>
    )
}