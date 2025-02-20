import { FONT } from '@src/styles';
import { StyleSheet } from 'react-native';

export const settingStyle = StyleSheet.create({
  textVersion: {
    textAlign: 'center',
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 3,
    marginBottom: 50,
    marginTop: 20
  },
  container: {
  }
});
