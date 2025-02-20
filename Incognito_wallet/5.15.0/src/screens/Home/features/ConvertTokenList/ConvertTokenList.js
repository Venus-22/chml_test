import React from 'react';
import { FlatList } from 'react-native';
import { Header, LoadingContainer } from '@src/components';
import { compose } from 'recompose';
import convertTokenListEnhance from '@screens/Home/features/ConvertTokenList/ConvertTokenList.enhance';
import { useDispatch, useSelector } from 'react-redux';
import { convertCoinsDataSelector } from '@screens/Home/features/Convert/Convert.selector';
import { styled } from '@components/Token/Token.styled';
import { NormalText } from '@components/Token/Token';
import { TokenVerifiedIcon } from '@components/Icons';
import { balanceStyled } from '@screens/Wallet/features/Detail/Detail.styled';
import { FONT } from '@src/styles';
import formatUtils from '@utils/format';
import PropTypes from 'prop-types';
import { selectedPrivacySelector } from '@src/redux/selectors';
import BigNumber from 'bignumber.js';
import { ButtonBasic } from '@components/Button';
import isEmpty from 'lodash/isEmpty';
import { ActivityIndicator, Image, Text, TouchableOpacity, View, RefreshControl } from '@components/core';
import { Text4 } from '@components/core/Text';
import noTransaction from '@assets/images/icons/shield.png';
import { styles } from '@screens/Wallet/features/HistoryToken/HistoryToken.empty';
import { withLayout_2 } from '@components/Layout';
import { useNavigation } from 'react-navigation-hooks';
import routeNames from '@routers/routeNames';
import { setSelectedPrivacy } from '@src/redux/actions/selectedPrivacy';
import globalStyled from '@src/theme/theme.styled';

const Item = React.memo(({ item, maxSize, index, loading }) => {
  const navigation = useNavigation();
  const { tokenID, unspentCoins } = item;
  const token = useSelector(selectedPrivacySelector.getPrivacyDataByTokenID)(
    tokenID,
  );
  const dispatch = useDispatch();
  const balance = React.useMemo(() => {
    return unspentCoins.reduce((prev, coin) => {
      return prev.plus(coin.Value);
    }, new BigNumber(0));
  }, [token, unspentCoins]);
  const onPress = async () => {
    await dispatch(setSelectedPrivacy(tokenID));
    navigation.navigate(routeNames.HistoryConvert);
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          index !== 0 && styled.container,
          styled.extraTop,
          styled.row,
          maxSize === index && { marginBottom: 40 },
        ]}
      >
        <View style={styled.column}>
          <View style={{ flexDirection: 'row' }}>
            <NormalText text={token?.name || 'Incognito Token'} style={FONT.TEXT.label} />
            {!!token?.isVerified && <TokenVerifiedIcon />}
          </View>
          {!loading && (
            <Text4
              style={[
                FONT.TEXT.desc,
                { marginTop: 5 },
              ]}
            >
              {`${unspentCoins.length} UTXOS`}
            </Text4>
          )}
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={[
              styled.bottomText,
              FONT.TEXT.label,
              { flex: 1, marginLeft: 20, textAlign: 'right' },
            ]}
          >
            {`${formatUtils.amountFull(balance.toString(), token.pDecimals)} ${
              token.symbol
            }`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
});

const ConvertTokenList = React.memo(
  ({ onNavigateToConvert, onPullRefresh }) => {
    const { coins, isFetching, hasUnspentCoins, isRefreshing } = useSelector(
      convertCoinsDataSelector,
    );

    const renderItem = (data) => (
      <Item
        item={data?.item}
        index={data?.index}
        maxSize={coins.length - 1}
        loading={isRefreshing}
      />
    );

    const renderButton = () => {
      if (!hasUnspentCoins || isRefreshing) return null;
      return (
        <View style={{ height: 80 }}>
          <ButtonBasic
            title="Go to convert screen"
            disabled={!hasUnspentCoins}
            onPress={onNavigateToConvert}
          />
        </View>
      );
    };

    const renderEmptyView = () => (
      <View style={styles.container} borderTop>
        <Image source={noTransaction} style={styles.image} />
        <Text4 style={styles.text}>
          {'Trade some coins to send, \nreceive and hold it anonymously.'}
        </Text4>
      </View>
    );

    const renderContent = () => {
      if (isFetching && !isRefreshing) return <LoadingContainer />;
      if (isEmpty(coins)) return renderEmptyView();
      return (
        <View borderTop paddingHorizontal fullFlex style={[{justifyContent: 'space-between'}]}>
          <FlatList
            refreshControl={(
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onPullRefresh}
              />
            )}
            data={coins}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.tokenID}
          />
          {renderButton()}
        </View>
      );
    };

    return (
      <>
        <Header title="Convert Coins" accountSelectable />
        {renderContent()}
      </>
    );
  },
);

ConvertTokenList.propTypes = {
  onNavigateToConvert: PropTypes.func.isRequired,
  onPullRefresh: PropTypes.func.isRequired,
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  maxSize: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default compose(
  withLayout_2,
  convertTokenListEnhance,
)(ConvertTokenList);
