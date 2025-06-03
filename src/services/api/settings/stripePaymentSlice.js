// src/services/api/settings/stripePaymentSlice.js
import { apiSlice } from "../apiSlice";

export const stripePaymentSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStripeConfig: build.query({
      query: () => ({
        url: `stripe-config`,
        method: "GET",
      }),
      providesTags: ["STRIPECONFIG"],
    }),
    createPaymentIntent: build.mutation({
      query: (paymentData) => ({
        url: `create-payment-intent`,
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["STRIPECONFIG"],
    }),
    bookingPaymentIntent: build.mutation({
      query: (bookingData) => ({
        url: `create-booking`,
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["STRIPECONFIG"],
    }),
  }),
});

export const {
  useGetStripeConfigQuery,
  useCreatePaymentIntentMutation,
  useBookingPaymentIntentMutation,
} = stripePaymentSlice;
