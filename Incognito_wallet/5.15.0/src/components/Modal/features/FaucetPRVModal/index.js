import React from 'react';
import { StyleSheet } from 'react-native';
import { PureModalContent } from '@src/components/Modal/features/PureModal';
import { Image, Text, View } from '@src/components/core';
import { ButtonTrade } from '@src/components/Button';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import { COLORS, FONT } from '@src/styles';
import { actionToggleModal } from '@src/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANT_CONFIGS } from '@src/constants';
import { defaultAccountSelector } from '@src/redux/selectors/account';
import srcFaucetIcon from '@src/assets/images/new-icons/faucet_icon.png';
import { Row } from '@src/components';

const styled = StyleSheet.create({
  title: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.superMedium,
    lineHeight: FONT.SIZE.superMedium + 5,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  desc: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 5,
    color: COLORS.colorGrey3,
    textAlign: 'center',
  },
});

export const useFaucet = () => {
  const account = useSelector(defaultAccountSelector);
  const navigation = useNavigation();
  const navigateFaucet = () => {
    navigation.navigate(routeNames.WebView, {
      url: `${CONSTANT_CONFIGS.FAUCET_URL}address=${account.paymentAddress}`,
    });
  };
  return [navigateFaucet];
};

const FaucetPRVModal = () => {
  const dispatch = useDispatch();
  const [navigateFaucet] = useFaucet();
  return (
    <PureModalContent>
      <Row style={{ justifyContent: 'center' }}>
        <Image
          source={srcFaucetIcon}
          style={{
            width: 39,
            height: 34.8,
          }}
        />
      </Row>
      <Text style={styled.title}>Faucet PRV</Text>
      <Text style={styled.desc}>
        Incognito collects a small network fee of PRV to pay the miners who help
        power the network.
      </Text>
      <ButtonTrade
        btnStyle={{
          marginTop: 24,
          marginBottom: 0,
          borderRadius: 8,
          backgroundColor: COLORS.black,
        }}
        title="Top up"
        onPress={() => {
          dispatch(actionToggleModal({ visible: false, data: null }));
          navigateFaucet();
        }}
      />
    </PureModalContent>
  );
};

FaucetPRVModal.propTypes = {};

export default React.memo(FaucetPRVModal);
