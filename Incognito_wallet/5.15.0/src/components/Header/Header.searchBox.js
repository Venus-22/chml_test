import { TextInput } from '@src/components/Input';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createForm } from '@components/core/reduxForm';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { BaseTextInputCustom } from '@components/core/BaseTextInput';
import { ScreenWidth } from '@utils/devices';
import { Row } from '@src/components';
import { CloseIcon } from '@components/Icons';
import globalStyled from '@src/theme/theme.styled';

const styled = StyleSheet.create({
  searchBox: {
    flex: 1,
  },
  searchBoxNormal: {
    marginRight: 20,
    width: ScreenWidth * 0.62,
    height: 30,
  },
});
export const searchBoxConfig = {
  form: 'searchFormHeader',
  searchBox: 'search',
};
const Form = createForm(searchBoxConfig.form);
const SearchBox = (props) => {
  const { isNormalSearch, customSearchBox, style, inputStyle } = props;
  if (isNormalSearch) {
    return (
      <TextInput
        style={styled.searchBoxNormal}
        containerInputStyle={styled.searchBoxNormal}
        onChangeText={props?.onChange}
        onBlur={props?.onSubmit}
        autoFocus
        placeholder={props?.placeHolder || ''}
        onSubmitEditting={props?.onSubmit}
      />
    );
  }
  return (
    <Form style={styled.searchBox}>
      <Field
        name={searchBoxConfig.searchBox}
        component={(componentProps) => {
          const { input, ...rest } = componentProps;
          if (customSearchBox) {
            return (
              <BaseTextInputCustom
                onBlur={input?.onBlur}
                onFocus={input?.onFocus}
                value={input?.value}
                autoFocus
                placeholder={props?.title || ''}
                inputProps={{
                  onChangeText: input?.onChange,
                  placeholder: 'Search privacy coins',
                  autFocus: true,
                }}
                maskLabel
                style={style}
                {...rest}
              />
            );
          }
          return (
            <Row centerVertical>
              <TextInput
                onChangeText={input?.onChange}
                onBlur={input?.onBlur}
                onFocus={input?.onFocus}
                value={input?.value}
                autoFocus
                style={inputStyle}
                placeholder={props?.title || ''}
                {...rest}
              />
              {!!input?.value && (
                <TouchableOpacity style={{ paddingLeft: 12 }} onPress={() => input?.onChange && input?.onChange('')}>
                  <CloseIcon />
                </TouchableOpacity>
              )}
            </Row>
          );
        }}
      />
    </Form>
  );
};

SearchBox.defaultProps = {
  isNormalSearch: false,
  customSearchBox: false,
  style: null,
};
SearchBox.propTypes = {
  isNormalSearch: PropTypes.bool,
  title: PropTypes.string.isRequired,
  customSearchBox: PropTypes.bool,
  style: PropTypes.any,
};
export default React.memo(SearchBox);
