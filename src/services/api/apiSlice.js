import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.astepabovervpark.com/api/",
  // baseUrl: "https://rv-park-backend-api.vercel.app/api/",
  // baseUrl: "http://localhost:5000/api/",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 60,
  tagTypes: [
    "LOGO_FAVICON",
    "SiteOverview",
    "SITECONFIGURATION",
    "STRIPECONFIG",
    "CONTACT",
    "SOCIALMEDIA",
    "EMAILCONFIG",
    "ABOUT_US",
    "OurJourney",
    "LocalWonder",
    "LocalAttraction",
    "RvCampsites",
    "RvExperience",
    "ContactUserMail",
    "SubscribeUser",
    "WhyChooseUs",
    "BannerSlider",
  ],
  endpoints: () => ({}),
});
