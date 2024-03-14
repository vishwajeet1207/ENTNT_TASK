import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "userSlice",
  initialState: {
    userdata: "",
  },
  reducers: {
    addUser(state, action) {
      state.userdata = action.payload.data;
    },
  },
});
export const { addUser } = UserSlice.actions;
export default UserSlice.reducer;
