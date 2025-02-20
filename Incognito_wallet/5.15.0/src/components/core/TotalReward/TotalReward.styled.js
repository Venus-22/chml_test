import { StyleSheet } from 'react-native';
import { FONT, UTILS } from '@src/styles';

const fontSize = FONT.SIZE.veryLarge;
const lineHeight = fontSize + 4;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginTop: 20,
    flex: 1,
  },
  rewards: {
    marginTop: 32,
    marginBottom: 4,
  },
  amount: {
    fontFamily: FONT.NAME.medium,
    fontSize: fontSize,
    lineHeight: lineHeight,
  },
  symbol: {
    fontSize: fontSize,
    lineHeight: lineHeight,
  },
  symbolUSD: {
    ...FONT.TEXT.incognitoH1,
  },
  center: {
    textAlign: 'center',
  },
  icon: {
    marginLeft: 5,
    alignSelf: 'flex-start',
    marginTop: UTILS.heightScale(2),
  },
  actions: {

  },
  actionButton: {
    marginTop: UTILS.heightScale(37),
    marginHorizontal: 4,
    flex: 1,
  },
  coinContainer: {
    marginTop: UTILS.heightScale(30),
    flex: 1,
  },
  coin: {
    marginBottom: UTILS.heightScale(30),
  },
  coinName: {
    fontFamily: FONT.NAME.medium,
    fontSize: 20,
  },
  coinInterest: {
    fontSize: 20,
    fontFamily: FONT.NAME.medium,
    textAlign: 'right',
    flex: 1,
  },
  rateChange: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingVertical: UTILS.heightScale(15),
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: UTILS.heightScale(15),
  },
  rateStyle: {
    ...FONT.TEXT.incognitoP1,
  },
  scrollView: {
    marginBottom: UTILS.heightScale(70),
  },
});
