import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import AddSolidIcon from '@components/Icons/icon.addSolid';

const styled = StyleSheet.create({
  btnStyle: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
});

const BtnAdd = props => {
  const {btnStyle} = props;
  return (
    <TouchableOpacity style={[styled.btnStyle, btnStyle]} {...props}>
      <AddSolidIcon />
    </TouchableOpacity>
  );
};

BtnAdd.defaultProps = {
  btnStyle: null,
};

BtnAdd.propTypes = {
  btnStyle: PropTypes.any,
};

export default BtnAdd;
