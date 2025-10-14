// src/features/hospital/hospitalApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hospitalApi = createApi({
  reducerPath: 'hospitalApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getHospitals: builder.query({
      query: () => 'hospitals',
    }),
    searchHospitals: builder.query({
      query: (term) => `hospitals/search?query=${term}`,
    }),
    addHospital: builder.mutation({
      query: (newHospital) => ({
        url: 'hospitals',
        method: 'POST',
        body: newHospital,
      }),
    }),
    // update, delete...
  }),
});

export const {
  useGetHospitalsQuery,
  useSearchHospitalsQuery,
  useAddHospitalMutation,
} = hospitalApi;
