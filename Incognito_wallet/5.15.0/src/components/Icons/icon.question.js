import React from 'react';
import { StyleSheet } from 'react-native';
import srcQuestionIcon from '@src/assets/images/icons/question.png';
import PropTypes from 'prop-types';
import { Image1 } from '@components/core';

const styled = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

const QuestionIcon = props => {
  const { icon = srcQuestionIcon, style = null } = props;
  return <Image1 source={icon} style={[styled.icon, style]} />;
};

QuestionIcon.propTypes = {
  icon: PropTypes.any,
  style: PropTypes.any,
};

QuestionIcon.defaultProps = {
  icon: undefined,
  style: undefined,
};

export default QuestionIcon;
