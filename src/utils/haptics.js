// Haptic feedback via Vibration API (web) with intensity levels
export const haptic = {
  light: () => navigator.vibrate?.(10),
  medium: () => navigator.vibrate?.(25),
  success: () => navigator.vibrate?.([15, 50, 15]),
  error: () => navigator.vibrate?.([30, 40, 30]),
  tab: () => navigator.vibrate?.(8),
};
