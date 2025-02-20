import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '@src/styles';
import screenTheme from '@src/screens/Node/theme';

const style = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
  title: {
    fontSize: 20,
    lineHeight: 25,
    ...FONT.STYLE.bold,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    marginTop: 50,
    backgroundColor: screenTheme.buttonColor,
  },
  description: {
    fontFamily: FONT.NAME.medium,
    textAlign: 'center',
  },
});

export default style;
