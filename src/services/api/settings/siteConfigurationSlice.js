import { apiSlice } from "../apiSlice";

const siteConfigurationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRecentBookings: build.query({
      query: ({ page, limit, search }) => ({
        url: `recent-bookings?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
      // transformResponse: (response) => response?.payload,
    }),

    getAllBookings: build.query({
      query: () => ({
        url: `get-bookings`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
      transformResponse: (response) => response?.payload,
    }),

    getBookings: build.query({
      query: ({ page, limit, search }) => ({
        url: `bookings?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
      // transformResponse: (response) => response?.payload,
    }),

    getSubscribeUser: build.query({
      query: ({ page, limit, search }) => ({
        url: `subscribe?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["SubscribeUser"],
      // transformResponse: (response) => response?.payload,
    }),

    getContactUserMail: build.query({
      query: ({ page, limit, search }) => ({
        url: `contact-user?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["ContactUserMail"],
      // transformResponse: (response) => response?.payload,
    }),

    getSiteOverview: build.query({
      query: () => ({
        url: `site-overview`,
        method: "GET",
      }),
      providesTags: ["SiteOverview"],
      transformResponse: (response) => response?.payload,
    }),

    getSiteConfiguration: build.query({
      query: () => ({
        url: `site-config`,
        method: "GET",
      }),
      providesTags: ["SITECONFIGURATION"],
      // transformResponse: (response) => response?.payload[0],
    }),

    getSeoConfiguration: build.query({
      query: () => ({
        url: `seo-config`,
        method: "GET",
      }),
      providesTags: ["SITECONFIGURATION"],
      // transformResponse: (response) => response?.payload[0],
    }),

    getGtmGaConfiguration: build.query({
      query: () => ({
        url: `gtm-ga-config`,
        method: "GET",
      }),
      providesTags: ["SITECONFIGURATION"],
      // transformResponse: (response) => response?.payload[0],
    }),
  }),
});

export const {
  useGetSiteConfigurationQuery,
  useGetSiteOverviewQuery,
  useGetContactUserMailQuery,
  useGetSubscribeUserQuery,
  useGetBookingsQuery,
  useGetRecentBookingsQuery,
  useGetAllBookingsQuery,
  useGetSeoConfigurationQuery,
  useGetGtmGaConfigurationQuery,
} = siteConfigurationApiSlice;
