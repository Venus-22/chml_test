import React from 'react';
import srcThreeDotsVerIcon from '@src/assets/images/icons/three_dots_ver.png';
import { Image1, View } from '@components/core';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const ThreeDotsVerIcon = props => {
  const defaultStyle = {
    width: 22,
    height: 6,
  };
  const {style, source, ...rest} = props;
  return (
    <View style={styles.container}>
      <Image1
        source={srcThreeDotsVerIcon}
        style={[defaultStyle, style]}
        {...rest}
      />
    </View>
  );
};

export default ThreeDotsVerIcon;
