/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'text': '#0b1009',
      'background': '#f6eff5',
      'primary': '#5e2071',
      'secondary': '#b1b1c1',
      'accent': '#20714d',
      'background-faded': '#E7E6EB',
      'text-dark': '#F1EFF6', //https://realtimecolors.com/?colors=F1EFF6-0b1009-5e2071-020203-5ad09b
      'background-dark': '#0a0910',
      'primary-dark': '#5e2071',
      'secondary-dark': '#1c1c2a',
      'accent-dark': '#35ba7e',
      'background-faded-dark': '#151215',
    }
  },
};
export const plugins = [];
export const darkMode = 'class';

