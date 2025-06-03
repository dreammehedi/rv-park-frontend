import { apiSlice } from "../apiSlice";

const logoApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getLogoAndFavicon: build.query({
      query: () => ({
        url: `logo-and-favicon`,
        method: "GET",
      }),
      providesTags: ["LOGO_FAVICON"],
      // transformResponse: (response) => response?.payload[0],
    }),
  }),
});

export const { useGetLogoAndFaviconQuery } = logoApiSlice;
