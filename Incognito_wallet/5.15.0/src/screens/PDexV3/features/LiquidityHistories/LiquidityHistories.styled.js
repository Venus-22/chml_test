import { StyleSheet } from 'react-native';
import { FONT } from '@src/styles';

export default StyleSheet.create({
  wrapper: {
    paddingTop: 20,
  },
  wrapperItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  title: {
    ...FONT.STYLE.medium,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 8,
  },
  status: {
    ...FONT.STYLE.medium,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 7,
  },
  desc: {
    ...FONT.STYLE.medium,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 7,
  },
  leftText: {
    ...FONT.STYLE.medium,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 7,
    color: '#9C9C9C'
  },
  rightText: {
    ...FONT.STYLE.medium,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 7,
    color: 'white'
  },
});
