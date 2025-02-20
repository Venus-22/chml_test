import React from 'react';
import { StyleSheet } from 'react-native';
import srcScanQrCode from '@src/assets/images/icons/qr_code_scan.png';
import { Image1, TouchableOpacity } from '@src/components/core';

const styled = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

const BtnScanQrCode = props => {
  return (
    <TouchableOpacity {...props}>
      <Image1 style={styled.icon} source={srcScanQrCode} />
    </TouchableOpacity>
  );
};

BtnScanQrCode.propTypes = {};

export default BtnScanQrCode;
