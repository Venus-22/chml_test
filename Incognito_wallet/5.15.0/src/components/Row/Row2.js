import React from 'react';
import PropTypes from 'prop-types';
import { View2 } from '@components/core/View';
import styles from './style';

const Row2 = ({
  style,
  center,
  children,
  spaceBetween,
  centerVertical
}) => (
  <View2 style={[styles.row, center && styles.center, spaceBetween && styles.spaceBetween, centerVertical && styles.centerVertical, style]}>
    {children}
  </View2>
);

Row2.propTypes = {
  style: PropTypes.object,
  center: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  spaceBetween: PropTypes.bool,
  centerVertical: PropTypes.bool,
};

Row2.defaultProps = {
  style: null,
  center: false,
  spaceBetween: false,
  centerVertical: false
};

export default Row2;
