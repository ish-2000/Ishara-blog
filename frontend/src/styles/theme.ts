import type React from 'react';

/**
 * 🎨 Design System & Common Styles Token File
 * Designed for senior developer & designer ergonomics:
 * Short, clean, professional names (C, F, R, S) for high-speed inline CSS and JSX styling,
 * plus full TypeScript safety and autocomplete.
 */

// ==========================================
// 1. C (Colors) — Short, memorable color codes
// ==========================================
export const C = {
  // Base & Surface
  bg: '#FFFFFF',
  card: '#FFFFFF',
  cardSubtle: '#F9FAFB',
  panel: '#F3F4F6',
  dark: '#111827',
  black: '#0A0A0A',
  white: '#FFFFFF',

  // Typography
  text: '#111827',        // Primary text
  sub: '#4B5563',         // Secondary text
  muted: '#6B7280',       // Muted / metadata
  faint: '#9CA3AF',       // Faint / placeholders
  inverted: '#F9FAFB',    // White / near-white text on dark

  // Borders & Dividers
  border: '#E5E7EB',      // Clean divider / border
  borderLight: '#F3F4F6', // Subtle container border
  borderDark: '#1F2937',  // Dark container border

  // Accent & Action
  accent: '#2563EB',      // Tech blue
  accentHover: '#1D4ED8',
  accentSubtle: '#EFF6FF',

  // Badges & Pills
  badgeBg: '#F3F4F6',
  badgeText: '#374151',
  darkBadgeBg: 'rgba(255, 255, 255, 0.16)',
  darkBadgeText: '#FFFFFF',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.45)',
  darkOverlay: 'rgba(10, 10, 10, 0.75)',
} as const;

// ==========================================
// 2. F (Fonts & Typography) — Editorial scale
// ==========================================
export const F = {
  family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
  
  // Font Weights
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,

  // Letter Spacing
  tight: '-0.025em',
  snug: '-0.015em',
  normal: '0em',
  wide: '0.04em',
} as const;

// ==========================================
// 3. R (Radii / Corner Rounding)
// ==========================================
export const R = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// ==========================================
// 4. S (Styles) — Common professional inline styles
//    Quick drop-in snippets for `style={...}`
// ==========================================
export const S: Record<string, React.CSSProperties> = {
  // Flex layouts
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexAlign: {
    display: 'flex',
    alignItems: 'center',
  },

  // Pills & Badges
  pill: {
    borderRadius: R.full,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 9px',
    borderRadius: R.full,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    backgroundColor: C.badgeBg,
    color: C.badgeText,
  },
  darkBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 10px',
    borderRadius: R.full,
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    backgroundColor: C.darkBadgeBg,
    color: C.darkBadgeText,
    backdropFilter: 'blur(8px)',
  },

  // Buttons & Controls
  blackPillBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 18px',
    backgroundColor: C.black,
    color: C.white,
    borderRadius: R.full,
    fontSize: '13px',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${C.border}`,
    backgroundColor: C.white,
    cursor: 'pointer',
  },
  circleBtnDark: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: C.white,
    border: 'none',
    cursor: 'pointer',
  },

  // Cards
  card: {
    backgroundColor: C.card,
    borderRadius: R['2xl'],
    border: `1px solid ${C.border}`,
    overflow: 'hidden',
  },
  subtleCard: {
    backgroundColor: C.cardSubtle,
    borderRadius: R['2xl'],
    border: `1px solid ${C.borderLight}`,
  },

  // Text shortcuts
  title: {
    color: C.text,
    fontFamily: F.family,
    fontWeight: F.semibold,
    letterSpacing: F.snug,
    lineHeight: 1.3,
  },
  subText: {
    color: C.muted,
    fontFamily: F.family,
    fontSize: '13px',
    fontWeight: F.regular,
  },
  metaText: {
    color: C.faint,
    fontFamily: F.family,
    fontSize: '12px',
    fontWeight: F.regular,
  },

  // Text clamp
  clamp1: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  clamp2: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  clamp3: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
};

// ==========================================
// 5. Unified theme object export
// ==========================================
export const theme = {
  C,
  F,
  R,
  S,
  colors: C,
  fonts: F,
  radii: R,
  styles: S,
} as const;

export default theme;
