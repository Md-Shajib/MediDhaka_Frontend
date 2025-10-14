import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DoctorApi = createApi({
  reducerPath: "DoctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Doctors"],
  endpoints: (builder) => ({
    // Get all doctors
    getDoctors: builder.query<any, void>({
      query: () => "/doctors",
      transformResponse: (response: any) => response?.data || [],
      providesTags: ["Doctors"],
    }),

    // Create doctor
    createDoctor: builder.mutation<any, any>({
      query: (data) => ({
        url: "/doctors",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Doctors"],
    }),

    // Update doctor
    updateDoctor: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/doctors/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Doctors"],
    }),

    // Delete doctor
    deleteDoctor: builder.mutation<any, string>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctors"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = DoctorApi;
