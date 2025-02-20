import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from '@src/components/core';
import { Text4 } from '@src/components/core/Text';
import linkingService from '@src/services/linking';
import IconOpenUrl from '@src/components/Icons/icon.openUrl';
import Header from '@src/components/Header';
import { styled } from './Receipt.styled';
import withReceipt from './Receipt.enhance';

const Hook = ({ label, desc, renderTx = false }) => {
  const handleOpenUrl = () => linkingService.openUrl(desc);
  let renderComponent = () => (
    <View style={styled.hook}>
      <Text4 style={styled.label} ellipsizeMode="middle" numberOfLines={1}>
        {`${label}:`}
      </Text4>
      <Text style={styled.desc} ellipsizeMode="middle" numberOfLines={1}>
        {desc}
      </Text>
      {renderTx && <IconOpenUrl />}
    </View>
  );
  if (renderTx) {
    return (
      <TouchableOpacity onPress={handleOpenUrl}> 
        {renderComponent()}
      </TouchableOpacity>
    );
  }
  return renderComponent();
};

const ReceiptModal = (props) => {
  const { infoFactories, onBack, btnSaveReceiver, title } = props;

  return (
    <>
      <Header onGoBack={onBack} />
      <View borderTop paddingHorizontal fullFlex>
        <Text style={styled.title}>{title}</Text>
        <View style={styled.infoContainer}>
          {infoFactories.map((item, key) =>
            item.disabled ? null : <Hook key={key} {...item} />,
          )}
        </View>
        {btnSaveReceiver}

      </View>
      
    </>
  );
};

Hook.propTypes = {
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

ReceiptModal.defaultProps = {
  btnSaveReceiver: null,
};

ReceiptModal.propTypes = {
  infoFactories: PropTypes.array.isRequired,
  onBack: PropTypes.func.isRequired,
  btnSaveReceiver: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default withReceipt(ReceiptModal);
