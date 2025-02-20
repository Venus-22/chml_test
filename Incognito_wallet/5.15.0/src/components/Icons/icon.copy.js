import React from 'react';
import { StyleSheet } from 'react-native';
import { Image1, View } from '@src/components/core';
import srcCopy from '@src/assets/images/new-icons/copy.png';

const styled = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    width: 15.09,
    height: 18,
  },
});

const IconCopy = (props) => {
  return (
    <View
      style={[
        styled.container,
        props?.containerStyle,
      ]}
    >
      <Image1 style={[styled.icon, props?.style]} source={srcCopy} />
    </View>
  );
};

IconCopy.propTypes = {};

export default IconCopy;
