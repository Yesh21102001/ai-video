export const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
  year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
});
export const getCreditsRequired = (style, duration) => {
  const baseCredits = { 5: 1, 10: 2, 15: 3 };
  const styleMultiplier = {
    cinematic: 1.5, anime: 1.2, realistic: 1.8, fantasy: 1.4,
    cartoon: 1.0, travel: 1.2, emotional: 1.3, advertisement: 1.6
  };
  const base = baseCredits[duration] || 2;
  return Math.ceil(base * (styleMultiplier[style] || 1.0));
};
