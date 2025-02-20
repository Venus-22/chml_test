import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Row} from '@src/components';
import styles from '@components/RowSpaceText/RowSpaceText.styled';
import { Text, Text3 } from '@components/core';
import {ActivityIndicator, View} from 'react-native';
import styled from 'styled-components/native';

const CustomText = styled(Text)`
  color: ${({ theme }) => theme.grey2}
`;

const RowSpaceText = (props) => {
  const { label, value, loading, style, leftStyle, rightStyle, customLeft, customRight } = props;
  return (
    <Row style={[styles.hookContainer, style]}>
      {customLeft ? customLeft : (
        <Text3 style={[styles.hookLabel, leftStyle]}>{`${label}:`}</Text3>
      )}
      <View style={styles.wrapValue}>
        {
          loading ? (
            <ActivityIndicator size="small" />
          ) : (
            customRight ? customRight : (<CustomText style={[styles.hookValue, rightStyle]} numberOfLines={0}>{value}</CustomText>)
          )
        }
      </View>
    </Row>
  );
};

RowSpaceText.defaultProps = {
  loading: false,
  style: undefined,
  leftStyle: undefined,
  rightStyle: undefined,
  customLeft: undefined,
  customRight: undefined
};
RowSpaceText.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  style: PropTypes.object,
  leftStyle: PropTypes.any,
  rightStyle: PropTypes.any,
  customLeft: PropTypes.any,
  customRight: PropTypes.any,
};


export default memo(RowSpaceText);
