import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../http-common';

export const loadCryptos = createAsyncThunk(
  'allCryptos/getAllCryptos',
  async (arg, thunkAPI) => {
    const json = await http.get(`/`);
    return json.data.data;
  }
);

const sliceOptions = {
  name: 'allCryptos',
  initialState: {
    cryptos: [],
    loading: true,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [loadCryptos.pending]: (state, action) => {
      state.cryptos = [];
      state.loading = true;
      state.error = false;
    },
    [loadCryptos.fulfilled]: (state, action) => {
      state.cryptos = action.payload;
      state.loading = false;
      state.error = null;
    },
    [loadCryptos.rejected]: (state, action) => {
      state.cryptos = [];
      state.loading = false;
      state.error = true;
    },
  },
};

export const allCryptosSlice = createSlice(sliceOptions);
export const selectAllCryptos = (state) => state.allCryptos;
export default allCryptosSlice.reducer;
