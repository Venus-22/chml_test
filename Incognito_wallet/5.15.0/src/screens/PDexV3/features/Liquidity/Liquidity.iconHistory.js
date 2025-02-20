import React, {memo} from 'react';
import historySrc from '@src/assets/images/new-icons/history-lp.png';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@routers/routeNames';
import PropTypes from 'prop-types';

const styled = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 15,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: -5,
    bottom: -5,
  },
  image: {
    width: 22,
    height: 22
  }
});

const LPHistoryIcon = ({ style }) => {
  const navigation = useNavigation();
  const onPress = () => navigation.navigate(routeNames.LiquidityHistories);
  return (
    <TouchableOpacity style={[styled.container, style]} onPress={onPress}>
      <Image style={styled.image} source={historySrc} />
    </TouchableOpacity>
  );
};

LPHistoryIcon.defaultProps = {
  style: null,
};

LPHistoryIcon.propTypes = {
  style: PropTypes.any
};

export default memo(LPHistoryIcon);
