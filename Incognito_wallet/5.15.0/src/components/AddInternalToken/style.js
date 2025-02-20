import { FONT, THEME, COLORS } from '@src/styles';
import { StyleSheet } from 'react-native';
import { isIOS } from '@src/utils/platform';
import globalStyled from '@src/theme/theme.styled';

const style = StyleSheet.create({
  container: {
    marginBottom: isIOS() ? 30 : 50,
  },
  issuanceFee: {
    marginTop: 16
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  verifyInfoContainer: {
    marginTop: 10,
  },
  verifyInfoHeader: {
    flexDirection: 'row',
  },
  verifyInfoLabel: {
    fontSize: FONT.SIZE.regular,
    fontFamily: FONT.NAME.medium,
    lineHeight: FONT.SIZE.medium + 4,
    flex: 1,
  },
  block: {
    marginTop: 30,
  },
  desc: {
    marginBottom: 10,
  },
  input: {
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
    fontFamily: FONT.NAME.medium,
  },
  labelInput: {
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 4,
    fontFamily: FONT.NAME.bold,
  },
  descriptionInput: {
    marginTop: 30,
  },
  submitBtn: {
    marginVertical: 50,
    height: 50,
  },
  titleSubmitBtn: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.superMedium,
  },
  submitBtnDisabed: {
    opacity: 0.7,
  },
  title: {
    fontSize: THEME.text.largeTitleSize,
    fontWeight: 'bold',
  },
  balance: {
    textAlign: 'center',
  },
  error: {
    color: COLORS.red,
    fontSize: FONT.SIZE.small,
  },
  showMyAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showMyAddressLabel: {
    flex: 1,
    ...FONT.TEXT.formLabel,
  },
  switch: {
    marginBottom: 0,
  },
  descriptionPlaceholder: {},
});

export default style;
