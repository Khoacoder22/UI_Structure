import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as authService from './services/authService'

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials)
    } catch (error) {
      return rejectWithValue(
        error.message || 'Đăng nhập thất bại.'
      )
    }
  }
)

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
    },

    updateCurrentUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.status = 'succeeded'
        state.error = null
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload || action.error.message
      })
  },
})

export const { logout, updateCurrentUser } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.user

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated

export const selectAuthStatus = (state) => state.auth.status

export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer