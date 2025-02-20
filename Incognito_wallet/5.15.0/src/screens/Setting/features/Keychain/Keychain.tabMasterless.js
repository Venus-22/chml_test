import React, { memo } from 'react';
import { Tabs, View, ScrollView } from '@components/core';
import { TABS } from '@screens/Setting/features/Keychain/Keychain.constant';
import Accounts from '@screens/Setting/features/Keychain/Keychain.accounts';
import { styled } from '@screens/Setting/features/Keychain/keychain.styled';
import KeychainSetting from '@screens/Setting/features/Keychain/Keychain.setting';

const TabMasterless = () => {
  return (
    <View borderTop fullFlex style={{ overflow: 'visible', paddingHorizontal: 24, paddingTop: 24 }}>
      <Tabs rootTabID={TABS.TAB_KEYCHAIN_MASTER_LESS_ID} borderTop={false}>
        <View tabID={TABS.TAB_KEYCHAIN_MASTER_LESS_LIST_ID} label="Masterless keys">
          <ScrollView style={styled.wrapper} showsVerticalScrollIndicator={false}>
            <Accounts />
          </ScrollView>
        </View>
        <View tabID={TABS.TAB_KEYCHAIN_MASTER_LESS_SETTING_ID} label="Actions">
          <ScrollView style={styled.wrapper} showsVerticalScrollIndicator={false}>
            <KeychainSetting />
          </ScrollView>
        </View>
      </Tabs>
    </View>
  );
};

export default memo(TabMasterless);
