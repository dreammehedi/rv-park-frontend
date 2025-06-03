import { apiSlice } from "../apiSlice";

const bannerSliderSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBannerSlider: build.query({
      query: () => ({
        url: `get-hero-banner-slider`,
        method: "GET",
      }),
      providesTags: ["BannerSlider"],
    }),
  }),
});

export const { useGetBannerSliderQuery } = bannerSliderSlice;
