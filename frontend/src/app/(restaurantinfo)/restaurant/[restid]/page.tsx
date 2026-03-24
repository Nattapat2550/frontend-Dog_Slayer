import Image from "next/image"
import getRestaurant from "@/libs/getRestaurant"

export default async function RestaurantDetailPage({params}: {params: Promise<{restid: string}>}) {
    const { restid } = await params
    const restaurantDetail = await getRestaurant(restid)

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{restaurantDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={`/img/restaurant/banner/${restaurantDetail.data.name}.png`}
                    alt="Product Pocture"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%] bg-black"/>
                <div className="text-md mx-5 text-left">Name: {restaurantDetail.data.name}
                    <div>Address: {restaurantDetail.data.address}</div>
                    <div>District: {restaurantDetail.data.district}</div>
                    <div>Postal Code: {restaurantDetail.data.postalcode}</div>
                    <div>Tel: {restaurantDetail.data.tel}</div>
                </div>
            </div>
        </main>
    )
}