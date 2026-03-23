"use client"
import React from "react";
import { ReservationItem, RestaurantItem } from "interface";

export default function InfoCard({ restaurant } : { restaurant: RestaurantItem }) {
    return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
            <img src="/img/icon/LocationIcon.svg" className="w-6 h-6 mt-1" />
            <div>
                <p className="font-semibold">Address :</p>
                <p className="text-gray-600 text-sm">
                    {restaurant.address}
                </p>
            </div>
        </div>

        {/* Telephone */}
        <div className="flex items-start gap-3">
            <img src="/img/icon/PhoneIcon.svg" className="w-6 h-6 mt-1"/>
            <div>
                <p className="font-semibold">Telephone :</p>
                <p className="text-gray-600 text-sm">
                    {restaurant.tel}
                </p>
            </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3">
            <img src="/img/icon/ClockIcon.svg" className="w-6 h-6 mt-1"/>
            <div>
                <p className="font-semibold">Operating Hours :</p>
                <p className="text-gray-600 text-sm">
                    {restaurant.opentime} - {restaurant.closetime}
                </p>
            </div>
        </div>
    </div>
    );
};