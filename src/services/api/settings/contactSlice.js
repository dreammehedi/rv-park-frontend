import { apiSlice } from "../apiSlice";

const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getContact: build.query({
      query: () => ({
        url: `contact-information`,
        method: "GET",
      }),
      providesTags: ["CONTACT"],
    }),

    createContact: build.mutation({
      query: (data) => ({
        url: `contact-user`,
        method: "POST",
        body: data,
      }),
    }),

    createSubscription: build.mutation({
      query: (data) => ({
        url: `subscribe`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetContactQuery,
  useCreateContactMutation,
  useCreateSubscriptionMutation,
} = contactApiSlice;
