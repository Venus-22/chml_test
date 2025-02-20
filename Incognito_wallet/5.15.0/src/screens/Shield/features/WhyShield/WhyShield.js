import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withLayout_2 } from '@src/components/Layout';
import Header from '@src/components/Header';
import { FONT } from '@src/styles';
import { ScrollViewBorder, Text, Text3 } from '@components/core';

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 7,
    marginBottom: 22,
  },
  title: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 7,
    marginBottom: 5,
  },
});

const WhyShield = () => {
  return (
    <View style={styled.container}>
      <Header title="Why Shield?" />
      <ScrollViewBorder>
        <Text3 style={styled.text}>
          To transact anonymously, first you have to shield your crypto. When
          you send coins to be shielded, an identical – but 100% private –
          version is generated. If you withdraw your coins from the Incognito
          network, this privacy version will be burned, and the original will be
          returned. All original coins are stored safely using the methods
          below:
        </Text3>
        <Text style={styled.title}>Trustless bridge for Ethereum</Text>
        <Text3 style={styled.text}>
          For ETH and all ERC20 tokens, your crypto is safely secured in a
          trustless smart contract.
        </Text3>
        <Text style={styled.title}>Portal for Bitcoin and Binance Smart Chain</Text>
        <Text3 style={styled.text}>
          Decentralized custodians hold deposited tokens, supplying collateral as a bond. Portal is designed as a general bridge, and will continue to branch out to any blockchains that need privacy.
        </Text3>
      </ScrollViewBorder>
    </View>
  );
};

WhyShield.propTypes = {};

export default withLayout_2(WhyShield);
