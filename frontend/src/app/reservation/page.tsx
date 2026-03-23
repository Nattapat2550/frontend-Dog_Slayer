import getRestaurants from "@/libs/getRestaurants";
import ReservationClient from "@/components/ReservationClient"

export default async function Page() {
  const restaurants = await getRestaurants();

  return <ReservationClient restaurants={restaurants.data} />;
}