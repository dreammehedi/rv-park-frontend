import { apiSlice } from "../apiSlice";

const rvExperienceSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRvExperience: build.query({
      query: () => ({
        url: `get-rv-experiences`,
        method: "GET",
      }),
      providesTags: ["RvExperience"],
    }),
  }),
});

export const { useGetRvExperienceQuery } = rvExperienceSlice;
