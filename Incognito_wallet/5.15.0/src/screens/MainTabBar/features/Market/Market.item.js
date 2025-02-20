import React, {memo} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {ImageCached, Row} from '@src/components';
import {formatPrice} from '@components/Token';
import replace from 'lodash/replace';
import round from 'lodash/round';
import {COLORS, FONT} from '@src/styles';
import {NormalText} from '@components/Token/Token';
import {itemStyled} from '@screens/MainTabBar/features/Market/Market.styled';
import incognito from '@assets/images/new-icons/incognito.png';

const Item = ({ item }) => {
  const { symbol, priceUsd, change = 20, tokenId } = item;
  const balance = React.useMemo(() => {
    const price = priceUsd;
    const isTokenDecrease = change[0] === '-';
    const changeToNumber = Number(replace(change, '-', ''));
    const changeStr = changeToNumber === 0 ? '' : `${isTokenDecrease ? '-' : '+'}${round(changeToNumber, 2)}%`;
    const changeColor = isTokenDecrease ? COLORS.red2 : COLORS.green;
    return {
      price: formatPrice(price),
      changeStr,
      changeColor
    };
  }, [priceUsd]);
  return (
    <Row centerVertical style={itemStyled.wrapItem}>
      <Row centerVertical style={itemStyled.sectionFirst}>
        <ImageCached uri={item.iconUrl} style={itemStyled.icon} defaultImage={incognito} />
        <Text numberOfLines={1} style={itemStyled.blackLabel}>{symbol}</Text>
      </Row>
      <View style={itemStyled.sectionSecond}>
        <NormalText
          text={balance.price}
          hasPSymbol
          style={itemStyled.blackLabel}
          stylePSymbol={[
            itemStyled.blackLabel,
            { fontFamily: FONT.NAME.specialRegular }
          ]}
        />
      </View>
      <View style={itemStyled.sectionThird}>
        <NormalText
          text={balance.changeStr}
          style={itemStyled.blackLabel}
        />
      </View>
    </Row>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    iconUrl: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    priceUsd: PropTypes.number.isRequired,
    change: PropTypes.string,
    tokenId: PropTypes.string.isRequired
  }).isRequired
};

export default memo(Item);
