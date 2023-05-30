import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userInfo: {
    id: "",
    name: "",
    role: "",
  },
  userToken: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setToken: (state, action) => {
      state.userToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = {

        ...state.userInfo,
        ...action.payload
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsLoggedIn,
  setUserInfo,
  setToken
} = authSlice.actions;

export default authSlice.reducer;
