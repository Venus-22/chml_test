import React from 'react';
import { StyleSheet } from 'react-native';
import { withLayout_2 } from '@src/components/Layout';
import Header from '@src/components/Header';
import { View } from '@src/components/core';
import QrCodeGenerate from '@src/components/QrCodeGenerate';
import { CopiableTextDefault } from '@src/components/CopiableText';
import PropTypes from 'prop-types';
import { useNavigationParam } from 'react-navigation-hooks';

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  qrCode: {
    marginTop: 42,
    marginBottom: 50,
  },
});

const ExportAccountModal = (props) => {
  const { label, value } = useNavigationParam('params');
  return (
    <>
      <Header title={label} />
      <View fullFlex borderTop paddingHorizontal>
        <QrCodeGenerate style={styled.qrCode} value={value} size={150} />
        <CopiableTextDefault data={value} />
      </View>
    </>
  );
};

ExportAccountModal.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default withLayout_2(React.memo(ExportAccountModal));
