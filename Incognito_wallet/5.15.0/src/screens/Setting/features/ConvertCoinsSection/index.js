import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@routers/routeNames';
import { SectionItem as Section } from '@screens/Setting/features/Section';
import {ConvertIcon} from '@components/Icons';


const ConvertCoinsSection = React.memo(() => {
  const navigation = useNavigation();
  const handleGoConvert = () => {
    navigation.navigate(routeNames.ConvertTokenList);
  };

  return (
    <Section
      data={{
        title: 'Convert v1 to v2 coins',
        desc: 'Convert coins for each keychain',
        handlePress: handleGoConvert,
        icon: <ConvertIcon />
      }}
    />
  );
});

ConvertCoinsSection.propTypes = {};

export default ConvertCoinsSection;
