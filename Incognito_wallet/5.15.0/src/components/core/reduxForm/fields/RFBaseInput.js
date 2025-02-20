import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BaseTextInput from '@src/components/core/BaseTextInput';
import Row from '@src/components/Row';
import { useSelector } from 'react-redux';
import { colorsSelector } from '@src/theme';
import { COLORS, FONT } from '@src/styles';
import createField from './createField';

const styled = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  input: {
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 5,
    fontFamily: FONT.NAME.medium,
  },
});

const renderCustomField = (props) => {
  const { input, rightCustom, inputStyle, ...rest } = props;
  const { onChange, onFocus, onBlur, ...restInput } = input;
  const colors = useSelector(colorsSelector);
  return (
    <Row style={[styled.container, { backgroundColor: colors.grey7 }]}>
      <BaseTextInput
        {...{
          ...rest,
          ...restInput,
          style: {
            ...styled.input,
            ...inputStyle,
          },
          onChangeText: (text) => onChange(text),
          onFocus: (event) => onFocus(event),
          onBlur: (event) => onBlur(event),
          editable: !!rest?.editableInput,
        }}
      />
      {rightCustom && rightCustom}
    </Row>
  );
};

const RFBaseInput = createField({
  fieldName: 'RFBaseInput',
  render: renderCustomField,
});

renderCustomField.defaultProps = {};

renderCustomField.propTypes = {
  rightCustom: PropTypes.any,
};

export default React.memo(RFBaseInput);
