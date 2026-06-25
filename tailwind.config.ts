import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mindsite: {
          'bg-dark': 'var(--mindsite-bg-dark)',
          'primary-green': 'var(--mindsite-primary-green)',
          'accent-violet': 'var(--mindsite-accent-violet)',
          'action-mint': 'var(--mindsite-action-mint)',
          'neutral-light': 'var(--mindsite-neutral-light)',
        }
      },
      fontFamily: {
        // Preparando o terreno para o Google Fonts (Space Grotesk e Inter)
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

export default config;
