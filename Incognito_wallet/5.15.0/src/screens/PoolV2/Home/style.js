import { StyleSheet } from 'react-native';
import { FONT, UTILS } from '@src/styles';

const fontSize = UTILS.widthScale(34);
const lineHeight = fontSize + 4;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    overflow: 'hidden'
  },
  rewards: {
    marginTop: UTILS.heightScale(23),
    marginBottom: UTILS.heightScale(7.5),
  },
  amount: {
    fontFamily: FONT.NAME.bold,
    fontSize: fontSize,
    lineHeight: lineHeight,
  },
  symbol: {
    fontSize: fontSize,
    lineHeight: lineHeight,
  },
  symbolUSD: {
    fontSize: 18,
    fontFamily: FONT.NAME.medium,
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
    marginTop: 24,
    width: '48%',
    marginBottom: 0
  },
  coinContainer: {
    marginTop: UTILS.heightScale(30),
    flex: 1,
  },
  coin: {
    marginBottom: UTILS.heightScale(30),
  },
  coinName: {
    fontFamily: FONT.NAME.bold,
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
    paddingVertical: UTILS.heightScale(15),
    bottom: 0,
    left: 0,
    right: 0,
  },
  rateStyle: {
    ...FONT.TEXT.incognitoP1,
  },
  scrollView: {},
  migrateButton: {
    marginHorizontal: 1,
    height: 35,
    width: 150,
  },
  migrateRow: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  rightIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
