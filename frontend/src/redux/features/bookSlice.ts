import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "interface";

interface ReservationState {
  reservationItems: ReservationItem[];
}

const initialState: ReservationState = { reservationItems: [] };

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    addReservation: (state: ReservationState, action: PayloadAction<ReservationItem>) => {
      // เพิ่มข้อมูลลงใน state
      state.reservationItems.push(action.payload);
    },
    removeReservation: (state: ReservationState, action: PayloadAction<ReservationItem>) => {
      // ตัวอย่างการลบข้อมูล (เอาข้อมูลที่ชื่อและวันที่ไม่ตรงกันไว้)
      state.reservationItems = state.reservationItems.filter(
        (item) => item.name !== action.payload.name || item.reservationDate !== action.payload.reservationDate
      );
    }
  }
});

export const { addReservation, removeReservation } = reservationSlice.actions;
export default reservationSlice.reducer;