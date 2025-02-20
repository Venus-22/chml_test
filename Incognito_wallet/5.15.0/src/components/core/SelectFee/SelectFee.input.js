import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { BaseTextInput } from '@src/components/core';
import { Row } from '@src/components';
import { FONT } from '@src/styles';
import { useSelector } from 'react-redux';
import { colorsSelector } from '@src/theme';
import SelectFee from './SelectFee';

const styled = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  inputWrapper: {
    flex: 1,
    maxWidth: '50%',
  },
  input: {
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 5,
    fontFamily: FONT.NAME.medium,
  },
});

const SelectFeeInput = (props) => {
  const { types, onChangeTypeFee, placeholder, editableInput, ...rest } = props;
  const colors = useSelector(colorsSelector);
  return (
    <Row style={[styled.inputContainer, { backgroundColor: colors.grey7 }]}>
      <View style={[styled.inputWrapper]}>
        <BaseTextInput
          style={{
            ...styled.input,
          }}
          keyboardType="decimal-pad"
          placeholder={placeholder}
          ellipsizeMode="tail"
          numberOfLines={1}
          editable={editableInput}
          {...rest}
        />
      </View>
      <SelectFee
        types={types}
        onChangeTypeFee={onChangeTypeFee}
        canSelected={editableInput}
      />
    </Row>
  );
};

SelectFeeInput.propTypes = {
  onChangeTypeFee: PropTypes.func.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      tokenId: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      actived: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  editableInput: PropTypes.bool,
};

export default React.memo(SelectFeeInput);
