/**
 * Add all api routes here to avoid type errors
 */
type TUrls = readonly [
  '/v1/login/user',
  '/auth/login',
  '/auth/me',
  // User routes
  '/users',
  `/users/${string}`, // Dynamic route
];
