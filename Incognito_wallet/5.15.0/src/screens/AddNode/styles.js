import { StyleSheet } from 'react-native';
import { FONT } from '@src/styles';

const styles = StyleSheet.create({
  container: {
  },
  content: {
    paddingTop: 32,
  },
  contentItem: {
    marginBottom: 30,
  },
  title: {
    fontSize: FONT.SIZE.medium,
    fontFamily: FONT.NAME.bold,
    lineHeight: 24,
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: FONT.NAME.medium,
    lineHeight: 18,
    fontSize: FONT.SIZE.regular,
  },
});

export default styles;
