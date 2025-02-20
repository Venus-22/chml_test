import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StatusBar as RNComponent, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import routeNames from '@src/router/routeNames';
import { useSelector } from 'react-redux';
// import { wizardSelector } from '@src/screens/GetStarted/GetStarted.selector';
import { colorsSelector } from '@src/theme/theme.selector';

const { Market } = routeNames;

export const background1Screen = [Market];

const isIOS = Platform.OS === 'ios';
const isIphoneX = DeviceInfo.hasNotch();

export const STATUS_BAR_HEIGHT = isIOS
  ? isIphoneX
    ? 40
    : 20
  : RNComponent.currentHeight;

const StatusBar = React.memo(() => {
  let backgroundColor;
  let textColor;
  const colors = useSelector(colorsSelector);

  backgroundColor = colors.background2;
  textColor = 'light-content';

  if (!isIOS) {
    RNComponent.setBackgroundColor(backgroundColor);
    RNComponent.setBarStyle(textColor);
    return null;
  }
  return (
    <View
      style={{
        width: '100%',
        height: STATUS_BAR_HEIGHT,
        backgroundColor: backgroundColor,
      }}
    >
      <RNComponent barStyle={textColor} />
    </View>
  );
});

StatusBar.defaultProps = {
  currentScreen: '',
};

StatusBar.propTypes = {
  currentScreen: PropTypes.string,
};

export default StatusBar;
