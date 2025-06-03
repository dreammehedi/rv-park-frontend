import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  role: null,
  profile: {
    name: null,
    email: null,
    phone: null,
    image: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeAuthData: (state, action) => {
      const { token, user, role, profile } = action.payload;
      state.token = token;
      state.user = user;
      state.role = role;

      // Store profile data if available
      if (profile) {
        state.profile.name = profile.name || null;
        state.profile.email = profile.email || null;
        state.profile.phone = profile.phone || null;
        state.profile.image = profile.image || null;
      }
    },
    // Action to handle logout
    storeLogout: (state) => {
      // Reset all auth state
      state.token = null;
      state.user = null;
      state.role = null;
      state.profile = {
        name: null,
        email: null,
        phone: null,
        image: null,
      };
    },
  },
});

// Export actions and reducer
export const { storeAuthData, storeLogout } = authSlice.actions;
export default authSlice.reducer;
