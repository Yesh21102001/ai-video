const mongoose = require('mongoose');
module.exports = mongoose.model('Video', {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: String,
  story: String,
  videoUrl: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
