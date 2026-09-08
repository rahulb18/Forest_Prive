/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#1e293b',
          900: '#111827',
          950: '#0f172a',
        },
        gold: {
          400: '#d4af37',
          500: '#c5a028',
          600: '#b08d1e',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      backgroundImage: {
        'pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleX: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(20px) translateY(-20px)' },
        },
        shimmer: {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '0.6', transform: 'scale(1.2)' },
          '100%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        mistFlow: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(10%)' },
        },
        curtainReveal: {
          '0%': { clipPath: 'inset(10% 45% 10% 45%)', filter: 'blur(10px)' },
          '100%': { clipPath: 'inset(0% 0% 0% 0%)', filter: 'blur(0px)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        scaleX: 'scaleX 1s ease-out forwards',
        slowZoom: 'slowZoom 20s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        slideUpFade: 'slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        drift: 'drift 10s linear infinite alternate',
        shimmer: 'shimmer 4s ease-in-out infinite',
        rotateSlow: 'rotateSlow 20s linear infinite',
        grain: 'grain 8s steps(10) infinite',
        mistFlow: 'mistFlow 20s ease-in-out infinite alternate',
        curtainReveal: 'curtainReveal 1.8s cubic-bezier(0.77, 0, 0.175, 1) forwards',
      }
    }
  },
  plugins: [],
}
