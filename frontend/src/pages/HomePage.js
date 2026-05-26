import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import './HomePage.css';

export default function HomePage() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile({
          name: file.name,
          size: (file.size / 1024).toFixed(2),
          type: file.type
        });
      } else {
        alert('Please drop an image file (JPG, PNG, WebP, GIF)');
      }
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(2),
        type: file.type
      });
    }
  };

  // Trigger file input
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="new-home">
      <Header />

      {/* Hero - Upload Focus */}
      <section className="hero-upload">
        <div className="container">
          <div className="hero-content">
            <h1>Create Videos From Photos</h1>
            <p>AI-powered video generation in seconds. Upload, describe, create.</p>
          </div>

          <div className="upload-section">
            <div 
              className={`upload-area ${dragActive ? 'active' : ''} ${uploadedFile ? 'filled' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleFileClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              
              {!uploadedFile ? (
                <>
                  <div className="upload-icon">📸</div>
                  <h3>Drag & Drop Your Image Here</h3>
                  <p>or click to select from your device</p>
                  <span className="file-types">JPG, PNG, WebP, GIF up to 50MB</span>
                </>
              ) : (
                <>
                  <div className="file-check">✓</div>
                  <h3>File Uploaded!</h3>
                  <p className="file-name">{uploadedFile.name}</p>
                  <small>{uploadedFile.size} KB</small>
                  <button className="change-btn" onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                  }}>Change File</button>
                </>
              )}
            </div>
          </div>

          <div className="prompt-section">
            <label>What should happen in your video?</label>
            <textarea 
              placeholder="e.g., 'Make him walk on the beach', 'She smiles and waves', 'Cinematic rain effect'"
              className="prompt-input"
            />
            <button className="btn btn-primary btn-full">
              Generate Video Now
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-new">
        <div className="container">
          <h2>How Amazing Is It?</h2>

          <div className="features-flex">
            <div className="feature-item">
              <div className="feature-num">1</div>
              <h3>Upload Image</h3>
              <p>Any photo works. JPG, PNG, or WebP.</p>
            </div>

            <div className="arrow">→</div>

            <div className="feature-item">
              <div className="feature-num">2</div>
              <h3>Describe Motion</h3>
              <p>Tell AI what action to create.</p>
            </div>

            <div className="arrow">→</div>

            <div className="feature-item">
              <div className="feature-num">3</div>
              <h3>Get Video</h3>
              <p>Professional HD in 2-5 seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="capabilities">
        <div className="container">
          <h2>What You Can Do</h2>
          
          <div className="capabilities-grid">
            <div className="cap-card">
              <span className="cap-icon">🎬</span>
              <h3>Multiple Styles</h3>
              <p>Cinematic, realistic, anime, cartoon & more</p>
            </div>

            <div className="cap-card">
              <span className="cap-icon">⚡</span>
              <h3>Lightning Speed</h3>
              <p>Generate in just 2-5 seconds</p>
            </div>

            <div className="cap-card">
              <span className="cap-icon">✨</span>
              <h3>HD Quality</h3>
              <p>Professional output, no watermarks</p>
            </div>

            <div className="cap-card">
              <span className="cap-icon">📱</span>
              <h3>All Formats</h3>
              <p>16:9, 9:16, 1:1 for any platform</p>
            </div>

            <div className="cap-card">
              <span className="cap-icon">🎨</span>
              <h3>Smart AI</h3>
              <p>Understands natural descriptions</p>
            </div>

            <div className="cap-card">
              <span className="cap-icon">🎁</span>
              <h3>Totally Free</h3>
              <p>5 videos monthly, no credit card</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Examples */}
      <section className="examples">
        <div className="container">
          <h2>See What's Possible</h2>

          <div className="examples-grid">
            <div className="example-card">
              <div className="example-header">Portrait</div>
              <div className="example-preview">
                <span className="preview-icon">👤</span>
              </div>
              <p className="example-prompt">"Walking on the beach"</p>
            </div>

            <div className="example-card">
              <div className="example-header">Landscape</div>
              <div className="example-preview">
                <span className="preview-icon">🏔️</span>
              </div>
              <p className="example-prompt">"Camera moving through nature"</p>
            </div>

            <div className="example-card">
              <div className="example-header">Product</div>
              <div className="example-preview">
                <span className="preview-icon">📦</span>
              </div>
              <p className="example-prompt">"Rotating 360 degrees"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <div className="container">
          <h2>Why Creators Love It</h2>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🚀</div>
              <h3>Super Fast</h3>
              <p>No more waiting hours. Create in seconds.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">🎯</div>
              <h3>Easy to Use</h3>
              <p>No technical skills needed. Just describe what you want.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">💰</div>
              <h3>100% Free</h3>
              <p>No hidden costs. 5 free videos every month.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">💼</div>
              <h3>Commercial Ready</h3>
              <p>Use for YouTube, TikTok, Instagram, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Create Your First Video</h2>
          <p>Join 50,000+ creators making amazing content</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary btn-large">
              Start Free Now
            </Link>
            <button className="btn btn-secondary btn-large">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-new">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>VideoAI</h4>
              <p>Transform photos into videos with AI</p>
            </div>

            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy</a></li>
                <li><a href="#terms">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 VideoAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}