import Image from "next/image"
import getRestaurant from "@/libs/getRestaurant"
import getRestaurants from "@/libs/getRestaurants"
import Link from "next/link"

export default async function RestaurantDetailPage({ params }: { params: Promise<{ restid: string }> }) {
    const { restid } = await params
    const [restaurantDetail, restaurants] = await Promise.all([
        getRestaurant(restid),
        getRestaurants()
    ])

    const data = restaurantDetail.data
    const list = restaurants.data

    const currentIndex = list.findIndex((item: any) => item.id === restid)

    const prevId = currentIndex > 0 ? list[currentIndex - 1].id : list[list.length - 1].id
    const nextId = currentIndex < list.length - 1 ? list[currentIndex + 1].id : list[0].id

    return (
        <main className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
            <Link href={`/restaurant/${prevId}`}>
                <button className="pr-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg m-5">
                    ← Previous
                </button>
            </Link>
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="relative w-full h-[300px]">
                    <Image
                        src={"/img/restaurant/banner/" + data.name + ".png"}
                        alt="Restaurant Image"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-3">{data.name}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div>
                            <p><span className="font-semibold">Address:</span> {data.address}</p>
                            <p><span className="font-semibold">Open Time:</span> {data.opentime}</p>
                            <p><span className="font-semibold">Close Time:</span> {data.closetime}</p>
                        </div>

                        <div>
                            <p><span className="font-semibold">Tel:</span> {data.tel}</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-5">
                        <Link href="/reservation">
                            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                                Booking Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Link href={`/restaurant/${nextId}`}>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg m-5">
                    Next →
                </button>
            </Link>
        </main>
    )
}