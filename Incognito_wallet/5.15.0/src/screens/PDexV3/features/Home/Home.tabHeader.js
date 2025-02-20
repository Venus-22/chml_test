import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FONT } from '@src/styles';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text, Text3 } from '@components/core';
import { Row } from '@src/components';

export const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.small,
    lineHeight: FONT.SIZE.small + 5,
  },
  desc: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.veryLarge,
    lineHeight: FONT.SIZE.veryLarge + 10,
  },
  wrapLoading: {
    position: 'relative',
    alignItems: 'flex-start',
    paddingTop: 10,
    height: 44
  }
});

const HomeTabHeader = ({ title, desc, loading, rightIcon }) => {
  return (
    <View style={[styled.container]}>
      <Row centerVertical spaceBetween>
        <Text3 style={styled.title}>{title}</Text3>
        {rightIcon}
      </Row>
      {loading ? (
        <View style={styled.wrapLoading}>
          <ActivityIndicator />
        </View>
      ) : (
        <Text style={styled.desc}>{desc}</Text>
      )}
    </View>
  );
};

HomeTabHeader.defaultProps = {
  loading: false
};

HomeTabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  rightIcon: PropTypes.any.isRequired
};

export default React.memo(HomeTabHeader);
