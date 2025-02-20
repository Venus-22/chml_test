import React from 'react';
import { ImageProps } from 'react-native';
import styled from 'styled-components/native';

const StyledImage = styled.Image`
  tint-color: ${({ theme }) => theme.image1};
`;

const Image = (props: ImageProps) => <StyledImage {...props} />;

export default Image;
