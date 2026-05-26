import api from './api';

export const fetchProfileRequest = () => api.get('/user/profile');
export const updateSubscriptionRequest = (subscription) => api.put('/user/subscription', { subscription });
