export const COLORS = {
  // Brand & Core (matching user reference design)
  primary: '#3E6867',       // Dark sage / teal green as seen in reference headers & buttons
  primaryDark: '#2C4E4D',
  primaryLight: '#527F7E',
  primaryHover: '#335857',

  tabBar: '#446E6C',        // Exact dark teal green from the reference tab bar
  accent: '#3E6867',        // Unified accent
  accentOrange: '#FE6B0B',  // Vibrant orange for "Continue Shopping" button

  // Backgrounds & Surfaces
  background: '#F8FAFC',    // Soft clean canvas
  surface: '#FFFFFF',       // Clean white for cards, headers
  surfaceMuted: '#F1F5F9',  // Subtle inputs & pills
  bannerBlue: '#AEDFEE',    // Soft sky blue from hero banner

  // Borders & Dividers
  border: '#E2E8F0',
  borderLight: '#F1F5F9',

  // Typography
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textBrand: '#446E6C',

  // Semantic Status
  success: '#22C55E',       // Green for accepted order checkmark
  successBg: '#DCFCE7',
  destructive: '#DC2626',
  destructiveBg: '#FEE2E2',
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
