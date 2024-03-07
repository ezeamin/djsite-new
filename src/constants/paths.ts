export const PATHS = {
  HOME: '/',
  BUDGET: '/budget',
  NEXT_EVENTS: '/next-events',
  SETS: process.env.NEXT_PUBLIC_SETS_URL || '',
  INSTAGRAM: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  CONTACT: process.env.NEXT_PUBLIC_CONTACT_URL || '',
  ADMIN: {
    AUTH: '/admin/auth',
    EVENTS: '/admin/events',
  },
};
