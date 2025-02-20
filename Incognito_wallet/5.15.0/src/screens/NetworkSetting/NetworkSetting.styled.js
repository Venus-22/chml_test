import { StyleSheet } from 'react-native';
import { COLORS, FONT, SPACING } from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export const networkItemStyle = StyleSheet.create({
  activeItem: {
    opacity: 1,
  },
  container: {
    flex: 1,
    opacity: 0.3,
    flexDirection: 'row',
    marginBottom: 25,
  },
  editContainer: {
    marginBottom: SPACING.large,
    paddingHorizontal: SPACING.small,
  },
  iconContainer: {
    alignItems: 'center',
    flexBasis: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  networkName: {
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 4,
    fontFamily: FONT.NAME.bold,
    marginBottom: 10,
  },
  networkAddr: {
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 3,
    fontFamily: FONT.NAME.medium,
  },
  textInfoContainer: {
    flex: 1,
    width: '100%',
    marginLeft: 15,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 8,
  },
});
