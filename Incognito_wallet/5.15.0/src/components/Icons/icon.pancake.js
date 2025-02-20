import React from 'react';
import { StyleSheet, ImageProps } from 'react-native';
import { Image } from '@src/components/core';
import { COLORS } from '@src/styles';
import pancakeSrcIcon from '@src/assets/images/new-icons/pancake.png';

const styled = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

const PancakeIcon = (props: ImageProps) => {
  const { style, ...rest } = props;
  return (
    <Image source={pancakeSrcIcon} style={[styled.icon, style]} {...rest} />
  );
};

PancakeIcon.propTypes = {};

export default PancakeIcon;
