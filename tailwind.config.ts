import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'pacific-cyan': '#2589bd',
        cerulean: '#086788',
        jonquil: '#f0c808',
        'papaya-whip': '#fff1d0',
        rojo: '#dd1c1a',
        rose: '#f40076',
      },
    },
  },
  plugins: [],
};
export default config;
