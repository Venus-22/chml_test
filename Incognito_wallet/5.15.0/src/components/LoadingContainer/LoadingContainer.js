import React from 'react';
import { ActivityIndicator } from '@src/components/core';
import { View2 } from '@components/core/View';
import styleSheet from './style';

const LoadingContainer = () => (
  <View2 style={styleSheet.container}>
    <ActivityIndicator size="large" />
  </View2>
);

export default LoadingContainer;
