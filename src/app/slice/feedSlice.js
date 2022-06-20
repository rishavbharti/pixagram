import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

import {
  FEED_CACHE_NAME,
  CACHED_TIME_HEADER,
  CACHE_DURATION,
} from '../../constants';
import { deleteCache } from '../../utils';
import { BASE_URL, config } from '../../services';

const feedAdapter = createEntityAdapter({
  selectId: (post) => post.id,
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(getRandomPhotos(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const getRandomPhotos = createAsyncThunk(
  'feed/getRandomPhotos',
  async ({ initialLoad, count }, { rejectWithValue }) => {
    try {
      // Check if 'cache' is supported
      if ('caches' in window) {
        const cacheStorage = await caches.open(FEED_CACHE_NAME);
        let cachedResponse = await cacheStorage.match('/photos/random');

        // If the page is loaded for the first time and cached response is present, call the delete cache function
        if (initialLoad && cachedResponse) {
          const deleted = await deleteCache(
            cacheStorage,
            cachedResponse,
            CACHE_DURATION,
            '/photos/random'
          );

          if (deleted) cachedResponse = null;
        }

        // If loaded for the first time or if no cache exists
        if (!initialLoad || !cachedResponse || !cachedResponse.ok) {
          const response = await axios.get(
            `${BASE_URL}/photos/random?count=${count}`,
            config
          );

          // Construct new headers based on the response's header to add 'cached-time'
          const newHeaders = new Headers(response.headers);
          newHeaders.set(CACHED_TIME_HEADER, Date.now());

          let data;

          // If cachedResponse exists, combine it with the new response
          if (cachedResponse) {
            const cachedJSONResponse = await cachedResponse.json();

            data = new Response(
              JSON.stringify([...response.data, ...cachedJSONResponse]),
              {
                headers: newHeaders,
              }
            );
          } else {
            data = new Response(JSON.stringify(response.data), {
              headers: newHeaders,
            });
          }

          // Putting fetched or combined data into cache
          cacheStorage.put('/photos/random', data);

          return response.data;
        }

        // If initialLoad, return the cached response
        return cachedResponse.json();
      }

      const response = await axios.get(
        `${BASE_URL}/photos/random?count=${count}`,
        config
      );

      return response.data;
    } catch (error) {
      console.error(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(...error.response.data.errors);
    }
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState: feedAdapter.getInitialState({
    status: {
      loading: false,
      error: false,
    },
  }),
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getRandomPhotos.pending, (state) => {
        state.status.loading = true;
      })
      .addCase(getRandomPhotos.fulfilled, (state, action) => {
        state.status.loading = false;
        state.status.error = false;

        feedAdapter.upsertMany(state, action.payload);
      })
      .addCase(getRandomPhotos.rejected, (state, action) => {
        state.status.loading = false;
        state.status.error = true;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const {
  selectAll: getAllPostsInFeed,
  selectById: getPostById,
  selectEntities: getPostEntities,
  selectIds: getPostIds,
  selectTotal: getTotalPosts,
} = feedAdapter.getSelectors((state) => state.feed);

export default feedSlice.reducer;
