import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReservationState {
  reservationItems: ReservationItem[];
}

const initialState: ReservationState = { reservationItems: [], };

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<ReservationItem>) => {
      if (!state.reservationItems) {
        state.reservationItems = [];
      }
      const index = state.reservationItems.findIndex(item =>
        item.restaurant === action.payload.restaurant &&
        item.reservationDate === action.payload.reservationDate
      );

      if (index !== -1) {
        state.reservationItems[index] = action.payload;
      } else {
        state.reservationItems.push(action.payload);
      }
    },
    removeReservation: (state, action: PayloadAction<ReservationItem>) => {
      // ตัวอย่างการลบข้อมูล (เอาข้อมูลที่ชื่อและวันที่ไม่ตรงกันไว้)
      state.reservationItems = state.reservationItems.filter(item =>
        !(
          item.name === action.payload.name &&
          item.tel === action.payload.tel &&
          item.restaurant === action.payload.restaurant &&
          item.reservationDate === action.payload.reservationDate
        )
      );
    },
    updateReservation: (state, action: PayloadAction<any>) => {
      const index = state.reservationItems.findIndex(item =>
        item.restaurant === action.payload.restaurant &&
        item.reservationDate === action.payload.oldReservationDate
      );

      if (index !== -1) {
        state.reservationItems[index] = {
          ...state.reservationItems[index],
          reservationDate: action.payload.reservationDate
        };
      }
    }
  }
});

export const { addReservation, removeReservation, updateReservation } = reservationSlice.actions;
export default reservationSlice.reducer;