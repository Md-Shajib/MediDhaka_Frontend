import { configureStore } from '@reduxjs/toolkit';
import { hospitalApi } from '@/features/hospital/hospitalApi';
import { doctorApi } from '@/features/doctor/doctorApi';

export const store = configureStore({
  reducer: {
    [hospitalApi.reducerPath]: hospitalApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hospitalApi.middleware, doctorApi.middleware),
});
