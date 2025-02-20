import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { CopyIcon } from '@src/components/Icons';

const BtnCopy = (props: TouchableOpacityProps) => {
  const { containerStyle, iconStyle, isHeader ,...rest } = props;
  return (
    <TouchableOpacity {...rest}>
      <CopyIcon containerStyle={containerStyle} style={iconStyle} isHeader={isHeader} />
    </TouchableOpacity>
  );
};

export default BtnCopy;
