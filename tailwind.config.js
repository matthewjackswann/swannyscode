/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {},
  colors: {
    'text': '#0b1009',
    'background': '#F1EFF6',
    'primary': '#5e2071',
    'secondary': '#b1b1c1',
    'accent': '#20714d',
    'background-faded': '#E7E6EB',
    'text-dark': '#fbfefd',
    'background-dark': '#040b09',
    'primary-dark': '#55a8c3',
    'accent-dark': '#5571c3',
    'background-faded-dark': '#0d1c18',
  }
};
export const plugins = [];
export const darkMode = 'class';

