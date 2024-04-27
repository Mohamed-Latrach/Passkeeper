import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { alertError, alertSuccess, extractErrorMessage } from "../utilities/feedback";


export const requestLogin = createAsyncThunk('user/requestLogin', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password })
    return res.data
  } catch (error) {
    const errorMessage = extractErrorMessage(error)
    return rejectWithValue(errorMessage)
  }
})

export const requestRegister = createAsyncThunk(
  'user/requestRegister',
  async ({ firstName, lastName, email, password, navigate }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { firstName, lastName, email, password })
      navigate('/login')
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  }
)

export const requestMe = createAsyncThunk('user/requestMe', async (token, { rejectWithValue }) => {
  console.log({token});
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { headers: { Authorization: token } })
    return res.data
  } catch (error) {
    const errorMessage = extractErrorMessage(error)
    console.log(errorMessage);
    return rejectWithValue(errorMessage)
  }
})

export const requestUpdatingProfile = createAsyncThunk(
  'user/requestUpdatingProfile',
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
          }
        }
      )
      navigate(`/profile`)
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    token: null,
    details: null,
    isLoading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.isAuthenticated = false
      state.token = null
      state.details = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLogin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true

        const token = action.payload.token
        const userDetails = action.payload.user

        state.token = token
        state.details = userDetails

        localStorage.setItem('token', token)

        alertSuccess(action.payload.message)
      })
      .addCase(requestLogin.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })

      .addCase(requestRegister.pending, (state) => {
        state.isLoading = true
      })
      .addCase(requestRegister.fulfilled, (state, action) => {
        state.isLoading = false
        alertSuccess(action.payload.message)
      })
      .addCase(requestRegister.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })

      .addCase(requestMe.pending, (state) => {
        // you can put some logic here
      })
      .addCase(requestMe.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.token = localStorage.getItem('token')
        state.details = action.payload
      })
      .addCase(requestMe.rejected, (state, action) => {
        localStorage.removeItem('token')
        
        const errorMessage = action.payload
        alertError(errorMessage)
      })

      .addCase(requestUpdatingProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestUpdatingProfile.fulfilled, (state, action) => {

        const userDetails = action.payload.user
        state.details = userDetails

        alertSuccess(action.payload.message)

      })
      .addCase(requestUpdatingProfile.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })
  }
})


export const { logout } = userSlice.actions

export default userSlice.reducer