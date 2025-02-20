import React, { memo } from 'react';
import PrivacyApps from '@screens/PDexV3/features/PrivacyApps';
import withTab from '@screens/MainTabBar/MainTabBar.enhanceTab';
import useFeatureConfig from '@src/shared/hooks/featureConfig';
import appConstant from '@src/constants/app';
import AppMaintain from '@components/AppMaintain';

const TabPrivacyApps = () => {
  const [_, isDisabled] = useFeatureConfig(appConstant.DISABLED.PRIVACYAPP);
  if (isDisabled) {
    return <AppMaintain />;
  }
  return <PrivacyApps hideBackButton />;
};

export default withTab(memo(TabPrivacyApps));
