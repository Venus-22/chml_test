import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  defaultAccountSelector,
  listAccountSelector,
} from '@src/redux/selectors/account';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import { Row } from '@src/components';
import { Text } from '@src/components/core';
import { Text3 } from '@src/components/core/Text';
import { ArrowRightGreyIcon, CheckBoxIcon, RatioIcon } from '@components/Icons';
import { isNodeAccount } from '@screens/Setting/features/Keychain/Keychain.ultil';
import { settingSelector } from '@screens/Setting';
import { DeleteFillIcon } from '@components/Icons/icon.delete';
import { colorsSelector } from '@src/theme/theme.selector';
import withKeychain from './Keychain.enhance';
import { itemStyled } from './keychain.styled';

const Item = React.memo(
  ({ account, handleDelete, handleSwitchAccount, handleExportKey, isLast }) => {
    const defaultAccount = useSelector(defaultAccountSelector);
    const isActive = React.useMemo(
      () => account?.paymentAddress === defaultAccount?.paymentAddress,
      [account?.paymentAddress, defaultAccount?.paymentAddress],
    );
    const colors = useSelector(colorsSelector);
    return (
      <Swipeout
        style={[
          itemStyled.wrap,
          itemStyled.shadow,
          isLast && { marginBottom: 50 },
          { borderColor: colors.border1 },
        ]}
        right={[
          ...(handleDelete
            ? [
              {
                component: (
                  <View style={itemStyled.wrapBin}>
                    <DeleteFillIcon />
                  </View>
                ),
                backgroundColor: 'transparent',
                onPress: () => handleDelete(account),
              },
            ]
            : []),
        ]}
      >
        <TouchableOpacity
          style={itemStyled.wrapContent}
          onPress={() => handleExportKey(account)}
        >
          <Row centerVertical spaceBetween>
            <Row centerVertical>
              <TouchableOpacity
                style={{ paddingRight: 16 }}
                onPress={() => handleSwitchAccount(account)}
              >
                <RatioIcon selected={isActive} />
              </TouchableOpacity>
              <Text style={itemStyled.mediumBlack}>{account.name}</Text>
            </Row>
            <ArrowRightGreyIcon style={itemStyled.arrow} />
          </Row>
          <Text3
            style={itemStyled.mediumGrey}
            ellipsizeMode="middle"
            numberOfLines={1}
          >
            {account.paymentAddress}
          </Text3>
        </TouchableOpacity>
      </Swipeout>
    );
  },
);

const Accounts = ({ handleDelete, handleSwitchAccount, handleExportKey }) => {
  const listAccount = useSelector(listAccountSelector);
  const { devices } = useSelector(settingSelector);
  const renderItem = (account, index) => {
    const isDeletable =
      listAccount.length > 1 && !isNodeAccount(account?.accountName, devices);
    return (
      <Item
        account={account}
        key={account.ValidatorKey}
        handleDelete={isDeletable && handleDelete}
        handleSwitchAccount={handleSwitchAccount}
        handleExportKey={handleExportKey}
        isLast={index === listAccount.length - 1}
      />
    );
  };
  return <>{listAccount.map(renderItem)}</>;
};

Item.propTypes = {
  account: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSwitchAccount: PropTypes.func.isRequired,
  handleExportKey: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
};

Accounts.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleSwitchAccount: PropTypes.func.isRequired,
  handleExportKey: PropTypes.func.isRequired,
};

export default withKeychain(memo(Accounts));
