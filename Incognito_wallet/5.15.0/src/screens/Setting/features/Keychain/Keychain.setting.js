import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import routeNames from '@routers/routeNames';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector} from 'react-redux';
import {currentMasterKeySelector, masterlessKeyChainSelector} from '@src/redux/selectors/masterKey';
import {
  ArrowCurved,
  ArrowRightGreyIcon,
  IconDownload,
  LockArrowIcon,
  PaperPlusIcon,
  RestoreIcon
} from '@components/Icons';
import {Row} from '@src/components';
import {Text} from '@components/core';
import {itemStyled} from '@screens/Setting/features/Keychain/keychain.styled';
import { colorsSelector } from '@src/theme/theme.selector';

const Item = React.memo(({ item, isFirst, isLast }) => {
  if (!item) return null;
  const { title, icon: SectionIcon, handlePress } = item;
  const colors = useSelector(colorsSelector);
  return (
    <TouchableOpacity onPress={handlePress} style={[itemStyled.wrapSetting, isFirst && { paddingTop: 0 }, isLast && { borderBottomWidth: 0 }, { borderBottomColor: colors.border1 }]}>
      <Row centerVertical spaceBetween>
        <Row centerVertical>
          <View style={itemStyled.wrapIcon}>
            <SectionIcon />
          </View>
          <Text style={itemStyled.mediumBlack}>{title}</Text>
        </Row>
        <ArrowRightGreyIcon />
      </Row>
    </TouchableOpacity>
  );
});

const KeychainSetting = () => {
  const masterKey = useSelector(currentMasterKeySelector);
  const masterlessKey = useSelector(masterlessKeyChainSelector);
  const isMasterless = React.useMemo(() => (
    masterKey === masterlessKey
  ), [masterKey, masterlessKey]);

  const navigation = useNavigation();
  const HookFactories = React.useMemo(() => {
    let _hooks = [];
    if (isMasterless) {
      _hooks.push({
        title: 'Import a keychain',
        desc: 'Using a private key',
        icon: IconDownload,
        handlePress: () => navigation.navigate(routeNames.ImportAccount),
      });
    } else {
      _hooks.push({
        title: 'Create',
        desc: `Create a new keychain in ${masterKey?.name}`,
        icon: PaperPlusIcon,
        handlePress: () => navigation.navigate(routeNames.CreateAccount),
      });
      _hooks.push({
        title: `Reveal ${masterKey.name} recovery phrase`,
        desc:
          'Back up this phrase so that even if you lose your device, you will always have access to your funds',
        icon: LockArrowIcon,
        handlePress: () =>
          navigation.navigate(routeNames.MasterKeyPhrase, {
            data: { ...masterKey, isBackUp: true },
          }),
      });
      _hooks.push({
        title: 'Import a keychain',
        desc: 'Using a private key',
        icon: IconDownload,
        handlePress: () => navigation.navigate(routeNames.ImportAccount),
      });
    }
    _hooks.push({
      title: 'Back up',
      desc: 'Back up all master keys and masterless private keys',
      icon: ArrowCurved,
      handlePress: () => navigation.navigate(routeNames.BackupKeys),
    });
    _hooks.push({
      title: 'Restore',
      desc: 'Restore all master keys and masterless private keys',
      icon: RestoreIcon,
      handlePress: () => navigation.navigate(routeNames.Standby),
    });
    return _hooks;
  }, [masterKey, masterlessKey]);

  const renderItem = (item, index) => (
    <Item
      item={item}
      key={item.title}
      isFirst={index === 0}
      isLast={index === (HookFactories.length - 1)}
    />
  );

  return (
    <>
      {HookFactories.map(renderItem)}
    </>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.any.isRequired,
    handlePress: PropTypes.func.isRequired
  }).isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired
};

KeychainSetting.propTypes = {
};

export default memo(KeychainSetting);
