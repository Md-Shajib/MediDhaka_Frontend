import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Doctor'],
  endpoints: (builder) => ({
    // Get all doctors
  getDoctors: builder.query({
    query: () => 'doctors',
    providesTags: ['Doctor'],
  }),

    // Search doctors
    searchDoctors: builder.query({
      query: (term: string) => `doctors/search?query=${term}`,
    }),

    // Add a new doctor
    addDoctor: builder.mutation({
      query: (doctor) => ({
        url: 'doctors',
        method: 'POST',
        body: doctor,
      }),
      invalidatesTags: ['Doctor'],
    }),

    // Update doctor
    updateDoctor: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `doctors/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Doctor'],
    }),

    // Delete doctor
    deleteDoctor: builder.mutation({
      query: (id: string) => ({
        url: `doctors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Doctor'],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useSearchDoctorsQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;
