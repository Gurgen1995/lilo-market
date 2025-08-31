// apps/frontend/middleware.ts
import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['ka', 'en', 'ru'],
  defaultLocale: 'ka'
});
 
export const config = {
  matcher: ['/', '/(ka|en|ru)/:path*']
};