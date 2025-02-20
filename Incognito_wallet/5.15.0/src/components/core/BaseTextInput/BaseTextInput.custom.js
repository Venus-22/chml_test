import React from 'react';
import {
  View,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Row from '@src/components/Row';
import { COLORS, FONT } from '@src/styles';
import { SearchIcon, CloseIcon } from '@src/components/Icons';
import { Text } from '@components/core';
import BaseTextInput from './BaseTextInput';

const styled = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1
  },
  inputStyle: {
    flex: 1,
    fontSize: FONT.SIZE.large + 2,
    fontFamily: FONT.NAME.medium,
  },
});

const BaseTextInputCustom = (props) => {
  const inputProps: TextInputProps = props?.inputProps;
  const { canSearch, renderCustom, style, value, maskLabel } = props;
  const [_maskLabel, setMaskLabel] = React.useState(!!maskLabel);

  const handleRenderCustom = () => {
    if (renderCustom) {
      return renderCustom;
    }
    return (
      <View>
        {canSearch &&
          (value ? (
            <TouchableOpacity
              onPress={() => {
                inputProps &&
                  inputProps.onChangeText &&
                  inputProps.onChangeText('');
              }}
            >
              <CloseIcon size={22} />
            </TouchableOpacity>
          ) : (
            <SearchIcon />
          ))}
      </View>
    );
  };
  return (
    <Row style={[styled.container, style]}>
      {_maskLabel ? (
        <Text
          style={[styled.inputStyle, inputProps?.style]}
          onPress={() => setMaskLabel(false)}
        >
          {inputProps.placeholder}
        </Text>
      ) : (
        <BaseTextInput
          {...{
            ...inputProps,
            style: { ...styled.inputStyle, ...inputProps?.style },
          }}
          value={value}
          placeholderTextColor={COLORS.white}
        />
      )}
      {handleRenderCustom()}
    </Row>
  );
};

BaseTextInputCustom.defaultProps = {
  inputProps: {},
  canSearch: true,
  renderCustom: undefined,
  style: undefined,
  value: '',
  maskLabel: false,
};

BaseTextInputCustom.propTypes = {
  inputProps: PropTypes.object,
  canSearch: PropTypes.bool,
  renderCustom: PropTypes.element,
  style: PropTypes.object,
  value: PropTypes.any,
  maskLabel: PropTypes.bool,
};

export default React.memo(BaseTextInputCustom);
