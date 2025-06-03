import { apiSlice } from "../apiSlice";

const rvSpotsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRvSpots: build.query({
      query: () => ({
        url: `get-spots-rv-park`,
        method: "GET",
      }),
      providesTags: ["RvSpots"],
    }),
  }),
});

export const { useGetRvSpotsQuery } = rvSpotsSlice;