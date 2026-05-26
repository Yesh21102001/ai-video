import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createVideo, resetCreateSuccess } from '../slices/videoSlice';

export default function CreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, createSuccess } = useSelector((state) => state.video);
  const [story, setStory] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (createSuccess) {
      dispatch(resetCreateSuccess());
      navigate('/my-videos');
    }
  }, [createSuccess, dispatch, navigate]);

  const handleFileChange = (event) => {
    const selected = event.target.files[0];
    if (!selected) {
      setFile(null);
      setPreview('');
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selected);
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!story || !file) {
      alert('Please add a photo and a story.');
      return;
    }

    const image = await toBase64(file);
    dispatch(createVideo({ story, image }));
  };

  return (
    <section className="page-container">
      <div className="page-header">
        <div>
          <p className="section-title">Create</p>
          <h1 className="page-title">Generate a new AI video</h1>
          <p className="page-subtitle">Upload a photo, describe the motion, and let the AI create your video instantly.</p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-group">
          <div className="form-group">
            <label className="field-label">Upload Image</label>
            <div className="upload-card">
              <input type="file" accept="image/*" onChange={handleFileChange} className="input-field" />
              <p>Supported formats: JPG / PNG / WebP / GIF</p>
            </div>
          </div>

          {preview && (
            <div className="upload-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <div className="form-group">
            <label className="field-label">Video Story</label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Describe what should happen in your video"
              className="textarea-field"
            />
          </div>

          {error && <div className="profile-card" style={{ borderColor: 'rgba(255, 70, 115, 0.25)', color: '#FFB3C6' }}>{error}</div>}

          <button type="submit" disabled={isLoading} className="btn btn-primary">
            {isLoading ? 'Creating...' : 'Generate Video'}
          </button>
        </form>
      </div>
    </section>
  );
}
