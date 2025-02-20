import { Text } from '@src/components/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View } from 'react-native';
import styleSheet from './style';

const QrCodeGenerate = ({ value, size, style }) => {
  const [error, setError] = useState(null);

  return (
    <View style={[styleSheet.container, style, { width: size + 32 }]}>
      {error ? (
        <Text>Can not show QR code</Text>
      ) : (
        <QRCode value={value} size={size} onError={setError} />
      )}
    </View>
  );
};

QrCodeGenerate.defaultProps = {
  size: 150,
};

QrCodeGenerate.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number
};

export default QrCodeGenerate;
