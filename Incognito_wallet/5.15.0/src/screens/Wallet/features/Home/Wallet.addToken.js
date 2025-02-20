import React, {memo} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@routers/routeNames';
import { TouchableOpacity } from '@components/core';
import {styledAddToken} from '@screens/Wallet/features/Home/Wallet.styled';
import { AddCoinIcon } from '@components/Icons';

const AddToken = () => {
  const navigation = useNavigation();
  const handleFollowToken = () => navigation.navigate(routeNames.FollowToken);
  return (
    <TouchableOpacity style={styledAddToken.container} onPress={handleFollowToken}>
      <AddCoinIcon />
    </TouchableOpacity>
  );
};

export default memo(AddToken);
