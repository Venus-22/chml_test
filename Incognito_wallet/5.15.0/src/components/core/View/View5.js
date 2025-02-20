import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import globalStyled from '@src/theme/theme.styled';

const Container = styled.View`
  background-color: ${({ theme }) => theme.background5};
`;

const View5 = (props) => {
  const { style, fullFlex, borderTop, paddingHorizontal, ...rest } = props;
  return (
    <Container
      {...rest}
      style={[
        style,
        fullFlex && { flex: 1 },
        borderTop && globalStyled.defaultBorderSection,
        paddingHorizontal && globalStyled.defaultPadding
      ]}
    />
  );
};

View5.defaultProps = {
  style: null,
  fullFlex: false,
  borderTop: false,
  paddingHorizontal: false
};

View5.propTypes = {
  style: PropTypes.object,
  fullFlex: PropTypes.bool,
  borderTop: PropTypes.bool,
  paddingHorizontal: PropTypes.bool
};

export default View5;
