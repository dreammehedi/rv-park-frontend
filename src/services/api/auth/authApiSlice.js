import { apiSlice } from "../apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Admin Login
    adminLogin: build.mutation({
      query: (body) => ({
        url: `admin-login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export the hooks
export const { useAdminLoginMutation } = authApiSlice;
