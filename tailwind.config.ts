import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        basalt: {
          DEFAULT: '#0d0c0b',
          deep: '#070606',
          surface: '#151412',
          card: '#1b1a17',
        },
        bone: {
          DEFAULT: '#ece4d6',
          muted: '#d5cbba',
          soft: '#f5f0e6',
        },
        brass: {
          DEFAULT: '#c9a36b',
          light: '#dfc295',
          dark: '#9d7c48',
          glow: 'rgba(201, 163, 107, 0.35)',
        },
        smoke: {
          DEFAULT: '#8b8378',
          light: '#aba499',
          dark: '#58524b',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          hover: 'rgba(255, 255, 255, 0.09)',
          active: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'glass': '20px',
      },
      transitionTimingFunction: {
        'arc': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        'glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.14), inset 0 0 20px 0 rgba(201, 163, 107, 0.03), 0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'glass-hover': 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.22), inset 0 0 24px 0 rgba(201, 163, 107, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        'brass-glow': '0 0 25px rgba(201, 163, 107, 0.25)',
      },
      backdropBlur: {
        'glass': '24px',
      },
    },
  },
  plugins: [],
};

export default config;
