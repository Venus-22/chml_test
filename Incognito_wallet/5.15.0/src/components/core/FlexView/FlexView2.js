import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const FlexView2 = (props) => {
  const { style, ...rest } = props;
  return (
    <Container {...rest} style={[style]} />
  );
};

FlexView2.defaultProps = {
  style: null,
};

FlexView2.propTypes = {
  style: PropTypes.object,
};

export default FlexView2;
