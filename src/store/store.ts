import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { DoctorApi } from "./service/doctor.service";
import { HospitalApi } from "./service/hospital.service";
import { SearchAPI } from "./service/search.service";

export const store = configureStore({
  reducer: {
    [DoctorApi.reducerPath]: DoctorApi.reducer,
    [HospitalApi.reducerPath]: HospitalApi.reducer,
    [SearchAPI.reducerPath]: SearchAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(DoctorApi.middleware)
      .concat(HospitalApi.middleware)
      .concat(SearchAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
