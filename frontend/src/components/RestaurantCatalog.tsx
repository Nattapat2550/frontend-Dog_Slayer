"use client"
import Link from "next/link"
import { useState, useMemo } from "react"

export default function RestaurantCatalog({ restaurantsJSON }: { restaurantsJSON: RestaurantJson }) {

    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("asc")

    const filtered = useMemo(() => {
        let result = restaurantsJSON.data.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        )

        result.sort((a, b) => {
            if (sort === "asc") {
            return a.name.localeCompare(b.name)
            } else {
            return b.name.localeCompare(a.name)
            }
        })
        return result
    }, [search, sort, restaurantsJSON])

    return (
        <>
            Explore {restaurantsJSON.count} item in our catalog
            <div className="max-w-[900px] mx-auto mt-6 p-4 border rounded-2xl flex gap-4 items-center">

            <div className="flex items-center border rounded-xl px-3 py-2 flex-1">
                <span className="mr-2">🔍</span>
                <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none"
                />
            </div>

            <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-xl px-4 py-2">
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>

            </div>
            <div className="max-w-[900px] mx-auto mt-4 flex flex-col gap-4">
            {filtered.map((item: RestaurantItem) => (
                <Link href={`/restaurant/${item.id}`} key={item.id}>
                
                <div className="flex items-center gap-4 p-4 border rounded-2xl hover:shadow-md transition">
                    <img src={"/img/restaurant/logo/" + item.name + ".png"}
                    alt="logo"
                    className="w-16 h-16 rounded-full object-cover"/>
                    <div className="flex flex-col text-left">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span>📍 Address: {item.address}</span>
                            <span>📞 Telephone: {item.tel}</span>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
            </div>
        </>
    )
}