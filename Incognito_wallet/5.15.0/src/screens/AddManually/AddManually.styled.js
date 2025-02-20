import { StyleSheet } from 'react-native';
import { FONT } from '@src/styles';
import { isIOS } from '@src/utils/platform';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    // backgroundColor: COLORS.white,
  },
  selectNetworkButtonLabel: {
    fontSize: FONT.SIZE.regular,
  },
  selectNetworkButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  selectNetworkValue: {
    fontSize: 16,
    letterSpacing: 0,
  },
  selectNetworkValueIcon: {},
  typesContainer: {
    // backgroundColor: 'white',
    flex: 1,
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
  selectType: {},
  extra: {
    flex: 1,
    marginBottom: isIOS() ? 70 : 100,
  },
});
