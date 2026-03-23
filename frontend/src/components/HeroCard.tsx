import React from "react";
import { RestaurantItem } from "interface";

type Props = {
    restaurant: RestaurantItem;
};

const HeroCard: React.FC<Props> = ({ restaurant }) => {
    return (
    <div className="relative w-full h-[240px] rounded-2xl overflow-hidden shadow-md">
        {/* background na ja */}
        <img
            src={restaurant.picture}
            alt={restaurant.name}
            className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"/>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">

            {/* Logo */}
            <div className="absolute top-4 left-4 bg-white rounded-xl p-2 shadow">
                <img
                    src={restaurant.logo}
                    alt="logo"
                    className="w-12 h-12 object-contain"
                />
            </div>

            {/* Subtitle */}
            <p className="text-sm opacity-80 mb-1">Restaurant Detail</p>

            {/* Restuarant Name */}
            <h1 className="text-3xl font-bold leading-tight">{restaurant.name}</h1>        
        </div>
    </div>
    )
}

export default HeroCard;