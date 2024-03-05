import { Barlow, Koulen } from 'next/font/google';

export const koulen = Koulen({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

export const barlow = Barlow({
  weight: ['400', '500', '600', '700'],
  style: 'normal',
  subsets: ['latin'],
});
