import { StyleSheet } from 'react-native';
import { FONT } from '@src/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  desc: {
    marginBottom: 10,
  },
  submitBtn: {
    marginTop: 30,
    height: 50,
  },
  submitBtnTitle: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 3,
  },
  input: {
    marginBottom: 10,
  },
  text: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.superMedium,
    lineHeight: FONT.SIZE.superMedium + 4,
  },
  boldText: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.superMedium,
    lineHeight: FONT.SIZE.superMedium + 4,
  },
});
