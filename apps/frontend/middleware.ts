import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['ka', 'en', 'ru'],
  defaultLocale: 'ka',
  localePrefix: 'as-needed' // Убираем префиксы для дефолтной локали
});
 
export const config = {
  matcher: ['/', '/(ka|en|ru)/:path*']
};
