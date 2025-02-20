import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MainLayout from '@components/MainLayout/index';
import Button from '@screens/BackUpPassphrase/components/Button';
import { LoadingContainer, Text, TouchableOpacity, View, Text3, ScrollViewBorder } from '@components/core';
import { COLORS, FONT, THEME } from '@src/styles';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import routeNames from '@routers/routeNames';
import { generateNewMnemonic } from '@services/wallet/mnemonicService';
import QrCodeGenerate from '@components/QrCodeGenerate/index';
import clipboard from '@services/clipboard';
import { colorsSelector } from '@src/theme/theme.selector';

const styles = StyleSheet.create({
  desc: {
    ...THEME.text.mediumText,
    lineHeight: 24,
  },
  qrCodeContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  qrCode: {
    borderWidth: 1,
    borderColor: COLORS.black2,
    backgroundColor: COLORS.black2,
    width: 110,
    alignItems: 'center',
    borderRadius: 5,
  },
  qrCodeContent: {
    margin: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  qrCodeText: {
    ...FONT.STYLE.bold,
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 8,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  words: {
    marginTop: 24,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  word: {
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 5,
    fontFamily: FONT.NAME.medium,
  },
  index: {
    // color: COLORS.newGrey,
  },
});

const Passphrase = () => {
  const navigation = useNavigation();
  const data = useNavigationParam('data');
  const [mnemonic, setMnemonic] = useState('');
  const colors = useSelector(colorsSelector);

  const handleNext = () => {
    navigation.navigate(data.isInit ?
      routeNames.InitVerifyPassphrase :
      routeNames.VerifyPassphrase,
    { data }
    );
  };

  useEffect(() => {
    if (data && data.isBackUp) {
      setMnemonic(data.mnemonic);
    } else {
      data.mnemonic = generateNewMnemonic();
      setMnemonic(data.mnemonic);
    }
  }, []);

  const handleCopy = () => {
    clipboard.set(data.mnemonic, { copiedMessage: 'Phrase was copied.' });

    if (data.isBackUp) {
      return navigation.goBack();
    }
  };

  if (!mnemonic) {
    return <LoadingContainer />;
  }

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <MainLayout
      header="Master key phrase"
      scrollable
      onGoBack={data.isInit ? handleBack : undefined}
    >
      <Text style={styles.desc}>
        Save these words in the correct order. Never share this phrase with anyone else.
      </Text>
      <View style={styles.words}>
        {mnemonic.split(' ').map((word, index) => (
          <Text
            key={`${word}-${index}`}
            style={[styles.word, {borderColor: colors.border3}]}
          >
            <Text3 style={[styles.word, styles.index]}>{index + 1} </Text3>{word}
          </Text>
        ))}
      </View>
      <View style={styles.qrCodeContainer}>
        <TouchableOpacity onPress={handleCopy} style={styles.qrCode}>
          <View style={styles.qrCodeContent}>
            <QrCodeGenerate value={data.mnemonic} size={80} />
          </View>
          <Text style={styles.qrCodeText}>Copy</Text>
        </TouchableOpacity>
      </View>
      {!data.isBackUp && (
        <Button
          label="I've saved my phrase"
          onPress={handleNext}
        />
      )}
    </MainLayout>
  );
};

export default Passphrase;
