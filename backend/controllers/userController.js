exports.getProfile = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  res.json({ user: req.user });
};

exports.updateSubscription = async (req, res) => {
  try {
    const { subscription } = req.body;
    if (!['free', 'pro', 'premium'].includes(subscription)) return res.status(400).json({ message: 'Invalid subscription' });
    req.user.subscription = subscription;
    await req.user.save();
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
