import { createSelector } from 'reselect';
import { appTheme } from '@src/theme/theme.colors';

export const themeSelector = createSelector(
  (state) => state.theme,
  (theme) => theme,
);

export const themeModeSelector = createSelector(themeSelector, (theme) => theme.themeMode);

export const colorsSelector = createSelector(themeModeSelector, (themeMode) => appTheme(themeMode));

// export const colorsSelector = createSelector(themeModeSelector, (darkMode) => appTheme(darkMode));
