import { apiSlice } from "../apiSlice";
const socialMediaSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSocialMedia: build.query({
      query: () => ({
        url: `social-networks`,
        method: "GET",
      }),
      providesTags: ["SOCIALMEDIA"],
    }),
  }),
});

export const { useGetSocialMediaQuery } = socialMediaSlice;
