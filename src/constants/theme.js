export const COLORS = {
  // Brand & Core
  primary: '#0F172A',       // Slate 900 - Timeless, elegant primary for text and main buttons
  primaryLight: '#1E293B',  // Slate 800 - Slightly elevated surface / secondary dark
  primaryHover: '#334155',  // Slate 700

  accent: '#0D9488',        // Teal 600 - Fresh, grounded e-commerce accent (prices, badges)
  accentLight: '#CCFBF1',   // Teal 100 - Badge backgrounds
  accentDark: '#0F766E',    // Teal 700

  // Backgrounds & Surfaces
  background: '#F8FAFC',    // Slate 50 - Soft neutral app canvas
  surface: '#FFFFFF',       // Clean white for cards, sheets, headers
  surfaceMuted: '#F1F5F9',  // Slate 100 - Inputs, button backgrounds

  // Borders & Dividers
  border: '#E2E8F0',        // Slate 200 - Hairline borders
  borderLight: '#F1F5F9',   // Slate 100

  // Typography
  textPrimary: '#0F172A',   // Slate 900 - High contrast readable headings
  textSecondary: '#475569', // Slate 600 - Clear secondary text
  textMuted: '#94A3B8',     // Slate 400 - Subtle hints and inactive icons

  // Semantic Status
  success: '#16A34A',       // Green 600
  successBg: '#DCFCE7',     // Green 100
  destructive: '#DC2626',   // Red 600
  destructiveBg: '#FEE2E2', // Red 100
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
};
