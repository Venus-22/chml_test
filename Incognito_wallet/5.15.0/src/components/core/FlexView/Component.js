import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background1};
`;

const FlexView = (props) => {
  const { style, ...rest } = props;
  return (
    <Container {...rest} style={[style]} />
  );
};


FlexView.propTypes = {
  style: PropTypes.any,
};

FlexView.defaultProps = {
  style: null,
};

export default FlexView;
