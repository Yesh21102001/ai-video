const express = require('express');
const { protect } = require('../middlewares/auth');
const { createVideo, getMyVideos, getAllVideos, getVideoById, downloadVideo } = require('../controllers/videoController');
const router = express.Router();

router.get('/', protect, getAllVideos);
router.get('/my', protect, getMyVideos);
router.get('/:id', protect, getVideoById);
router.get('/:id/download', protect, downloadVideo);
router.post('/', protect, createVideo);

module.exports = router;
