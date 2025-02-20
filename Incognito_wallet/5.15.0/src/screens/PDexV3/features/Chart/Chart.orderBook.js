import { Row } from '@src/components';
import { Tabs, Text } from '@src/components/core';
import { COLORS, FONT } from '@src/styles';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  TAB_ORDER_BOOK,
  ROOT_TAB_SUB_INFO,
  TAB_HISTORY_ID,
} from '@screens/PDexV3/features/OrderLimit';
import { v4 } from 'uuid';
import { actionFetchOrderBook } from './Chart.actions';
import { orderBookSelector } from './Chart.selector';

const styled = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  price: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.small,
    color: COLORS.black,
  },
  volume: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.small,
  },
  label: {
    fontSize: FONT.SIZE.superSmall,
    color: COLORS.colorGrey3,
  },
  wrapperOrder: {
    flex: 1,
    maxWidth: '49%',
  },
  wrapperItem: { justifyContent: 'space-between', marginBottom: 15 },
});

const Item = React.memo((props) => {
  const { priceStr, volumeStr, color, isBuy, isSell, isLabel } = props;
  if (isBuy) {
    if (isLabel) {
      return (
        <Row style={styled.wrapperItem}>
          <Text numberOfLines={1} style={{ ...styled.volume, ...styled.label }}>
            Amount
          </Text>
          <Text numberOfLines={1} style={{ ...styled.price, ...styled.label }}>
            Price
          </Text>
        </Row>
      );
    }
    return (
      <Row style={styled.wrapperItem}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ ...styled.volume }}
        >
          {volumeStr}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ ...styled.price, color }}
        >
          {priceStr}
        </Text>
      </Row>
    );
  }
  if (isSell) {
    if (isLabel) {
      return (
        <Row style={styled.wrapperItem}>
          <Text numberOfLines={1} style={{ ...styled.price, ...styled.label }}>
            Price
          </Text>
          <Text numberOfLines={1} style={{ ...styled.volume, ...styled.label }}>
            Amount
          </Text>
        </Row>
      );
    }
    return (
      <Row style={styled.wrapperItem}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ ...styled.price, color }}
        >
          {priceStr}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ ...styled.volume }}
        >
          {volumeStr}
        </Text>
      </Row>
    );
  }
  return null;
});

export const OrderBook = React.memo(() => {
  const orderBook = useSelector(orderBookSelector);
  const { buy, sell, poolid } = orderBook;
  const dispatch = useDispatch();
  const fetchData = React.useCallback(() => {
    dispatch(actionFetchOrderBook());
  }, []);
  React.useEffect(() => {
    fetchData();
  }, [poolid]);
  if (!poolid) {
    return null;
  }
  return (
    <View style={styled.wrapper}>
      <View style={styled.wrapperOrder}>
        <Item isBuy isLabel />
        {buy.map((o) => (
          <Item {...o} key={o?.txRequest || v4()} isBuy />
        ))}
      </View>
      <View style={styled.wrapperOrder}>
        <Item isSell isLabel />
        {sell.map((o) => (
          <Item {...o} key={o?.txRequest || v4()} isSell />
        ))}
      </View>
    </View>
  );
});

const OrderBookContainer = ({ containerStyled }) => {
  return (
    <View style={[styled.container, containerStyled]}>
      <Tabs rootTabID={ROOT_TAB_SUB_INFO}>
        <View
          tabID={TAB_ORDER_BOOK}
          label="Order book"
          upperCase={false}
          onChangeTab={() => null}
        >
          <OrderBook />
        </View>
        <View tabID="" label="" />
      </Tabs>
    </View>
  );
};

OrderBookContainer.propTypes = {};

export default React.memo(OrderBookContainer);
