import { apiSlice } from "../apiSlice";

const whyChooseUsSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getWhyChooseUs: build.query({
      query: () => ({
        url: `get-why-choose-us`,
        method: "GET",
      }),
      providesTags: ["WhyChooseUs"],
    }),
  }),
});

export const { useGetWhyChooseUsQuery } = whyChooseUsSlice;
