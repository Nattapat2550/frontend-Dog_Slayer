export default async function getRestaurants() {
    const response = await fetch("https://backend-dog-slayer.vercel.app//api/v1/restaurants")
    if(!response.ok) {
        throw new Error("Failed to fetch")
    }
    return await response.json()
}