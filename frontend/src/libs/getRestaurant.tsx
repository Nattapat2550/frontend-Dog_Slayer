export default async function getRestaurant(id:string) {
    const response = await fetch(`https://backend-dog-slayer.vercel.app//api/v1/restaurants/${id}`)
    if(!response.ok) {
        throw new Error("Failed to fetch")
    }
    return await response.json()
}