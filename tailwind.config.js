/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {},
  colors: {
    'text': '#20131d',
    'background': '#f1e9ef',
    'primary-button': '#8a985d',
    'secondary-button': '#fbf9fb',
    'accent': '#365159',
    'background-faded': '#f2f2f2',
    'text-dark': '#fbfefd',
    'background-dark': '#040b09',
    'primary-button-dark': '#55a8c3',
    'secondary-button-dark': '#0d1326',
    'accent-dark': '#5571c3',
    'background-faded-dark': '#0d1c18',
  }
};
export const plugins = [];
export const darkMode = 'class';

