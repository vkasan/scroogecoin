import { createSlice } from '@reduxjs/toolkit';
import { api } from './api';
import { dropToken } from './localstorage';

const initialState = {
  isAuth: false,
};


export const userSlicer = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    changeAuthStatus: (state, action) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      dropToken();
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.checkAuth.matchFulfilled, (state) => {
        state.isAuth = true;
      })
      .addMatcher(api.endpoints.checkAuth.matchRejected, (state) => {
        dropToken();
        state.isAuth = false;
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state) => {
        state.isAuth = true;
      })
      .addMatcher(api.endpoints.login.matchRejected, (state) => {
        dropToken();
        state.isAuth = false;
      })
  }
});


export const {
  changeAuthStatus,
  logout,
} = userSlicer.actions;

export const selectAuthStatus = (state) => state.USER.isAuth;
