import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../types/type";


interface initState {
  productList: IProduct[];
}

const initialState: initState = {
  productList: [],
};

export const getAllProduct = createAsyncThunk("productList", async () => {
  const res = await axios.get("http://localhost:4000/products"); 
  return res.data;
});

const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.productList = action.payload;
    });
  },
});

const productReducer = productSlice.reducer;
const {} = productSlice.actions;
export default productReducer;
