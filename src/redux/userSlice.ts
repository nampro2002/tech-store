import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "./../types/type";

interface initState {
  users: IUser[];
  userLogged: IUser;
}

const initialState: initState = {
  users: [],
  userLogged: {
    id: "",
    username: "",
    password: "",
  },
};

export const getAllUser = createAsyncThunk("user/getAllUser", async () => {
  const res = await axios.get("http://localhost:4000/users");
  console.log(res.data);
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AcceptLogin(state, action) {
      state.userLogged = action.payload;
      console.log("logged",state.userLogged);      
    },
    Logout(state) {
      state.userLogged = {
        id: "",
        username: "",
        password: "",
      };
      console.log("logged",state.userLogged);      
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

const userReducer = userSlice.reducer;
export  const {AcceptLogin, Logout} = userSlice.actions;
export default userReducer;
