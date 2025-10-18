import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HospitalApi = createApi({
  reducerPath: "hospitalApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL 
  }),
  tagTypes: ["Hospitals"],
  endpoints: (builder) => ({
    // Get all hospitals with search and pagination
    getHospitals: builder.query<any, { page?: number; limit?: number; search?: string }>({
      query: ({ page, limit, search }) => ({
        url: "/hospitals",
        params: {
          page: page,
          limit: limit,
          search: search,
        },
      }),
      transformResponse: (response: any) => response?.data || [],
      providesTags: ["Hospitals"],
    }),

    // Get hospital details by ID
    getHospitalsById: builder.query<any, number>({
      query: (id) => `/hospitals/${id}`,
      transformResponse: (response: any) => response || null,
      providesTags: ["Hospitals"],
    }),

    addHospital: builder.mutation({
      query: (newHospital) => ({
        url: "hospitals",
        method: "POST",
        body: newHospital,
      }),
    }),
    // update, delete...
  }),
});

export const {
  useGetHospitalsQuery,
  useGetHospitalsByIdQuery,
  useAddHospitalMutation,
} = HospitalApi;
