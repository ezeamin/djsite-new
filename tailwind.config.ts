/** @type {import('tailwindcss').Config} */
import daisyuiLib from 'daisyui';
import daisyuiTheme from 'daisyui/src/theming/themes';

export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const darkMode = ['class', '[data-theme="dark"]'];
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    boxShadow: {
      'center-blue': '0 0 10px 1px rgba(52, 55, 255, 0.2)',
    },
  },
};
export const daisyui = {
  themes: [
    {
      light: {
        ...daisyuiTheme.light,
        primary: '#3f75a8',
        secondary: '#723fa8',
        accent: '#3fa8a6',
        neutral: '#727272',
        info: '#6366f1',
        success: '#16a249',
        warning: '#fbbf24',
        error: '#dc2828',
        '.bg-skeleton': {
          'background-color': '#bcbdbe',
        },
      },
      dark: {
        ...daisyuiTheme.dark,
        primary: '#3f75a8',
        secondary: '#723fa8',
        accent: '#3fa8a6',
        neutral: '#4b4b4b',
        info: '#6366f1',
        success: '#16a249',
        warning: '#fbbf24',
        error: '#dc2828',
        '.bg-skeleton': {
          'background-color': '#2d3641',
        },
      },
    },
  ],
};
export const plugins = [daisyuiLib];
