import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import srcChartIcon from '@src/assets/images/new-icons/candle.png';
import { Image1 } from '@components/core';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  icon: {
    width: 20.7,
    height: 12,
  },
});

const CustomTouchableOpacity = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.background1};
`;

const BtnChart = (props) => {
  const { style, ...rest } = props;
  return (
    <CustomTouchableOpacity style={[styles.container, style]} {...rest}>
      <Image1 source={srcChartIcon} style={styles.icon} />
    </CustomTouchableOpacity>
  );
};

BtnChart.defaultProps = {};

BtnChart.propTypes = {};

export default BtnChart;
