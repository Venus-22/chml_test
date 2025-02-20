import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { colorsSelector } from '@src/theme';
import { ActivityIndicator as RNComponent } from 'react-native';

const ActivityIndicator = (props) => {
  const { size } = props;
  const colors = useSelector(colorsSelector);
  return <RNComponent color={colors.contrast} size={size} {...props} />;
};

ActivityIndicator.propTypes = {
  size: PropTypes.string,
};

ActivityIndicator.defaultProps = {
  size: 'small',
};

export default ActivityIndicator;
