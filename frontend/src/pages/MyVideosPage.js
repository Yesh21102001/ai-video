import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyVideos } from '../slices/videoSlice';
import { downloadVideo } from '../services/videoService';
import './MyVideosPage.css';

/* ── Icons ──────────────────────────── */
const IconVideo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* ── Helpers ─────────────────────────── */
function statusClass(status = '') {
  const s = status.toLowerCase();
  if (s === 'completed') return 'mv-status-badge completed';
  if (s === 'processing' || s === 'pending') return 'mv-status-badge processing';
  if (s === 'failed') return 'mv-status-badge failed';
  return 'mv-status-badge draft';
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ── Skeleton card ───────────────────── */
function SkeletonCard() {
  return (
    <div className="mv-skeleton">
      <div className="mv-skel-thumb" />
      <div className="mv-skel-body">
        <div className="mv-skel-line" style={{ height: 14, width: '75%' }} />
        <div className="mv-skel-line" style={{ height: 11, width: '55%' }} />
        <div className="mv-skel-line" style={{ height: 32, width: '100%', marginTop: 4 }} />
      </div>
    </div>
  );
}

/* ── Video Card ──────────────────────── */
function VideoCard({ video, onDownload }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await onDownload(video._id, video.story);
    setDownloading(false);
  };

  return (
    <article className="mv-card">
      {/* Thumbnail */}
      <div className="mv-thumb">
        {video.image
          ? <img src={video.image} alt={video.story || 'Video thumbnail'} loading="lazy" />
          : (
            <div className="mv-thumb-placeholder">
              <IconVideo />
            </div>
          )
        }

        {/* Status badge */}
        <span className={statusClass(video.status)}>
          <span className="mv-status-dot" />
          {video.status || 'draft'}
        </span>

        {/* Play overlay — only if video exists */}
        {video.videoUrl && (
          <div className="mv-play-overlay">
            <button
              className="mv-play-btn"
              aria-label="Watch video"
              onClick={() => window.open(video.videoUrl, '_blank')}
            >
              <IconPlay />
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="mv-card-body">
        <h3 className="mv-card-title">{video.story || 'Untitled video'}</h3>

        {video.story && video.story.length > 60 && (
          <p className="mv-card-desc">{video.story.slice(0, 140)}</p>
        )}

        <div className="mv-card-meta">
          <span className="mv-date">
            <IconClock />
            {formatDate(video.createdAt)}
          </span>
        </div>

        {/* Actions */}
        <div className="mv-card-actions">
          {video.videoUrl ? (
            <>
              <button
                className={`mv-dl-btn${downloading ? ' loading' : ''}`}
                onClick={handleDownload}
                disabled={downloading}
              >
                <IconDownload />
                {downloading ? 'Downloading…' : 'Download'}
              </button>
              <button
                className="mv-watch-btn"
                onClick={() => window.open(video.videoUrl, '_blank')}
              >
                <IconEye />
                Watch
              </button>
            </>
          ) : (
            <button className="mv-watch-btn" style={{ flex: 1, justifyContent: 'center', opacity: 0.5 }} disabled>
              {video.status === 'processing' || video.status === 'pending'
                ? 'Processing…'
                : 'Not available'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* ── Page ────────────────────────────── */
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
    <div className="mv-page">
      <div className="mv-inner">

        {/* Header */}
        <div className="mv-header">
          <div>
            <p className="mv-eyebrow">Library</p>
            <h1 className="mv-title">Your <em>videos</em></h1>
            <p className="mv-subtitle">Watch previews, check status, and download your AI creations.</p>
          </div>
          {!isLoading && videos.length > 0 && (
            <div className="mv-count-pill">
              <IconVideo />
              <strong>{videos.length}</strong> video{videos.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mv-error">
            <IconAlert />
            {error}
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <div className="mv-grid">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && videos.length === 0 && (
          <div className="mv-empty">
            <div className="mv-empty-icon"><IconVideo /></div>
            <h2 className="mv-empty-title">No videos yet</h2>
            <p className="mv-empty-sub">
              You haven't created any AI videos yet. Head to the Create page to get started.
            </p>
            <button className="mv-empty-cta">
              <IconPlus />
              Create your first video
            </button>
          </div>
        )}

        {/* Grid */}
        {!isLoading && videos.length > 0 && (
          <div className="mv-grid">
            {videos.map((video, i) => (
              <VideoCard
                key={video._id}
                video={video}
                onDownload={handleDownload}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}