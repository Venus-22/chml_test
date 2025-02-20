import React from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { accountSelector, selectedPrivacySelector } from '@src/redux/selectors';
import { ExHandler } from '@src/services/exception';
import { getBalance as getAccountBalance } from '@src/redux/actions/account';
import { actionFetch as actionFetchHistory } from '@src/redux/actions/history';
import { getBalance as getTokenBalance } from '@src/redux/actions/token';
import { PrivacyVersion } from 'incognito-chain-web-js/build/wallet';
import { removeHistory } from '@src/services/api/history';
import { Toast } from '@src/components/core';

export const useHistoryEffect = (props) => {
  const { version = PrivacyVersion.ver2 } = props || {};
  const account = useSelector(accountSelector.defaultAccountSelector);
  const dispatch = useDispatch();
  const selectedPrivacy = useSelector(selectedPrivacySelector.selectedPrivacy);
  const signPublicKeyEncode = useSelector(
    accountSelector.signPublicKeyEncodeSelector,
  );
  const handleRefresh = async (shouldLoadBalance = true) => {
    try {
      batch(() => {
        if (shouldLoadBalance) {
          switch (version) {
          case PrivacyVersion.ver2: {
            if (selectedPrivacy.isMainCrypto) {
              dispatch(getAccountBalance(account));
            } else if (selectedPrivacy.isToken) {
              dispatch(getTokenBalance(selectedPrivacy.tokenId));
            }
            break;
          }
          default:
            break;
          }
        }
        dispatch(actionFetchHistory({ version }));
      });
    } catch (error) {
      new ExHandler(error).showErrorToast();
    }
  };
  const handleCancelEtaHistory = async (history) => {
    try {
      const data = await removeHistory({
        historyId: history?.id,
        currencyType: history?.currencyType,
        isDecentralized: history?.decentralized,
        signPublicKeyEncode,
      });
      if (data) {
        Toast.showSuccess('Canceled');
        dispatch(actionFetchHistory({ version }));
      }
    } catch (e) {
      new ExHandler(e).showErrorToast();
    }
  };
  React.useEffect(() => {
    handleRefresh(false);
  }, []);
  return {
    handleRefresh,
    handleCancelEtaHistory,
  };
};
