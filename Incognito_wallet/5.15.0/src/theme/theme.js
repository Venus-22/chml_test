import React from 'react';
import { useSelector } from 'react-redux';
import { themeModeSelector } from '@src/theme/theme.selector';
import {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import { appTheme } from '@src/theme/theme.colors';

export const ThemeProvider = ({ children }) => {
  const themeMode = useSelector(themeModeSelector);

  const themeObject = React.useMemo(() => appTheme(themeMode), [themeMode]);

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
};
