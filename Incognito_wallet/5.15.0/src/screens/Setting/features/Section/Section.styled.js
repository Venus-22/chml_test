import { FONT } from '@src/styles';
import { StyleSheet } from 'react-native';
import globalStyled from '@src/theme/theme.styled';

const HEADER_HEIGHT = 35;

export const sectionStyle = StyleSheet.create({
  container: {
    ...globalStyled.defaultPaddingHorizontal,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HEADER_HEIGHT,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoContainer: {},
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastItem: {},
  nonPaddingTop: {
    paddingTop: 0,
  },
  label: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 8,
  },
  desc: {
    fontFamily: FONT.NAME.medium,
    fontWeight: '400',
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 8,
    flex: 1,
    marginLeft: 40
  },
  subDesc: {
    marginTop: 10,
  },
  wrapIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  }
});
