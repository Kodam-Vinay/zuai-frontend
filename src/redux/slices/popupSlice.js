import { createSlice } from "@reduxjs/toolkit";
import { POPUP_TYPES } from "../../utils/constants";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isOpen: false,
    type: POPUP_TYPES.newpost,
    post_details: null,
    confirm_state: false,
  },
  reducers: {
    togglePopupState: (state, action) => {
      state.isOpen = action.payload;
    },
    changePopupType: (state, action) => {
      state.type = action.payload;
    },
    storePostDetails: (state, action) => {
      state.post_details = action.payload;
    },
    changeConfirmState: (state, action) => {
      state.confirm_state = action.payload;
    },
  },
});
export const {
  togglePopupState,
  changePopupType,
  storePostDetails,
  changeConfirmState,
} = popupSlice.actions;
export default popupSlice.reducer;
