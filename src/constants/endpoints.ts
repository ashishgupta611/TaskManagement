// Example endpoints configuration
// APIs
export const API = {
  URL: {
    //BASE: "https://6849b73d45f4c0f5ee729ac4.mockapi.io",
    BASE: 'https://68519c818612b47a2c0ab7cc.mockapi.io'
  },
} as const;

export const API_ENDPOINTS = {
  TASK: {
    //ADD: "/api/v1/add",
    ADD:'/api/v1/add/Task'
  },
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },
  POSTS: {
    BASE: "/posts",
    BY_ID: (id: string) => `/posts/${id}`,
    BY_USER: (userId: string) => `/posts/user/${userId}`,
  },
  // Add more endpoints as needed
} as const;
