import { apiSlice } from "../apiSlice";

const ourJourneySlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getOurJourney: build.query({
      query: () => ({
        url: `our-journey`,
        method: "GET",
      }),
      providesTags: ["OurJourney"],
    }),

    getOurJourneyItems: build.query({
      query: () => ({
        url: `our-journey-item`,
        method: "GET",
      }),
      providesTags: ["OurJourneyItems"],
    }),
  }),
});

export const { useGetOurJourneyQuery, useGetOurJourneyItemsQuery } =
  ourJourneySlice;
