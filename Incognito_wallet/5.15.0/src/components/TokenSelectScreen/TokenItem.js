import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Text3 } from '@components/core';
import VerifiedText from '@components/VerifiedText/index';
import { useSelector } from 'react-redux';
import { selectedPrivacySelector } from '@src/redux/selectors';
import globalStyled from '@src/theme/theme.styled';
import styles from './style';

const TokenItem = React.memo(({ name, id, symbol, verified }) => {
  const token = useSelector(state => selectedPrivacySelector.getPrivacyDataByTokenID(state)(id));
  return (
    <View style={globalStyled.defaultPaddingHorizontal}>
      <View>
        <VerifiedText text={name} isVerified={verified} style={styles.tokenName} />
      </View>
      <View style={[styles.row, { paddingBottom: 0 }]}>
        <Text3 style={styles.networkName}>{symbol}</Text3>
        <Text3 style={styles.networkName}>({token.networkName})</Text3>
      </View>
    </View>
  );
});

TokenItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  verified: PropTypes.bool,
};

TokenItem.defaultProps = {
  verified: false,
};

export default TokenItem;
