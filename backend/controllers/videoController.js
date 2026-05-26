const Video = require('../models/Video');

exports.createVideo = async (req, res) => {
  try {
    const { image, story } = req.body;
    if (!image || !story) return res.status(400).json({ message: 'Image and story are required' });
    if (req.user.credits <= 0) return res.status(403).json({ message: 'Not enough credits to create a video' });

    const video = await Video.create({ userId: req.user._id, image, story, status: 'pending' });
    req.user.videosCreated += 1;
    req.user.credits -= 1;
    await req.user.save();

    res.status(201).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).populate('userId', 'name');
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (!video.userId.equals(req.user._id)) return res.status(403).json({ message: 'Unauthorized' });
    res.json({ video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (!video.userId.equals(req.user._id)) return res.status(403).json({ message: 'Unauthorized' });
    if (!video.videoUrl) return res.status(400).json({ message: 'Video file not available' });
    
    // If videoUrl is external, redirect; otherwise serve file
    if (video.videoUrl.startsWith('http')) {
      res.json({ downloadUrl: video.videoUrl });
    } else {
      // For local files, send the path/URL
      res.json({ downloadUrl: video.videoUrl });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
