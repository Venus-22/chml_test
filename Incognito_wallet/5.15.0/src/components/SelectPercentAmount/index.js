import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { COLORS, FONT } from '@src/styles';
import Row from '@src/components/Row';
import { Text, TouchableOpacity } from '@src/components/core';
import { colorsSelector } from '@src/theme';

const styled = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  btnContainer: {
    marginRight: 8,
    height: 32,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  percent: {
    fontSize: FONT.SIZE.superSmall,
    fontFamily: FONT.NAME.regular,
    textAlign: 'center',
    width: '100%',
  },
  btnLastChild: {
    marginRight: 0,
  },
});

const SelectPercentAmount = (props) => {
  const { selected, onPressPercent, lastPercent } = props;
  const {
    size = 4,
    percentBtnColor = COLORS.colorTradeBlue,
    containerStyled,
  } = props;
  const colors = useSelector(colorsSelector);
  const renderMain = () => {
    return [...Array(size)].map((item, index, arr) => {
      const percent = (((index + 1) / size) * 100).toFixed(0);
      const lastChild = index === arr.length - 1;
      const isFilled = Number(percent) === Number(selected);
      const percentStr = `${percent}%`;
      return (
        <TouchableOpacity
          style={[
            {
              flex: 1,
              maxWidth: lastChild ? 'auto' : 56,
            },
            styled.btnContainer,
            lastChild && styled.btnLastChild,
            {
              backgroundColor: isFilled ? percentBtnColor : colors.secondary,
            },
          ]}
          onPress={() => onPressPercent(percent)}
          key={percent}
        >
          <Text
            style={[
              styled.percent,
              { fontFamily: isFilled ? FONT.NAME.medium : FONT.NAME.regular },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`${lastChild ? lastPercent || percentStr : percentStr} `}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  return <Row style={[styled.container, containerStyled]}>{renderMain()}</Row>;
};

SelectPercentAmount.propTypes = {
  size: PropTypes.number.isRequired,
  percentBtnColor: PropTypes.string.isRequired,
  containerStyled: PropTypes.any,
  selected: PropTypes.number.isRequired,
  onPressPercent: PropTypes.func.isRequired,
  lastPercent: PropTypes.string,
};

export default React.memo(SelectPercentAmount);
