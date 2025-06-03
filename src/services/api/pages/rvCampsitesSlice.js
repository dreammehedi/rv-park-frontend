import { apiSlice } from "../apiSlice";

const rvCampsitesSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRvCampsites: build.query({
      query: () => ({
        url: `get-rv-campsites`,
        method: "GET",
      }),
      providesTags: ["RvCampsites"],
    }),

    viewRvCampsite: build.query({
      query: ({ id }) => ({
        url: `view-rv-campsites/${id}`,
        method: "GET",
      }),
      providesTags: ["RvCampsites"],
    }),
  }),
});

export const { useGetRvCampsitesQuery, useViewRvCampsiteQuery } =
  rvCampsitesSlice;
