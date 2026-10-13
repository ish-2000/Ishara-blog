export * from '../styles/theme';
export { default } from '../styles/theme';

import { C, F } from '../styles/theme';

export const tokens = {
  colors: {
    background: C.bg,
    foreground: C.text,
    mutedText: C.muted,
    secondaryText: C.sub,
    border: C.border,
    borderLight: C.borderLight,
    accentBlue: C.accent,
    accentBlueLight: '#3B82F6',
    accentBlueSubtle: C.accentSubtle,
    accentBlueHover: C.accentHover,
    cardBackground: C.card,
    subtleBackground: C.cardSubtle,
  },
  typography: {
    fontFamily: F.family,
    weights: {
      light: F.light,
      regular: F.regular,
      medium: F.medium,
    },
    letterSpacing: {
      headline: F.tight,
      subheading: F.snug,
      body: '-0.01em',
    },
  },
  layout: {
    maxWidth: '1240px',
    pagePadding: 'px-4 sm:px-6 lg:px-8',
    headerHeight: '4.5rem',
  },
  radii: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  transitions: {
    default: 'transition-all duration-200 ease-in-out',
    smooth: 'transition-all duration-300 ease-out',
  },
} as const;
