import { StyleSheet } from 'react-native';
import {COLORS, FONT} from '@src/styles';
import screenTheme from '@screens/Node/theme';

export default StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 15,
    ...FONT.STYLE.medium,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  itemRight: {
    marginLeft: 'auto',
  },
  field: {
    color: COLORS.lightGrey1,
  },
  button: {
    backgroundColor: screenTheme.buttonColor,
    marginTop: 30,
  },
  desc: {
    ...FONT.TEXT.incognitoP1,
  },
  firstLine: {
    marginBottom: 20,
  },
  error: {
    marginTop: 10,
    color: COLORS.red,
    fontSize: 14,
  },
});
