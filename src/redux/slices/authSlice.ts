import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AppData from '../../common/appData';
import AppError from '../../common/appError';
import AppLoad from '../../common/appLoad';
import { LoginRequest, LoginResponse } from '../../data/apis/loginApi';
import { RootState } from '../store';

interface AuthState extends AppLoad, AppError, AppData<LoginResponse> {}

const initialState: AuthState = {
  isLoading: false,
  data: null,
  errorMessage: null,
  errorData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkLogin: (state: AuthState) => {
      state.isLoading = true;
    },
    checkLoginSuccess: (
      state: AuthState,
      action: PayloadAction<LoginResponse>,
    ) => {
      state.isLoading = false;
      state.data = {
        ...state.data,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    },
    checkLoginError: (state: AuthState, action: PayloadAction<AppError>) => {
      state.isLoading = false;
    },
    loginApi: (state: AuthState, action: PayloadAction<LoginRequest>) => {
      state.isLoading = true;
    },
    loginApiSuccess: (
      state: AuthState,
      action: PayloadAction<LoginResponse>,
    ) => {
      state.isLoading = false;
      state.data = {
        ...state.data,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    },
    loginApiError: (state: AuthState, action: PayloadAction<AppError>) => {
      state.isLoading = false;
      state.errorMessage =
        action.payload.errorData?.message ?? action.payload.errorMessage;
    },
    logout: () => initialState,
  },
});

export const loadingSelector = (state: RootState) => state.auth.isLoading;
export const tokenSelector = (state: RootState) => state.auth.data?.token;
export const refreshTokenSelector = (state: RootState) =>
  state.auth.data?.refreshToken;
export const errorSelector = (state: RootState) => state.auth.errorMessage;
export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;