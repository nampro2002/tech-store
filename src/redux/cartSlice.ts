import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct, IProductCart } from "../types/type";

interface initState {
  cartList: IProductCart[];
}

const initialState: initState = {
  cartList: [],
};

export const getAllCart = createAsyncThunk(
  "cartList/getAllCart",
  async (userId: string) => {
    const res = await axios.get(`http://localhost:4000/cart?userId=${userId}`);
    // console.log("cart", res.data);
    // console.log("get");
    return res.data;
  }
);
export const CheckCart = createAsyncThunk(
  "cartList/CheckCart",
  async (
    { product, userId }: { product: IProduct; userId: string },
    thunkAPI
  ) => {
    const res = await axios.get("http://localhost:4000/cart");
    const cartList = res.data;
    const productCart: Omit<IProductCart, "id"> = {
      prodId: product.id,
      userId,
      price: product.price,
      name: product.name,
      quantity: 1,
    };
    const isAdded = cartList.some((prod: IProductCart) => {
      if (prod.prodId === product.id && prod.userId === userId) {
        thunkAPI.dispatch(
          updateToCart({
            id: prod.id,
            prodId: prod.prodId,
            userId,
            price: prod.price,
            name: product.name,
            quantity: prod.quantity + 1,
          })
        );
        return true;
      } else if (prod.prodId === product.id && prod.userId === userId) {
      }
      return false;
    });
    if (!isAdded) {
      thunkAPI.dispatch(addToCart(productCart));
    }
    console.log("check");
    console.log("isAdded", isAdded);
  }
);
export const updateToCart = createAsyncThunk(
  "cartList/updateToCart",
  async (productCart: IProductCart) => {
    const res = await axios.put<IProductCart>(
      `http://localhost:4000/cart/${productCart.id}`,
      productCart
    );
    console.log("update");
    return res.data;
  }
);
export const decreaseQuantity = createAsyncThunk(
  "cartList/decreaseQuantity",
  async (productCart: IProductCart) => {
    console.log("id of product", productCart.id);

    const res = await axios.put<IProductCart>(
      `http://localhost:4000/cart/${productCart.id}`,
      productCart
    );
    return res.data;
  }
);
export const increaseQuantity = createAsyncThunk(
  "cartList/increaseQuantity",
  async (productCart: IProductCart) => {
    console.log("id of product", productCart.id);
    const res = await axios.put<IProductCart>(
      `http://localhost:4000/cart/${productCart.id}`,
      productCart
    );
    return res.data;
  }
);
export const addToCart = createAsyncThunk(
  "cartList/addToCart",
  async (productCart: Omit<IProductCart, "id">) => {
    console.log("add");
    const res = await axios.post<IProductCart>(
      "http://localhost:4000/cart",
      productCart
    );
    return res.data;
  }
);
export const removeFromCart = createAsyncThunk(
  "cartList/removeFromCart",
  async (productCartId: string) => {
    await axios.delete(`http://localhost:4000/cart/${productCartId}`);
    // console.log("remove");
    return productCartId;
  }
);

const cartSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCart.fulfilled, (state, action) => {
        // console.log("get-fullfilled");
        state.cartList = action.payload;
      })
      .addCase(CheckCart.fulfilled, () => {
        // console.log("check-fullfilled");
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // console.log("add-fullfilled");
        state.cartList.push(action.payload);
      })
      .addCase(updateToCart.fulfilled, (state, action) => {
        // console.log("up-fullfilled");
        state.cartList.some((product) => {
          if (product.prodId === action.payload.prodId) {
            product.quantity += 1;
            return true;
          }
          return false;
        });
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        // console.log("decrease-fullfilled");
        state.cartList.some((product) => {
          if (product.prodId === action.payload.prodId) {
            product.quantity -= 1;
            return true;
          }
          return false;
        });
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        // console.log("increase-fullfilled");
        state.cartList.some((product) => {
          if (product.prodId === action.payload.prodId) {
            product.quantity += 1;
            return true;
          }
          return false;
        });
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // console.log("remv-fullfilled");
        state.cartList = state.cartList.filter(
          (prod) => prod.id !== action.payload
        );
        console.log("cartList", state.cartList);
      });
  },
});

const cartReducer = cartSlice.reducer;
const {} = cartSlice.actions;
export default cartReducer;
