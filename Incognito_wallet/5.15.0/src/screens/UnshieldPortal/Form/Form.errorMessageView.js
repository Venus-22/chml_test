import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@src/components/core';
import { MESSAGES } from '@src/constants';
import { COLORS, FONT } from '@src/styles';
import { getPrivacyPRVInfo } from '@src/redux/selectors/selectedPrivacy';
import { useSelector } from 'react-redux';
import { useFaucet } from '@src/components/Modal/features/FaucetPRVModal';

const styled = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 0,
  },
  text: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 7,
    color: COLORS.red,
    marginRight: 5,
  },
});

const ErrorMessageView = () => {
  const { isNeedFaucet } = useSelector(getPrivacyPRVInfo);
  const [navigateFaucet] = useFaucet();
  if (!isNeedFaucet) return null;
  return (
    <View style={styled.container}>
      <Text style={styled.text}>{MESSAGES.PRV_NOT_ENOUGHT}
        <Text
          style={[styled.text, {textDecorationLine: 'underline'} ]}
          onPress={() => {
            navigateFaucet();
          }}
        >
        Faucet.
        </Text>
      </Text>
    </View>
  );
};

ErrorMessageView.propTypes = {};

export default ErrorMessageView;

