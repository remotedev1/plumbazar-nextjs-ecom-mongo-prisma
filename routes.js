/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/auth/new-verification",
  "/",
  "/products/*",
  "/products",
  "/why-us",
  "/guides",
  "/reports",
  "/api/contact-us",
  "/partner-program",
  "/our-services",
  "/cart",
  "/api/search-product",
  "/api/brands",
  "/api/categories",
  "/api/testimonials",
  "/api/clientele",
  "/privacy-policy",
  "/refund-and-cancel",
  "/return-policy",
  "/terms-and-conditions",
  "/shipping-policy"
];

/**
 * An array of routes that are used for authenticationS
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/auth/test",
];

/**
 * An array of routes that are used for authenticationS
 * These routes will redirect logged in users
 * @type {string[]}
 */
export const salesRoutes = ["/rfq"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
