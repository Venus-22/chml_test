import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '@src/components/core';
import { View2 } from '@src/components/core/View';
import globalStyled from '@src/theme/theme.styled';
import { colorsSelector } from '@src/theme/theme.selector';
import { useSelector } from 'react-redux';
import Header from '@src/components/Header';
import { COLORS, FONT } from '@src/styles';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { withLayout_2 } from '@src/components/Layout';
import { compose } from 'recompose';
import { TYPES, AddManuallyContext } from './AddManually.enhance';

const styled = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.superMedium,
    lineHeight: FONT.SIZE.superMedium + 4,
    color: COLORS.colorGreyMedium,
  },
  typeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  typesContainer: {
    paddingTop: 20,
  },
});

const Modal = () => {
  const { handlePressChooseType, type, toggleChooseType } = React.useContext(
    AddManuallyContext,
  );
  const colors = useSelector(colorsSelector);

  const renderTypes = () =>
    Object.values(TYPES).map((TYPE) => {
      const selected = type === TYPE.value;
      return (
        <View key={TYPE.value}>
          <TouchableOpacity
            key={TYPE.value}
            onPress={() => handlePressChooseType(TYPE.value)}
            style={styled.typeItem}
          >
            <Text style={[styled.text, selected && {color : colors.contrast}]}>
              {TYPE.label}
            </Text>
            {selected && (
              <FeatherIcons name="check" size={24} color={colors.contrast} />
            )}
          </TouchableOpacity>
        </View>
      );
    });
  return (
    <View2 style={styled.container}>
      <Header title="Select coin type" onGoBack={toggleChooseType} />
      <View borderTop style={[styled.typesContainer, {flex: 1}, globalStyled.defaultPadding2]}>{renderTypes()}</View>
    </View2>
  );
};

Modal.propTypes = {};

export default compose(
  (Comp) => (props) => (
    <Comp {...{ props, containerStyled: { borderRadius: 8 } }} />
  ),
  withLayout_2,
)(Modal);
