import { configureStore } from "@reduxjs/toolkit";
import CatSlice from "./CatSlice";
import CardSlice from "./CardSlice";
import UserSlice from "./UserSlice";
import AuthSlice from "./AuthSlice";
const store = configureStore({
  reducer: {
    catSlice: CatSlice,
    cardSlice: CardSlice,
    userSlice: UserSlice,
    authSlice: AuthSlice,
  },
});
export default store;
