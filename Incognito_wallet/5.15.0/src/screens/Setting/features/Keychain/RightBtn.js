import React from 'react';
import { StyleSheet } from 'react-native';
import { RoundCornerButton } from '@src/components/core';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@routers/routeNames';
import { THEME } from '@src/styles';
import { useSelector } from 'react-redux';
import { colorsSelector } from '@src/theme/theme.selector';

const styled = StyleSheet.create({
  btn: {
    width: 100,
    height: 35,
    borderRadius: 25
  },
  title: {
    ...THEME.text.mediumText,
    fontSize: 15,
  }
});

const RightBtn = ({ title }) => {
  const navigation = useNavigation();
  const handlePress = React.useCallback(() => {
    navigation.navigate(routeNames.MasterKeys);
  }, []);
  const colors = useSelector(colorsSelector);
  return (
    <RoundCornerButton
      style={[styled.btn, { backgroundColor: colors.background11 }]}
      title={title}
      titleStyle={styled.title}
      onPress={handlePress}
    />
  );
};

export default React.memo(RightBtn);
