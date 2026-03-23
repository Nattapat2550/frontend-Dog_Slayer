export interface RestaurantItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  logo: string;
  picture: string;
  openTime: string;
  closeTime: string;
  __v: number;
  id: string;
}

export interface RestaurantJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: RestaurantItem[];
}

export interface ReservationItem {
  name: string;
  tel: string;
  restaurant: string
  address: string;
  reservationDate: string;
}