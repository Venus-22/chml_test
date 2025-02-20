import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from '@components/core';
import { COLORS, FONT } from '@src/styles';
import PropTypes from 'prop-types';

const BottomView = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styled.container} onPress={onPress}>
      <Text style={styled.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export const styled = StyleSheet.create({
  container: {
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 8,
    paddingRight: 25,
    zIndex: 9999
  },
  title: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.regular,
    color: COLORS.black,
  },
});

BottomView.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(BottomView);
