import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  userProfile: null,
  loading: true, // ✅ initially loading
  error: null
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false; // ✅ stop loading once user is set
    },
    clearUser: (state) => {
      state.user = null;
      state.userProfile = null;
      state.loading = false; // ✅ stop loading
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
      state.loading = false
    }
  }
});


export const {setUser, clearUser, setUserProfile} = userSlice.actions
export default userSlice.reducer