import api from './api';

export const createVideoRequest = (payload) => api.post('/video', payload);
export const fetchMyVideosRequest = () => api.get('/video/my');
export const fetchAllVideosRequest = () => api.get('/video');
export const fetchVideoRequest = (id) => api.get(`/video/${id}`);
export const downloadVideoRequest = (id) => api.get(`/video/${id}/download`);

export const downloadVideo = async (videoId, videoName) => {
  try {
    const response = await downloadVideoRequest(videoId);
    if (response.data.downloadUrl) {
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = response.data.downloadUrl;
      link.download = videoName || `video-${videoId}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true };
    }
  } catch (error) {
    return { success: false, error: error.response?.data?.message || 'Download failed' };
  }
};
