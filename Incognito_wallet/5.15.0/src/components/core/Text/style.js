import { StyleSheet } from 'react-native';
import { THEME } from '@src/styles';

const style = StyleSheet.create({
  root: {
    ...THEME.text.defaultTextStyle,
    includeFontPadding: false,
    textAlignVertical: 'center'
  },
});

export default style;
