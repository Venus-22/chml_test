import { StyleSheet } from 'react-native';
import { COLORS, FONT } from '@src/styles';

const style = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: COLORS.lightGrey5,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 20,
    backgroundColor: COLORS.black,
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  balanceUpdate: {
    fontSize: FONT.SIZE.veryLarge,
    lineHeight: FONT.SIZE.veryLarge + 4,
    textAlign: 'center',
    ...FONT.STYLE.bold,
  },
  rewards: {
    width: '100%',
    height: 70,
    marginTop: 32,
  },
  noDot: {
    marginBottom: 10,
  },
  haveDot: {
    marginBottom: 10,
  }
});

export default style;
