import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export interface ShorteningState {
  result_url: string;
  error: string | null;
}

export const fetchShortening = createAsyncThunk(
  'shortening/fetchShortening',
  async (url: string) => {
    try {
      const response = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ url }).toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data.result_url;
    } catch (error) {
      throw new Error('Failed to fetch');
    }
  }
);

export interface ShorteningState {
  result_url: string;
  error: string | null;
}

const initialState: ShorteningState = {
  result_url: '',
  error: null,
};

export const shorteningSlice = createSlice({
  name: 'shortening',
  initialState,
  reducers: {
    resetShortening: (state) => {
      state.result_url = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShortening.fulfilled, (state, action) => {
      state.result_url = action.payload;
      state.error = null;
    });
    builder.addCase(fetchShortening.rejected, (state, action) => {
      state.result_url = '';
      state.error = action.error.message || "Unknown error occurred";
    });
  },
});

export const { resetShortening } = shorteningSlice.actions;

export const selectShortening = (state: RootState) => state.shortening;
export const selectResultUrl = (state: RootState) => state.shortening.result_url;
export const selectError = (state: RootState) => state.shortening.error;

export default shorteningSlice.reducer;