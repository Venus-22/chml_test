import React from 'react';
import { StyleSheet } from 'react-native';
import { Image1, View } from '@src/components/core';
import srcOpenUrl from '@src/assets/images/new-icons/open-link.png';

const styled = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 12,
    height: 12,
  },
});

const IconOpenUrl = (props) => {
  return (
    <View style={[styled.container, props?.containerStyle]}>
      <Image1 style={[styled.icon, props?.style]} source={srcOpenUrl} />
    </View>
  );
};

IconOpenUrl.propTypes = {};

export default IconOpenUrl;
