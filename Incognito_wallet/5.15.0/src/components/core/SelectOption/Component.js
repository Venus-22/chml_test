/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Text4 } from '@components/core/Text';
import { View } from '@components/core';
import { RatioIcon } from '@components/Icons';
import { colorsSelector } from '@src/theme';
import { useSelector } from 'react-redux';
import styleSheet from './style';

const SelectOption = ({ containerStyle, inputStyle, labelStyle, style, prependView, label, items, onChange, value }) => {
  const colors = useSelector(colorsSelector);
  return (
    <View style={[styleSheet.container, style]}>
      {label && (
        <View style={[styleSheet.labelContainer]}>
          <Text
            style={[
              styleSheet.label,
              labelStyle,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
      <View
        style={[
          styleSheet.row,
          containerStyle,
        ]}
      >
        <View style={styleSheet.selectBox}>
          {items.map((item) => {
            const isSelected = item.value === value;
            return (
              <TouchableOpacity
                style={[styleSheet.optionBtn, isSelected ? styleSheet.selectedBtn : styleSheet.unSelectBtn]}
                key={item.label}
                onPress={() => onChange(item.value)}
              >
                <View style={styleSheet.optionContent}>
                  <RatioIcon style={styleSheet.icon} selected={isSelected} />
                  <Text4 style={[styleSheet.textSelectBox, isSelected && { color: colors.text1 }]}>{item.label}</Text4>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {prependView}
      </View>
    </View>
  );
};

SelectOption.defaultProps = {
  label: null,
  containerStyle: null,
  inputStyle: null,
  prependView: null,
  style: null,
  items: [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }],
  onChange: () => null,
  value: 'a'
};

SelectOption.propTypes = {
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  prependView: PropTypes.element,
  label: PropTypes.string,
  style: PropTypes.shape({}),
  items: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default SelectOption;
