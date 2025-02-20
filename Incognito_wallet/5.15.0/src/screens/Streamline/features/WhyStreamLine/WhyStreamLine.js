import React from 'react';
import { StyleSheet } from 'react-native';
import Header from '@components/Header';
import { FONT } from '@src/styles';
import { withLayout_2 } from '@src/components/Layout';
import { Text, ScrollViewBorder, Text3 } from '@src/components/core';

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 9,
    marginBottom: 30,
  },
  boldText: {
    fontFamily: FONT.NAME.bold,
  },
});

const WhyStreamLine = () => {
  const factories = [
    'Just like how spending hard cash in real life results in small change being accumulated, spending cryptocurrency results in UTXOs being accumulated.',
    'Rummaging through a pocket full of coins is not very efficient when you have to pay for anything, and large numbers of UTXOs cause unwanted behaviors like delayed or unsuccessful transactions.',
    'There’s a straightforward fix: consolidate your UTXOs. This is like exchanging a pile of coins for larger notes. Keeps your wallet streamlined and your transactions efficient.',
    'How do I know when I need to consolidate my UTXOs?',
    'When consolidation is recommended, you’ll see a notification in the main Assets screen of the relevant Keychain. You can also access this feature from your Settings tab.',
  ];
  return (
    <>
      <Header title="More on consolidating UTXOs" />
      <ScrollViewBorder>
        {factories.map((item, id) => (
          id !== 3 ? (
            <Text3
              style={[
                styled.text,
              ]}
              key={id}
            >
              {item}
            </Text3>
          ) : (
            <Text
              style={[
                styled.text,
              ]}
              key={id}
            >
              {item}
            </Text>
          )
        ))}
      </ScrollViewBorder>
    </>
  );
};

WhyStreamLine.propTypes = {};

export default React.memo(withLayout_2(WhyStreamLine));
