import { apiSlice } from "../apiSlice";

const localWonderSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getLocalWonders: build.query({
      query: () => ({
        url: `get-local-wonders`,
        method: "GET",
      }),
      providesTags: ["LocalWonder"],
    }),
  }),
});

export const { useGetLocalWondersQuery } = localWonderSlice;
