const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // Expo defaults
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // Your custom theme — shadcn/ui style
    foreground: '#000000',

    card: '#ffffff',
    cardForeground: '#000000',

    popover: '#ffffff',
    popoverForeground: '#000000',

    primary: '#006600',
    primaryForeground: '#ffffff',

    secondary: '#f0f0f0',
    secondaryForeground: '#000000',

    muted: '#f5f5f5',
    mutedForeground: '#666666',

    accent: '#00A651',
    accentForeground: '#ffffff',

    destructive: '#DC3545',
    destructiveForeground: '#ffffff',

    success: '#28A745',
    successForeground: '#ffffff',

    warning: '#FD7E14',
    warningForeground: '#ffffff',

    border: 'rgba(0, 0, 0, 0.1)',
    input: 'transparent',
    inputBackground: '#f8f8f8',
    ring: '#006600',

    // Charts & Sidebar
    chart1: '#006600',
    chart2: '#00A651',
    chart3: '#28A745',
    chart4: '#FD7E14',
    chart5: '#DC3545',

    sidebar: '#006600',
    sidebarForeground: '#ffffff',
    sidebarPrimary: '#00A651',
    sidebarPrimaryForeground: '#ffffff',
    sidebarAccent: '#005500',
    sidebarAccentForeground: '#ffffff',
    sidebarBorder: '#005500',
    sidebarRing: '#00A651',
  },

  dark: {
    // Expo defaults
    text: '#E2E8F0',
    background: '#0F172A',
    tint: tintColorDark,
    icon: '#94A3B8',
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorDark,

    // Custom dark palette using hex values for React Native compatibility
    foreground: '#F8FAFC',

    card: '#111827',
    cardForeground: '#F8FAFC',

    popover: '#111827',
    popoverForeground: '#F8FAFC',

    primary: '#22C55E',
    primaryForeground: '#052E16',

    secondary: '#1E293B',
    secondaryForeground: '#E2E8F0',

    muted: '#1F2937',
    mutedForeground: '#94A3B8',

    accent: '#34D399',
    accentForeground: '#052E16',

    destructive: '#EF4444',
    destructiveForeground: '#FEE2E2',

    success: '#22C55E',
    successForeground: '#052E16',

    warning: '#F97316',
    warningForeground: '#FFF7ED',

    border: '#334155',
    input: '#1F2937',
    ring: '#22C55E',

    chart1: '#22C55E',
    chart2: '#34D399',
    chart3: '#10B981',
    chart4: '#F97316',
    chart5: '#EF4444',

    sidebar: '#0F172A',
    sidebarForeground: '#F8FAFC',
    sidebarPrimary: '#22C55E',
    sidebarPrimaryForeground: '#052E16',
    sidebarAccent: '#1E293B',
    sidebarAccentForeground: '#E2E8F0',
    sidebarBorder: '#1E293B',
    sidebarRing: '#34D399',
  },
} as const;
