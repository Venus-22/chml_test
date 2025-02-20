import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import { SectionItem as Section } from '@screens/Setting/features/Section';
import {actionConditionConsolidate} from '@screens/Streamline';
import {useDispatch} from 'react-redux';
import {ConsolidateIcon} from '@components/Icons';

const UTXOSSection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const checkConditionConsolidate = () => dispatch(actionConditionConsolidate());
  const handleConsolidated = () => {
    checkConditionConsolidate();
    navigation.navigate(routeNames.SelectTokenStreamline);
  };

  return (
    <Section
      data={{
        title: 'Consolidate',
        desc: 'Consolidate UTXOs for each keychain',
        handlePress: handleConsolidated,
        icon: <ConsolidateIcon />
      }}
    />
  );
};

export default React.memo(UTXOSSection);
