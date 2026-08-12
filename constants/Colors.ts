const tintColorLight = '#2f95dc';
const tintColorDark = '#2f95dc';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    tabIconDefault: '#666',
    tint: tintColorLight,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    tabIconDefault: '#fff',
    tint: tintColorDark,
    tabIconSelected: tintColorDark,
  },
} as const;
