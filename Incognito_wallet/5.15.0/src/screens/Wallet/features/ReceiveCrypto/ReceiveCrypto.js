import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { FONT } from '@src/styles';
import Header from '@src/components/Header';
import { useSelector } from 'react-redux';
import { selectedPrivacySelector } from '@src/redux/selectors';
import LoadingContainer from '@components/LoadingContainer/index';
import QrCodeGenerate from '@src/components/QrCodeGenerate';
import { CopiableTextDefault as CopiableText } from '@src/components/CopiableText';
import { Text3, TouchableOpacity, View, Text } from '@src/components/core';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import { defaultAccountSelector } from '@src/redux/selectors/account';
import { compose } from 'recompose';
import { withLayout_2 } from '@components/Layout';
import withReceiveCrypto from './ReceiveCrypto.enhance';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  desc: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 4,
    textAlign: 'center',
    marginVertical: 30,
  },
  sub: {
    textDecorationLine: 'underline',
  },
});

const ReceiveCrypto = () => {
  const selectedPrivacy = useSelector(selectedPrivacySelector.selectedPrivacy);
  const account = useSelector(defaultAccountSelector);
  const address = account.PaymentAddress;
  const navigation = useNavigation();
  if (!selectedPrivacy) return <LoadingContainer />;
  return (
    <>
      <Header title="Receive" />
      <View borderTop style={homeStyle.container} paddingHorizontal>
        <ScrollView>
          <QrCodeGenerate
            value={address}
            size={175}
            style={{
              marginTop: 50,
            }}
          />
          <Text style={homeStyle.desc}>
            {
              'This is your address.\nUse it to receive any cryptocurrency\nfrom another Incognito address.'
            }
          </Text>
          <CopiableText data={address} />
          {selectedPrivacy?.isDeposable && (
            <TouchableOpacity
              onPress={() => navigation.navigate(routeNames.Shield)}
            >
              <Text3 style={homeStyle.desc}>
                {'To receive from outside Incognito,\n please use '}
                <Text style={[homeStyle.desc, homeStyle.sub]}>Deposit.</Text>
              </Text3>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </>
  );
};

ReceiveCrypto.propTypes = {};

export default compose(
  withLayout_2,
  withReceiveCrypto,
)(ReceiveCrypto);
