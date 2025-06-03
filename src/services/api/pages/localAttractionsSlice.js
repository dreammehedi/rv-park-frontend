import { apiSlice } from "../apiSlice";

const localAttractionsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getLocalAttractions: build.query({
      query: () => ({
        url: `get-local-attractions`,
        method: "GET",
        headers: {
          "x-source": "frontend",
        },
      }),
      providesTags: ["LocalAttraction"],
    }),

    viewLocalAttraction: build.query({
      query: ({ id }) => ({
        url: `view-local-attraction/${id}`,
        method: "GET",
      }),
      providesTags: ["LocalAttraction"],
    }),
  }),
});

export const { useGetLocalAttractionsQuery, useViewLocalAttractionQuery } =
  localAttractionsSlice;
