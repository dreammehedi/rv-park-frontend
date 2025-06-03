import { apiSlice } from "../apiSlice";

const aboutUsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAboutUs: build.query({
      query: () => ({
        url: `about-us`,
        method: "GET",
      }),
      providesTags: ["ABOUT_US"],
    }),
  }),
});

export const { useGetAboutUsQuery } = aboutUsSlice;
