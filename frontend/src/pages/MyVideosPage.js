import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyVideos } from '../slices/videoSlice';
import { downloadVideo } from '../services/videoService';

export default function MyVideosPage() {
  const dispatch = useDispatch();
  const { videos, isLoading, error } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(fetchMyVideos());
  }, [dispatch]);

  const handleDownload = async (videoId, videoName) => {
    const result = await downloadVideo(videoId, videoName);
    if (!result.success) {
      alert('Download failed: ' + result.error);
    }
  };

  return (
    <section className="page-container">
      <div className="page-header">
        <div>
          <p className="section-title">My Videos</p>
          <h1 className="page-title">Your created videos</h1>
          <p className="page-subtitle">Review your AI video history, watch previews, and check the creation status.</p>
        </div>
      </div>

      {isLoading && <p className="page-subtitle">Loading your videos...</p>}
      {error && <p className="page-subtitle" style={{ color: '#FF8FA4' }}>{error}</p>}

      {!isLoading && videos.length === 0 && (
        <div className="card">
          <p className="page-subtitle">No videos found yet. Create your first AI video on the Create page.</p>
        </div>
      )}

      <div className="videos-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {videos.map((video) => (
          <article key={video._id} className="video-card">
            <div className="video-preview">
              {video.image ? <img src={video.image} alt={video.story} /> : <div style={{ minHeight: '220px' }} />}
            </div>
            <div className="video-content">
              <h3>{video.story || 'Untitled video'}</h3>
              <p>{video.story?.slice(0, 140) || 'No description available.'}</p>
              <div className="video-meta">
                <span className="badge">Status: {video.status}</span>
                <span className="badge">{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                {video.videoUrl && (
                  <button
                    onClick={() => handleDownload(video._id, video.story)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 1rem',
                      backgroundColor: '#6366f1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
                  >
                    ⬇ Download
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
