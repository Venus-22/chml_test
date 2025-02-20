import React from 'react';
import { Switch as RNComponent } from 'react-native';
import { COLORS } from '@src/styles';

const Switch = (props) => (
  <RNComponent
    thumbColor="white"
    trackColor={{ true: COLORS.blue5, false: '#757575' }}
    style={{ transform: [{ scaleX: .85 }, { scaleY: .85 }] }}
    {...props}
  />
);

export default Switch;
