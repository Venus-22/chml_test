import React from 'react';
import { Switch } from '@components/core';
import Section from '@screens/Setting/features/Section';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionUpdateShowWalletBalance,
  hideWalletBalanceSelector
} from '@screens/Setting';
import {CurrencyIcon} from '@components/Icons';

const HideBalanceSection = () => {
  const dispatch = useDispatch();

  const onToggleValue = () => dispatch(actionUpdateShowWalletBalance());
  const showWalletBalance = useSelector(hideWalletBalanceSelector);

  return (
    <Section
      label='Hide my balance'
      headerIcon={<CurrencyIcon />}
      headerRight={(
        <Switch
          onValueChange={onToggleValue}
          value={showWalletBalance}
        />
      )}
    />
  );
};

export default React.memo(HideBalanceSection);
