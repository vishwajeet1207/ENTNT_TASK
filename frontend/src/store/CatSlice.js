import { createSlice } from "@reduxjs/toolkit";

const CatSlice = createSlice({
  name: "cat",
  initialState: {
    data: [],
    status: "WAIT",
    cat: "mobiles",
  },
  reducers: {
    addCatItem(state, action) {
      state.data = action.payload;
    },
    addStatus(state, action) {
      state.status = action.payload;
    },
    addCat(state, action) {
      state.cat = action.payload;
    },
  },
});
export const { addCatItem, addStatus, addCat } = CatSlice.actions;
export default CatSlice.reducer;

export function ItemFromCat(CatName) {
  return async function getItemFromCat(dispatch, getState) {
    dispatch(addStatus("WAIT"));
    try {
      let temp = await fetch("http://localhost:5000/" + CatName);
      let datass = await temp.json();
      console.log(datass);
      dispatch(addStatus("LOAD"));
      dispatch(addCatItem(datass));

      // dispatch(setStatus(STATUS.IDIL));
      console.log("call itemfromcat function" + CatName);
    } catch (err) {
      console.log(err);
      // dispatch(setStatus(STATUS.ERROR));
    }
  };
}
