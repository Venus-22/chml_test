import { StyleSheet } from 'react-native';
import {COLORS, FONT, UTILS} from '@src/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.overlayBlackDark,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginHorizontal: 25,
    borderRadius: 13,
    width: UTILS.deviceWidth() - 50,
    paddingHorizontal: 20,
    paddingVertical: 50,
    position: 'relative',
  },
  desc: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 5,
    textAlign: 'center',
    marginTop: 15,
  },
  percent: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.superMedium,
    lineHeight: FONT.SIZE.superMedium + 5,
    textAlign: 'center',
    marginTop: 12,
  },
});
