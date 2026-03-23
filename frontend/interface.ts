interface RestaurantItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  opentime: string;
  closetime: string;
  __v: number;
  id: string;
}

interface RestaurantJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: RestaurantItem[];
}

interface ReservationItem {
  ResId: string;
  name: string;
  tel: string;
  restaurant: string
  address: string;
  reservationDate: string;
}