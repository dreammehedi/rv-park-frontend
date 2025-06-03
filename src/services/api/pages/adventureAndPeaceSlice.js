import { apiSlice } from "../apiSlice";

const adventureAndPeaceSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAdventureAndPeace: build.query({
      query: () => ({
        url: `get-adventure-and-peace`,
        method: "GET",
      }),
      providesTags: ["AdventureAndPeace"],
    }),

    viewAdventureAndPeace: build.query({
      query: ({ id }) => ({
        url: `view-adventure-and-peace/${id}`,
        method: "GET",
      }),
      providesTags: ["AdventureAndPeace"],
    }),
  }),
});

export const { useGetAdventureAndPeaceQuery, useViewAdventureAndPeaceQuery } =
  adventureAndPeaceSlice;
