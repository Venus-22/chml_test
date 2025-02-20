import { StyleSheet } from 'react-native';
import { FONT } from '@src/styles';

const globalStyled = StyleSheet.create({
  defaultPadding: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  defaultPaddingHorizontal: {
    paddingHorizontal: 24,
  },
  defaultPaddingVertical: {
    paddingVertical: 24,
  },
  defaultBorderSection: {
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
  },
  defaultPadding2: {
    paddingHorizontal: 24,
    paddingVertical: 5,
  },
  defaultPadding3: {
    paddingHorizontal: 24,
  },
  defaultPadding4: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  defaultBorderRadius: {
    borderRadius: 8,
  },
  defaultFormLabelText: {
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 4,
    fontFamily: FONT.NAME.bold,
  },
  defaultFormLabel: {
    marginBottom: 8,
  },
  defaultFormInputText: {
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
    fontFamily: FONT.NAME.medium,
  },
  
});

export default globalStyled;
