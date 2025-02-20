import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Text } from '@src/components/core';
import { TradeIconSuccess } from '@src/components/Icons';
import { ButtonTrade } from '@src/components/Button';
import { FONT } from '@src/styles';
import { useSelector, useDispatch } from 'react-redux';
import { actionToggleModal } from '@src/components/Modal';
import { PureModalContent } from '@src/components/Modal/features/PureModal';
import { useNavigation } from 'react-navigation-hooks';
import { colorsSelector } from '@src/theme';
import routeNames from '@src/router/routeNames';
import { Row } from '@src/components';

const styled = StyleSheet.create({
  title: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.superMedium,
    lineHeight: FONT.SIZE.superMedium + 5,
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  desc: {
    ...FONT.TEXT.incognitoP1,
    textAlign: 'center',
    marginBottom: 16,
  },
  sub: {
    ...FONT.TEXT.incognitoP1,
    textAlign: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'column',
  },
});

const TradeSucessModal = (props) => {
  const colors = useSelector(colorsSelector);
  const {
    title,
    desc,
    sub,
    btnTitle = 'Keep trading',
    handleTradeSucesss,
  } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleKeepTrading = () => {
    dispatch(actionToggleModal({ visible: false, data: null }));
    if (typeof handleTradeSucesss === 'function') {
      handleTradeSucesss();
    } else {
      navigation.navigate(routeNames.Trade);
    }
  };
  return (
    <PureModalContent>
      <Row style={styled.row}>
        <TradeIconSuccess />
        <Text style={[styled.title, { color: colors.ctaMain }]}>{title}</Text>
      </Row>
      <Text style={[styled.desc]}>{desc}</Text>
      {sub && (
        <Text style={[styled.sub, { color: colors.subText }]}>{sub}</Text>
      )}
      <ButtonTrade
        btnStyle={{ marginTop: 24, marginBottom: 0 }}
        title={btnTitle}
        onPress={handleKeepTrading}
      />
    </PureModalContent>
  );
};

TradeSucessModal.propTypes = {
  desc: PropTypes.string.isRequired,
  btnColor: PropTypes.string.isRequired,
};

export default React.memo(TradeSucessModal);
