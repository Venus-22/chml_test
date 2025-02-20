import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text } from '@src/components/core';
import { FONT } from '@src/styles';
import { useFaucet } from '@src/components/Modal/features/FaucetPRVModal';

const styled = StyleSheet.create({
  subText: {
    fontSize: FONT.SIZE.superSmall,
    fontFamily: FONT.NAME.regular,
    textAlign: 'center',
  },
  topup: {
    fontSize: FONT.SIZE.superSmall,
    fontFamily: FONT.NAME.medium,
    textDecorationLine: 'underline',
  },
});

const NetworkFee = ({ style, feeStr }) => {
  const [navigateFaucet] = useFaucet();
  return (
    <Text style={[styled.subText, style]}>
      {
        feeStr
          ? `Incognito collects a small network fee of ${feeStr} PRV to pay the miners who help power the network. Get some from the `
          : 'Incognito collects a small network fee of PRV to pay the miners\nwho help power the network. Get some from the '
      }
      <Text style={styled.topup} onPress={navigateFaucet}>
        faucet.
      </Text>
    </Text>
  );
};

NetworkFee.defaultProps = {
  style: null,
  feeStr: '0.0000001'
};

NetworkFee.propTypes = {
  style: PropTypes.object,
  feeStr: PropTypes.string
};

export default React.memo(NetworkFee);
