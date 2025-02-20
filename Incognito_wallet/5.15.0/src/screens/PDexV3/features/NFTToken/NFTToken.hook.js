import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { View } from '@src/components/core';
import { Text4 } from '@src/components/core/Text';
import { FONT } from '@src/styles';

const styled = StyleSheet.create({
  hook: {
    marginBottom: 30,
  },
  value: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 5,
  },
});

const Hook = (props) => {
  const { value } = props;
  return (
    <View style={styled.hook}>
      <Text4 style={styled.value}>{value}</Text4>
    </View>
  );
};

Hook.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default React.memo(Hook);
