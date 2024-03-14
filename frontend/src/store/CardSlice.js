import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
const CardSlice = createSlice({
  name: "cartSlice",
  initialState: {
    data: [],
  },
  reducers: {
    addtocardFromDatabase(state, action) {
      state.data = action.payload;
    },
    reduceCount(state, action) {
      state.data.map((item) => {
        if (item.title === action.payload.title) {
          if (item.count > 1) {
            item.count = item.count - 1;
          }
        }
        return item;
      });
    },
    addToCard(state, action) {
      var temp = 0;
      state.data.map((item) => {
        if (action.payload.remove == -1) {
          if (item.title === action.payload.item.title) {
            temp += 1;
            if (item.count > 1) {
              item.count = item.count - 1;
            }
          }
        } else {
          if (item.title === action.payload.item.title) {
            temp += 1;
            item.count = item.count + 1;
          }
        }

        return item;
      });
      if (temp === 0) {
        var newItem = action.payload.item;
        newItem.count = 1;
        // action.payload.count = 1;
        state.data = [...state.data, newItem];
      }
    },
    removeToCard(state, action) {
      state.data = state.data.filter(
        (item) => item.title !== action.payload.title
      );
    },
  },
});
export const { addtocardFromDatabase, addToCard, removeToCard } =
  CardSlice.actions;
export default CardSlice.reducer;

export function ItemFromCard() {
  return async function getFromDatabase(dispatch, getState) {
    try {
      let temp = await axios.get(
        "http://localhost:5000/card/" + Cookies.get("id")
      );
      var newdata = temp.data;

      dispatch(addtocardFromDatabase(newdata));
    } catch (err) {}
  };
}

export function addToDataBaseInCard(items, addOrRemove) {
  return async function getFromDatabase(dispatch, getState) {
    try {
      const res = await axios.post(
        "http://localhost:5000/card/" + Cookies.get("id"),
        { item: items, remove: addOrRemove },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(addToCard({ item: items, remove: addOrRemove }));
    } catch (err) {}
  };
}
export function toDeleteFromDatabaseAndCard(item) {
  return async function deleteFromDatabase(dispatch, getState) {
    try {
      const res = await axios.delete(
        "http://localhost:5000/card/" + Cookies.get("id") + "/" + item.title,
        item,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(removeToCard(item));
    } catch (err) {}
  };
}
