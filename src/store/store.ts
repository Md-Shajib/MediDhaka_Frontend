import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { DoctorApi } from "./service/doctor.service";
import { HospitalApi } from "./service/hospita.service";

export const store = configureStore({
  reducer: {
    [DoctorApi.reducerPath]: DoctorApi.reducer,
    [HospitalApi.reducerPath]: HospitalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(DoctorApi.middleware)
      .concat(HospitalApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
