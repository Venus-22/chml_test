import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { COLORS, FONT } from '@src/styles';
import Header from '@src/components/Header';
import { useSelector } from 'react-redux';
import { selectedPrivacySelector } from '@src/redux/selectors';
import LoadingContainer from '@components/LoadingContainer/index';
import QrCodeGenerate from '@src/components/QrCodeGenerate';
import { CopiableTextDefault as CopiableText } from '@src/components/CopiableText';
import { TouchableOpacity } from '@src/components/core';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import { defaultAccountSelector } from '@src/redux/selectors/account';

export const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginHorizontal: 25,
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 16
  },
  desc: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 4,
    color: COLORS.lightGrey34,
    textAlign: 'center',
    marginVertical: 30,
  },
  sub: {
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
  copyText: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 4,
    color: COLORS.lightGrey34,
    textAlign: 'center',
  },
});

const AddressModal = () => {
  const selectedPrivacy = useSelector(selectedPrivacySelector.selectedPrivacy);
  const account = useSelector(defaultAccountSelector);
  const address = account.PaymentAddress;
  const navigation = useNavigation();
  if (!selectedPrivacy) return <LoadingContainer />;
  return (
    <View style={homeStyle.container}>
      <QrCodeGenerate
        value={address}
        size={150}
      />
      <Text style={homeStyle.desc}>
        {
          'This is your address.\nUse it to receive any cryptocurrency\nfrom another Incognito address.'
        }
      </Text>
      <CopiableText data={address} textStyle={homeStyle.copyText} />
      {selectedPrivacy?.isDeposable && (
        <TouchableOpacity
          onPress={() => navigation.navigate(routeNames.Shield)}
        >
          <Text style={homeStyle.desc}>
            {'To receive from outside Incognito,\n please use '}
            <Text style={[homeStyle.desc, homeStyle.sub]}>Deposit.</Text>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

AddressModal.propTypes = {};

export default AddressModal;
