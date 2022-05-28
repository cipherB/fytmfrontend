import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: sessionStorage.getItem('user'),
  refresh_token: sessionStorage.getItem('refresh_token'),
  access_token: sessionStorage.getItem('access_token'),
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (state, payload) => {
      state.refresh_token = payload.payload.refresh_token
      state.access_token = payload.payload.access_token
      console.log("payload here", payload.payload)
    },
    login_user: (state, payload) => {
      state.user = payload.payload
    },
    logout: (state) => {
      state.refresh_token = null
      state.access_token = null
      state.user = null
      sessionStorage.clear()
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, login_user, logout } = userSlice.actions

export default userSlice.reducer
