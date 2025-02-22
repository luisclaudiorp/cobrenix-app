export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout'
  },
  user: {
    profile: '/user/profile',
    update: '/user/update'
  }
};

export const LOCAL_STORAGE_KEYS = {
  token: 'auth_token',
  user: 'user_data'
};