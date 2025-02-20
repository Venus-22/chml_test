import React from 'react';
import { ImageProps } from 'react-native';
import styled from 'styled-components/native';

const StyledImage = styled.Image`
`;

const Image = (props: ImageProps) => <StyledImage {...props} />;

export default Image;
