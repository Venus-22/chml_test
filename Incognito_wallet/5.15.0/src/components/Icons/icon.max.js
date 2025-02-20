import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { FONT } from '@src/styles';
import { Text } from '@src/components/core';
import { useSelector } from 'react-redux';
import { colorsSelector } from '@src/theme';

const styled = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  btnMax: {
    fontSize: FONT.SIZE.small,
    fontFamily: FONT.NAME.medium,
  },
});

const MaxIcon = React.memo(({ onPress, style }) => {
  const colors = useSelector(colorsSelector);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styled.container, { borderColor: colors.borderBtnColor }, style]}
    >
      <Text style={styled.btnMax}>MAX</Text>
    </TouchableOpacity>
  );
});

MaxIcon.defaultProps = {};

MaxIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
};

export default MaxIcon;
