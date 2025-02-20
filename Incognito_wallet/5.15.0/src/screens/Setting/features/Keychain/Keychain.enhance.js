import React from 'react';
import ErrorBoundary from '@src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchDevices } from '@screens/Setting/Setting.actions';
import { onClickView } from '@utils/ViewUtil';
import { Alert, Toast } from '@components/core';
import { actionSwitchAccount, removeAccount } from '@src/redux/actions/account';
import { ExHandler } from '@services/exception';
import { defaultAccountSelector } from '@src/redux/selectors/account';
import ROUTE_NAMES from '@routers/routeNames';
import { useNavigation } from 'react-navigation-hooks';

const withKeychain = (WrappedComp) => (props) => {
  const [removing, setRemove] = React.useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const defaultAccount = useSelector(defaultAccountSelector);
  const handleFetchDevice = () => dispatch(actionFetchDevices());
  const handleSwitchAccount = onClickView(async (account) => {
    try {
      if (defaultAccount?.name === account?.name) {
        Toast.showInfo(`Your current keychain is "${account?.name}"`);
        return;
      }
      await dispatch(
        actionSwitchAccount(account?.accountName || account?.name),
      );
    } catch (e) {
      new ExHandler(
        e,
        `Can not switch to keychain "${account?.name}", please try again.`,
      ).showErrorToast();
    }
  });
  const handleExportKey = (account) => {
    navigation.navigate(ROUTE_NAMES.ExportAccount, { account });
  };
  const handleDelete = async (account) => {
    Alert.alert(
      `Delete keychain "${account?.name}"?`,
      'Add it again using its private key or associated master key.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK, delete it',
          onPress: async () => {
            try {
              await setRemove(true);
              await dispatch(removeAccount(account));
              Toast.showSuccess('Keychain removed.');
            } catch (e) {
              new ExHandler(
                e,
                `Can not delete keychain ${account?.name}, please try again.`,
              ).showErrorToast();
            } finally {
              await setRemove(false);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <ErrorBoundary>
      <WrappedComp
        {...{
          ...props,
          handleFetchDevice,
          handleSwitchAccount,
          handleExportKey,
          handleDelete,
          removing,
        }}
      />
    </ErrorBoundary>
  );
};

export default withKeychain;
