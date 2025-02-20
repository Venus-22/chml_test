import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  background-color: ${({ theme }) => theme.background4};
`;

const View4 = (props) => {
  const { style, fullFlex, ...rest } = props;
  return (
    <Container {...rest} style={[style, fullFlex && { flex: 1 }]} />
  );
};

View4.defaultProps = {
  style: null,
  fullFlex: false
};

View4.propTypes = {
  style: PropTypes.object,
  fullFlex: PropTypes.bool
};

export default View4;
