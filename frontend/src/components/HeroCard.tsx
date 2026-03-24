"use client";

import React, { useState } from "react";
import { Select, MenuItem } from '@mui/material'

export default function HeroCard({ restaurant, restaurants, onSelect } : { restaurant:RestaurantItem, restaurants: RestaurantItem[], onSelect: (r: RestaurantItem) => void; }) {

    return (
        <div className="relative w-full h-[240px] rounded-2xl overflow-hidden shadow-md">

        {/* Background */}
        <div className="relative w-full h-full">

            <img
                src={`/img/restaurant/banner/${restaurant.name}.png`}
                alt={restaurant.name}
                className="w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">

            {/* Logo */}
            <div className="absolute top-4 left-6 bg-white rounded-xl p-2 shadow">
            <img
                src={`/img/restaurant/logo/${restaurant.name}.png`}
                alt="logo"
                className="w-16 h-16 object-contain"
            />
            </div>

            {/* Subtitle */}
            <p className="text-sm opacity-80">Restaurant Name</p>

            {/* Restuarant Name */}
            <h1 className="text-5xl font-bold leading-tight">{restaurant.name}</h1>

            {/* Dropdown */}
            <Select
                variant='standard'
                value={restaurant.id}
                onChange={(e) => {
                    const value = e.target.value as string;
                    const selected = restaurants.find(r => r.id === e.target.value);
                    if (selected) onSelect(selected); //ส่งกลับ parent na kub
                }}
                MenuProps={{
                    disableScrollLock: true
                }}
                sx={{
                    pl: "10px",
                    height: "2em",
                    width: "200px",
                    backgroundColor: "#e55a00",
                    color: "white",
                    borderRadius: "12px",
                    "&:hover": {
                        backgroundColor: "white",
                        color: "#e55a00",
                    },

                    "&:before": { display: "none" },
                    "&:after": { display: "none" },
                }}
                >

                {/* Map Data */}
                {restaurants.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                    {r.name}
                </MenuItem>
                ))}
            </Select>
        </div>
        </div>
    );
};