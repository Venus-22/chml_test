import React from 'react';
import { Switch } from '@components/core';
import Section, { sectionStyle } from '@screens/Setting/features/Section';
import { Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { actionToggleCurrency, currencySelector } from '@screens/Setting';
import {CurrencyIcon} from '@components/Icons';

const CurrencySection = () => {
  const dispatch = useDispatch();

  const toggle = useSelector(currencySelector);
  const onToggleValue = () => dispatch(actionToggleCurrency());

  return (
    <Section
      label='Currency display'
      headerIcon={<CurrencyIcon />}
      headerRight={(
        <Switch
          onValueChange={onToggleValue}
          value={toggle}
        />
      )}
      customItems={[
        <View
          key='currency-display'
          onPress={toggle}
          style={sectionStyle.subItem}
        >
          <Text style={sectionStyle.desc}>
            Display in USD instead of PRV
          </Text>

        </View>,
      ]}
    />
  );
};

export default React.memo(CurrencySection);
