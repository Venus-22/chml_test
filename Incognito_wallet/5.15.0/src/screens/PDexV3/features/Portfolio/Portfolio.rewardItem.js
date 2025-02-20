import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { batch, useDispatch } from 'react-redux';
import { portfolioItemStyled as styles } from '@screens/PDexV3/features/Portfolio/Portfolio.styled';
import TwoTokenImage from '@screens/PDexV3/features/Portfolio/Portfolio.image';
import styled from 'styled-components/native';
import { Row } from '@src/components';
import { Text } from '@components/core';
import { actionToggleModal } from '@components/Modal';
import ModalBottomSheet from '@components/Modal/features/ModalBottomSheet';
import PortfolioModal from '@screens/PDexV3/features/Portfolio/Portfolio.detail';

const CustomTouchableOpacity = styled(TouchableOpacity)`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border4};
`;

const RewardItem = ({ data, isLast, onWithdrawFeeLP }) => {
  const dispatch = useDispatch();
  if (!data) {
    return null;
  }
  const onPress = () => {
    batch(() => {
      dispatch(actionToggleModal({
        visible: true,
        shouldCloseModalWhenTapOverlay: true,
        data: (
          <ModalBottomSheet
            style={{ height: '60%' }}
            customContent={
              <PortfolioModal shareId={data.shareId} onWithdrawFeeLP={onWithdrawFeeLP} showRemove={false} />
            }
          />
        )})
      );
    });
  };
  const { token1, token2, rewardUSDSymbolStr } = data || {};

  return (
    <CustomTouchableOpacity
      style={[styles.container, isLast && { borderBottomWidth: 0, marginBottom: 50 }]}
      onPress={onPress}
      key={data.shareId}
    >
      <Row centerVertical spaceBetween>
        <Row centerVertical>
          <TwoTokenImage iconUrl1={token1.iconUrl} iconUrl2={token2.iconUrl} />
          <Text style={[styles.extraLabel, { marginLeft: 0 }]}>
            {`${token1?.symbol} / ${token2?.symbol}`}
          </Text>
        </Row>
        <Text style={[styles.extraLabel]}>
          {`${rewardUSDSymbolStr}`}
        </Text>
      </Row>
    </CustomTouchableOpacity>
  );
};

RewardItem.propTypes = {
  data: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  onWithdrawFeeLP: PropTypes.func.isRequired
};

export default memo(RewardItem);
