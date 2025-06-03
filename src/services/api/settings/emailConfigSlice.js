import { apiSlice } from "../apiSlice";

const emailConfigSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getEmailConfig: build.query({
      query: () => ({
        url: `email-configuration`,
        method: "GET",
      }),
      providesTags: ["EMAILCONFIG"],
    }),
  }),
});

export const { useGetEmailConfigQuery } = emailConfigSlice;
