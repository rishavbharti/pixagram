import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, config } from '../../services';

export const getUserProfile = createAsyncThunk(
  'profile/getUserProfile',
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axios.all([
        axios.get(`${BASE_URL}/users/${username}`, config),
        axios.get(`${BASE_URL}/users/${username}/photos?per_page=50`, config),
      ]);

      const [{ data: profile }, { data: photos }] = response;

      return { username, profile, photos };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(...error.response.data.errors);
    }
  }
);

export const userProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    /** 
    [username]: {
      profile: null,
      photos: [],
      status: {
        loading: false,
        error: false,
        errorMessage: null
      },
    },
    */
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state, action) => {
        const {
          meta: {
            arg: { username },
          },
        } = action;

        state[username] = {
          profile: null,
          photos: [],
          status: {
            loading: true,
            error: false,
            errorMessage: null,
          },
        };
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        const { username, profile, photos } = action.payload;

        state[username].profile = profile;
        state[username].photos = [...state[username].photos, ...photos];
        state[username].status.loading = false;
        state[username].status.error = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        const {
          meta: {
            arg: { username },
          },
        } = action;

        state[username].status.loading = false;
        state[username].status.error = true;
        state[username].status.errorMessage = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
