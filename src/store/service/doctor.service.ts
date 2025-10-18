import { HospitalDoctorRelation } from "@/types/doctor";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DoctorApi = createApi({
  reducerPath: "DoctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Doctors", "HospitalDoctor"],
  endpoints: (builder) => ({
    // Get all doctors
    getDoctors: builder.query<any, { page?: number; limit?: number; search?: string }>({
      query: ({ page, limit, search }) => ({
        url: "/doctors",
        params: {
          page: page,
          limit: limit,
          search: search,
        },
      }),
      transformResponse: (response: any) => response || [],
      providesTags: ["Doctors"],
    }),

    // Get doctor by ID
    getDoctorById: builder.query<any, number>({
      query: (id) => `/doctors/${id}`,
      transformResponse: (response: any) => response || null,
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
    updateDoctor: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/doctors/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctors"],
    }),

    // Delete doctor
    deleteDoctor: builder.mutation<any, number>({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctors"],
    }),

    // Create hospital-doctor relation
    createHospitalDoctorRelation: builder.mutation<void, HospitalDoctorRelation>({
      query: (body) => ({
        url: '/hospital-doctor',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'HospitalDoctor', id: 'LIST' },
        { type: 'Doctors', id: 'LIST' },
      ],
    }),

    // Get doctor's hospitals
    getDoctorHospitals: builder.query<any[], number>({
      query: (doctorId) => `/hospital-doctor/${doctorId}`,
      providesTags: (result, error, doctorId) => [
        { type: 'HospitalDoctor', id: doctorId },
      ],
    }),

        // Delete hospital-doctor relation
    deleteHospitalDoctorRelation: builder.mutation<void, { hospitalId: number; doctorId: number }>({
      query: ({ hospitalId, doctorId }) => ({
        url: `/hospital-doctor/${hospitalId}/${doctorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'HospitalDoctor', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
  useCreateHospitalDoctorRelationMutation,
  useGetDoctorHospitalsQuery,
  useDeleteHospitalDoctorRelationMutation,
} = DoctorApi;
