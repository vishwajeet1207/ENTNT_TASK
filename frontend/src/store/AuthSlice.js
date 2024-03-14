import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    user: null,
    token: "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { setToken } = AuthSlice.actions;
export default AuthSlice.reducer;
