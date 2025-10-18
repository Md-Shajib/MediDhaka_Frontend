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
      transformResponse: (response: any) => response || [],
      providesTags: ["Hospitals"],
    }),

    // Get hospital details by ID
    getHospitalsById: builder.query<any, number>({
      query: (id) => `/hospitals/${id}`,
      transformResponse: (response: any) => response || null,
      providesTags: ["Hospitals"],
    }),

    // Add new hospital
    createHospital: builder.mutation<any, any>({
      query: (newHospital) => ({
        url: "/hospitals",
        method: "POST",
        body: newHospital,
      }),
      invalidatesTags: ["Hospitals"],
    }),
    
    // Update hospital
    updateHospital: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/hospitals/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Hospitals"],
    }),

    // Delete hospital
    deleteHospital: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/hospitals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hospitals"],
    }),
  }),
});

export const {
  useGetHospitalsQuery,
  useGetHospitalsByIdQuery,
  useCreateHospitalMutation,
  useUpdateHospitalMutation,
  useDeleteHospitalMutation,
} = HospitalApi;
