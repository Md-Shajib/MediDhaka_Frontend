import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SearchAPI = createApi({
  reducerPath: "SearchAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["SearchResults"],
  endpoints: (builder) => ({
    getSearch: builder.query<any, { query: string }>({
      query: ({ query }) => ({
        url: "/search",
        params: { q: query },
      }),
      transformResponse: (response: any) => response || [],
      providesTags: ["SearchResults"],
    }),
  }),
});

export const { useGetSearchQuery } = SearchAPI;
