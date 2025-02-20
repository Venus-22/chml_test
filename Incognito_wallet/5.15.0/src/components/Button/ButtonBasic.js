import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { colorsSelector } from '@src/theme';
import { useSelector } from 'react-redux';
import { COLORS, FONT } from '@src/styles';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from '@src/components/core';
import isArray from 'lodash/isArray';

const styled = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  title: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    textAlign: 'center',
  },
});

const ButtonBasic = (props) => {
  const {
    title = '',
    btnStyle = null,
    titleStyle = null,
    customContent,
    disabled = true,
    loading = false,
    ...rest
  } = props;
  const colors = useSelector(colorsSelector);
  let containerStyle = [
    {
      ...styled.container,
      backgroundColor: colors.ctaMain,
    },
  ];
  isArray(btnStyle)
    ? containerStyle.push(...btnStyle)
    : containerStyle.push(btnStyle);
  if (disabled) {
    containerStyle.push({
      backgroundColor: colors.grey7,
    });
  }
  return (
    <TouchableOpacity style={containerStyle} {...rest}>
      {customContent ? (
        customContent
      ) : (
        <View style={{ flexDirection: 'row' }}>
          {loading ? (
            <ActivityIndicator
              style={{ marginRight: 5 }}
              color={COLORS.white}
            />
          ) : null}
          <Text
            style={[
              styled.title,
              disabled
                ? {
                  color: colors.ctaMain,
                }
                : {
                  color: colors.mainText,
                },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

ButtonBasic.propTypes = {
  title: PropTypes.string,
  btnStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  customContent: PropTypes.element,
  disabled: PropTypes.bool,
};

ButtonBasic.defaultProps = {
  title: '',
  btnStyle: null,
  titleStyle: null,
  customContent: null,
  disabled: false,
};

export default ButtonBasic;
