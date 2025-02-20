import PropTypes from 'prop-types';
import React from 'react';
import { Modal as RNComponent } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { COLORS } from '@src/styles';
import { View2 } from '@components/core/View';
import { useSelector } from 'react-redux';
import { colorsSelector } from '@src/theme/theme.selector';
import { Text, TouchableOpacity, View } from '..';
import styleSheet from './style';

const Modal = ({
  children,
  close,
  headerText,
  transparent,
  containerStyle,
  closeBtnColor,
  closeOnBack,
  isShowHeader,
  ...otherProps
}) => {
  const colors = useSelector(colorsSelector);
  return (
    <RNComponent
      transparent={transparent}
      animationType="fade"
      onRequestClose={closeOnBack && close}
      {...otherProps}
    >
      <SafeAreaView
        style={[
          styleSheet.containerSafeView,
          transparent && { backgroundColor: 'transparent' },
          { backgroundColor: colors.background2 }
        ]}
        forceInset={{ bottom: 'never' }}
      >
        <View style={[styleSheet.container, containerStyle]}>
          {isShowHeader && (close || headerText) && (
            <View2 style={styleSheet.header}>
              <TouchableOpacity onPress={close} style={styleSheet.closeBtn}>
                <Icon
                  name="close"
                  type="material"
                  size={30}
                  color={colors.text1}
                />
              </TouchableOpacity>
              <Text
                style={styleSheet.headerText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {headerText}
              </Text>
            </View2>
          )}

          {children}
        </View>
      </SafeAreaView>
    </RNComponent>
  );
};

Modal.defaultProps = {
  children: null,
  close: null,
  containerStyle: null,
  closeBtnColor: COLORS.white,
  isShowHeader: true,
  transparent: false,
  headerText: null,
  closeOnBack: true,
};

Modal.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func,
  containerStyle: PropTypes.object,
  closeBtnColor: PropTypes.string,
  isShowHeader: PropTypes.bool,
  transparent: PropTypes.bool,
  headerText: PropTypes.string,
  closeOnBack: PropTypes.bool,
};

export default Modal;
