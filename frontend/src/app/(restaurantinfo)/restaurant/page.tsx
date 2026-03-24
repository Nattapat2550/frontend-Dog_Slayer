import getRestaurants from "@/libs/getRestaurants";
import RestaurantCatalog from "@/components/RestaurantCatalog";

export default async function restaurant() {
  const restaurant = await getRestaurants()
  return (
    <main className="text-center p-5">
        <h1 className="text-xl font-medium">Select Your Restaurant</h1>
        <RestaurantCatalog restaurantsJSON={restaurant}/>
    </main>
  );
}