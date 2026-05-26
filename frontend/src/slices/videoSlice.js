import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createVideoRequest, fetchMyVideosRequest } from '../services/videoService';

export const fetchMyVideos = createAsyncThunk('video/fetchMyVideos', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchMyVideosRequest();
    return response.data.videos;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to load videos');
  }
});

export const createVideo = createAsyncThunk('video/createVideo', async (videoData, { rejectWithValue }) => {
  try {
    const response = await createVideoRequest(videoData);
    return response.data.video;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create video');
  }
});

const initialState = {
  videos: [],
  isLoading: false,
  error: null,
  createSuccess: false
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    resetCreateSuccess: (state) => { state.createSuccess = false; state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload;
      })
      .addCase(fetchMyVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos.unshift(action.payload);
        state.createSuccess = true;
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { resetCreateSuccess } = videoSlice.actions;
export default videoSlice.reducer;
