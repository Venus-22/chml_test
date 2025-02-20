import  {COLORS, FONT, UTILS } from '@src/styles';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    marginVertical: UTILS.heightScale(38),
  },
  buttonTitle: {
    fontSize: 20,
    ...FONT.STYLE.medium,
  },
  error: {
    color: COLORS.red,
  },
  bigText: {
    fontSize: 30,
    lineHeight: 45,
    ...FONT.STYLE.bold,
  },
  mainInfo: {
    marginVertical: UTILS.heightScale(10),
  },
  bold: {
    ...FONT.STYLE.bold,
    color: COLORS.black,
  },
  extra: {
    fontSize: 16,
    lineHeight: 19,
  },
  extraRight: {
  },
  warning: {
    color: COLORS.orange,
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontFamily: FONT.NAME.medium,
    fontSize: 16,
    lineHeight: 21,
  },
});
