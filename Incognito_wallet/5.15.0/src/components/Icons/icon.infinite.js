import React from 'react';
import srcInfiniteIcon from '@src/assets/images/icons/infinite.png';
import PropTypes from 'prop-types';
import { Image1 } from '@components/core';

const InfiniteIcon = ({ style }) => {
  return (
    <Image1
      source={srcInfiniteIcon}
      style={[{ width: 30, height: 14 }, style]}
    />
  );
};

InfiniteIcon.defaultProps = {
  style: null,
};

InfiniteIcon.propTypes = {
  style: PropTypes.any,
};

export default InfiniteIcon;
