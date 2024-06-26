import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export interface ShorteningState {
  result_url: string;
  error: string | null;
}

export const fetchShortening = createAsyncThunk(
  'shortening/fetchShortening',
  async (url: string) => {
    try {
      const response = await fetch('/api/shortenUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { result_url: '', error: error };
    }
  }
);

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
      state.result_url = action.payload.result_url;
      state.error = action.payload.error;
    });
  },
});

export const { resetShortening } = shorteningSlice.actions;

export const selectShortening = (state: RootState) => state.shortening;
export const selectResultUrl = (state: RootState) => state.shortening.result_url;
export const selectError = (state: RootState) => state.shortening.error;

export default shorteningSlice.reducer;
