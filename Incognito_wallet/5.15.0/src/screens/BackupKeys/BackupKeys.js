/* eslint-disable import/no-cycle */
import { ScrollViewBorder, TouchableOpacity, Text, Button } from '@src/components/core';
import PropTypes from 'prop-types';
import React from 'react';
import CopiableText from '@src/components/CopiableText';
import { Text4 } from '@src/components/core/Text';
import { View } from 'react-native';
import Header from '@src/components/Header';
import IconCopy from '@src/components/Icons/icon.copy';
import { BtnQRCode } from '@src/components/Button';
import srcQrCodeLight from '@src/assets/images/icons/qr_code_light.png';
import srcQrCode from '@src/assets/images/icons/qr_code.png';
import { ArrowRightGreyIcon } from '@src/components/Icons';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import { useSelector } from 'react-redux';
import { colorsSelector } from '@src/theme/theme.selector';
import style from './BackupKeys.styled';
import withBackupKeys from './BackupKeys.enhance';


const BackupKeys = (props) => {
  const { onSaveAs, onCopyAll, noMasterless, masterless, getNameKey, onNext, onBack, backupDataStr} = props;
  const navigation = useNavigation();
  const colors = useSelector(colorsSelector);
  
  const onNavigateToQrPage = (label, value) => {
    navigation.navigate(routeNames.ExportAccountModal, {
      params: {
        value,
        label,
      },
    });
  };

  const renderAccountItem = (name, key) => {
    return (
      <CopiableText
        key={name}
        text={`${name}: ${key}`}
        copiedMessage={`"${name}" private key was copied`}
        style={style.accountItemContainer}
      >
        <View style={style.accountItemHeader}>
          <Text style={style.title}>{name}</Text>
          <BtnQRCode
            style={style.qrCode}
            onPress={()=> onNavigateToQrPage(name, key)}
            source={srcQrCodeLight}
          />
          <IconCopy />
        </View>
        <Text4 style={style.desc}>
          {key}
        </Text4>
      </CopiableText>
    );
  };

  const handleCopy = () => {
    onCopyAll();

    if (onNext) {
      onNext();
    }
  };

  return (
    <>
      <Header title="Back up private keys" onGoBack={onBack} />
      <ScrollViewBorder>
        <View>
          <Text style={style.titleGroup}>Master keys</Text>
          {noMasterless.length > 0 && (noMasterless?.map((pair) => {
            const [name, key] = getNameKey(pair);
            return renderAccountItem(name, key);
          }))}
        </View>
        <View style={style.topGroup}>
          <Text style={style.titleGroup}>Masterless</Text>
          {masterless?.map((pair) => {
            const [name, key] = getNameKey(pair);
            return renderAccountItem(name, key);
          })}
        </View>
        <View>
          <Text style={style.title}>Back up all keys</Text>
          <TouchableOpacity onPress={onSaveAs}>
            <View style={style.saveAsBtn}>
              <Text style={style.desc}>Choose back up option</Text>
              <ArrowRightGreyIcon />
            </View>
          </TouchableOpacity>
          <View style={style.bottomGroup}>
            <BtnQRCode
              style={[style.btnQRCode, { backgroundColor: colors.background5 }]}
              onPress={()=> onNavigateToQrPage('Back up private keys', backupDataStr)}
              source={srcQrCode}
            />
            <Button
              buttonStyle={[style.copyAllButton, onNext && style.copyNext]}
              title={onNext ? 'Copy all keys and\n\ncontinue to new update' : 'Copy all keys'}
              onPress={handleCopy}
            />
          </View>
        </View>
      </ScrollViewBorder>
    </>
  );
};

BackupKeys.defaultProps = {
  backupDataStr: '',
  noMasterless: [],
  masterless: [],
  onNext: undefined,
  onBack: undefined,
};

BackupKeys.propTypes = {
  backupDataStr: PropTypes.string,
  masterless: PropTypes.arrayOf(PropTypes.object),
  noMasterless: PropTypes.arrayOf(PropTypes.object),
  onSaveAs: PropTypes.func.isRequired,
  onCopyAll: PropTypes.func.isRequired,
  getNameKey: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

export default withBackupKeys(BackupKeys);
