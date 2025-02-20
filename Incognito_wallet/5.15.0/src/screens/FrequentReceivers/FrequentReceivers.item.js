import React from 'react';
import Swipeout from 'react-native-swipeout';
import { BtnDelete } from '@src/components/Button';
import { TouchableOpacity, View, Text } from '@src/components/core';
import { Text4 } from '@src/components/core/Text';
import {  StyleSheet } from 'react-native';
import { FONT } from '@src/styles';
import { ExHandler } from '@src/services/exception';
import { useDispatch, useSelector } from 'react-redux';
import { actionDelete } from '@src/redux/actions/receivers';
import PropTypes from 'prop-types';
import { isKeychainAddressSelector } from '@src/redux/selectors/receivers';

const itemStyled = StyleSheet.create({
  hook: {
    flex: 1,
    paddingVertical: 15,
    paddingLeft: 25,
  },
  name: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.superMedium,
    lineHeight: FONT.SIZE.superMedium + 4,
    marginBottom: 15,
    maxWidth: '50%',
  },
  address: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 4,
  },
});

const Item = ({
  keySave,
  name,
  address,
  containerStyled,
  disabledSwipe,
  rootNetworkName,
  ...rest
}) => {
  const receiver = {
    name,
    address,
  };
  const isKeychainAddress = useSelector(isKeychainAddressSelector)(receiver);
  const dispatch = useDispatch();
  const onDelete = async () => {
    try {
      const payload = {
        keySave,
        receiver,
      };
      dispatch(actionDelete(payload));
    } catch (error) {
      new ExHandler(error).showErrorToast();
    }
  };
  const Component = () => (
    <TouchableOpacity {...rest}>
      <View style={[itemStyled.hook, containerStyled]}>
        <Text style={itemStyled.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text4
          style={itemStyled.address}
          ellipsizeMode="middle"
          numberOfLines={1}
        >
          {address}
        </Text4>
      </View>
    </TouchableOpacity>
  );

  if (isKeychainAddress) {
    return <Component />;
  }

  return (
    <Swipeout
      disabled={!!disabledSwipe}
      close
      autoClose
      right={[
        {
          component: <BtnDelete showIcon={false} onPress={onDelete} />,
        },
      ]}
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <Component />
    </Swipeout>
  );
};

Item.defaultProps = {
  containerStyled: null,
  disabledSwipe: true,
};

Item.propTypes = {
  keySave: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  containerStyled: PropTypes.any,
  disabledSwipe: PropTypes.bool,
  rootNetworkName: PropTypes.string.isRequired,
};

export default Item;
