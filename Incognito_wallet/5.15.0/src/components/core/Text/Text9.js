import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import styleSheet from './style';

const StyledText = styled.Text`
  color: ${({ theme }) => theme.text9};
`;

const Text9 = ({ style, ...rest }: TextProps) => (
  <StyledText
    {...rest}
    allowFontScaling={false}
    style={[styleSheet.root, style]}
  />
);

export default Text9;
