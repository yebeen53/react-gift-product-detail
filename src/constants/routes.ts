export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  MY:'/my',
  USER_DETAIL: (id: string | number) => `/users/${id}`,
};
