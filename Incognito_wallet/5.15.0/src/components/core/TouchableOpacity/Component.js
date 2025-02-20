import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacityProps,
} from 'react-native';
import { delay } from '@src/utils/delay';
import styled from 'styled-components/native';

const StyledTouchableOpacity = styled.TouchableOpacity`
`;

const TouchableOpacity = (props: TouchableOpacityProps) => {
  const { onPress, activeOpacity = 0.6, ...rest } = props;
  const _onPress = async () => {
    await delay(0);
    requestAnimationFrame(() => {
      if (typeof onPress === 'function') {
        onPress();
      }
    });
  };

  return (
    <StyledTouchableOpacity
      onPress={_onPress}
      activeOpacity={activeOpacity}
      delayPressIn={0}
      delayPressOut={0}
      delayLongPress={0}
      {...rest}
    />
  );
};

TouchableOpacity.defaultProps = {
  activeOpacity: undefined,
};

TouchableOpacity.propTypes = {
  onPress: PropTypes.func.isRequired,
  activeOpacity: PropTypes.number,
};

export default TouchableOpacity;
