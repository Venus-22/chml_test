import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import styleSheet from './style';

const StyledText = styled.Text`
  color: ${({ theme }) => theme.text7};
`;

const Text7 = ({ style, ...rest }: TextProps) => (
  <StyledText
    {...rest}
    allowFontScaling={false}
    style={[styleSheet.root, style]}
  />
);

export default Text7;
