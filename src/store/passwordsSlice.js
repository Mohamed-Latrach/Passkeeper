import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { alertError, alertSuccess, extractErrorMessage } from "../utilities/feedback";


export const fetchPasswords = createAsyncThunk('passwords/fetchPasswords', async () => {
  const token = localStorage.getItem("token")
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/passwords`, {headers: {Authorization: token}})
  return res.data
})

export const fetchPasswordById = createAsyncThunk('passwords/fetchPasswordById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token")
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/passwords/${id}`, {headers: {Authorization: token}})
    return res.data
  } catch (error) {
    const errorMessage = extractErrorMessage(error)
    return rejectWithValue(error)
  }
})

export const requestCreatingPassword = createAsyncThunk(
  'passwords/requestCreatingPassword',
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/passwords`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
          }
        }
      )
      navigate('/')
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const requestUpdatingPassword = createAsyncThunk(
  'passwords/requestUpdatingPassword',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/passwords/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
          }
        }
      )
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const requestDeletingPassword = createAsyncThunk(
  'passwords/requestDeletingPassword',
  async ({ id, closeModal }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/passwords/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      closeModal()
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const passwordsSlice = createSlice({
  name: 'passwords',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    selected: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPasswords.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPasswords.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchPasswords.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      .addCase(requestCreatingPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestCreatingPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.list.push(action.payload.password)
        alertSuccess(action.payload.message)
      })
      .addCase(requestCreatingPassword.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })

      .addCase(fetchPasswordById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPasswordById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selected = action.payload
      })
      .addCase(fetchPasswordById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      .addCase(requestUpdatingPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestUpdatingPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = state.list.map(element => element._id === action.payload.password._id ? action.payload.password : element)
        alertSuccess(action.payload.message)
      })
      .addCase(requestUpdatingPassword.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })

      .addCase(requestDeletingPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestDeletingPassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = state.list.filter(element => element._id !== action.payload.password._id)
        alertSuccess(action.payload.message)
      })
      .addCase(requestDeletingPassword.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })
  }
})


export default passwordsSlice.reducer