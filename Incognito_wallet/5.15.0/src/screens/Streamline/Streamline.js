import React from 'react';
import Header from '@src/components/Header';
import { BtnQuestionDefault, ButtonBasic } from '@src/components/Button';
import srcQuestion from '@src/assets/images/icons/question_gray.png';
import { LoadingContainer, View, Text, ScrollViewBorder } from '@src/components/core';
import { Text4 } from '@src/components/core/Text';
import LoadingTx from '@src/components/LoadingTx';
import PropTypes from 'prop-types';
import { MAX_NO_INPUT_DEFRAGMENT } from '@screens/Streamline/Streamline.constant';
import {useNavigation} from 'react-navigation-hooks';
import {useSelector} from 'react-redux';
import {selectedPrivacySelector} from '@src/redux/selectors';
import { compose } from 'recompose';
import { withLayout_2 } from '@components/Layout';
import withStreamline from './Streamline.enhance';
import { useStreamLine } from './Streamline.useStreamline';
import { styled } from './Streamline.styled';

const Hook = React.memo((props) => {
  const { title, desc, disabled = false } = props?.data;
  if (disabled) {
    return null;
  }
  return (
    <View style={styled.hook}>
      <Text4 style={styled.hookTitle}>{title}</Text4>
      <Text style={styled.hookDesc}>{desc}</Text>
    </View>
  );
});

const Extra = () => {
  const {
    handleDefragmentNativeCoin,
    hookFactories,
    shouldDisabledForm,
    noUTXOS,
  } = useStreamLine();
  const selectPrivacy = useSelector(selectedPrivacySelector.selectedPrivacy);
  return (
    <>
      <Text4 style={[styled.tooltip, { marginBottom: 30 }]}>
        Consolidate your UTXOs to ensure successful transactions of any amount.
      </Text4>
      <Text4 style={styled.tooltip}>
        There are <Text style={styled.tooltip}>{noUTXOS} UTXOs {selectPrivacy?.symbol}</Text> in this keychain. You can consolidate{' '}
        {noUTXOS} UTXOs {selectPrivacy?.symbol} at a time.
      </Text4>
      <ButtonBasic
        btnStyle={styled.btnStyle}
        title="Consolidate"
        onPress={handleDefragmentNativeCoin}
        disabled={shouldDisabledForm}
      />
      {hookFactories.map((item, id) => (
        <Hook data={item} key={id} />
      ))}
    </>
  );
};

const Empty = React.memo(() => {
  return (
    <View style={styled.emptyContainer}>
      <Text style={styled.emptyTitle}>Consolidation complete.</Text>
      <Text4 style={styled.emptyText}>
        You’re now running at peak efficiency.
      </Text4>
    </View>
  );
});

const Pending = React.memo(() => {
  const { noUTXOS } = useStreamLine();

  if (noUTXOS > MAX_NO_INPUT_DEFRAGMENT) {
    return (
      <View fullFlex paddingHorizontal borderTop>
        <Text style={styled.emptyTitle}>Consolidation in process.</Text>
        <Text4 style={styled.emptyText}>
          Your remaining UTXOs: {noUTXOS}. Please make another
          consolidation after this one is complete.
        </Text4>
      </View>
    );
  }

  return <Empty />;
});

const Streamline = (props) => {
  const { onClearData, handleFetchData } = props;
  const navigation = useNavigation();
  const selectPrivacy = useSelector(selectedPrivacySelector.selectedPrivacy);
  const {
    hasExceededMaxInputPRV,
    handleNavigateWhyStreamline,
    isFetching,
    isFetchingUTXOS,
    isPending
  } = useStreamLine();
  const renderMain = () => {
    if (isFetchingUTXOS) {
      return <LoadingContainer />;
    }
    if (!hasExceededMaxInputPRV) {
      return <Empty />;
    }
    if (isPending) {
      return <Pending />;
    }
    return (
      <ScrollViewBorder style={styled.scrollview}>
        <Extra {...props} />
        {isFetching && <LoadingTx />}
      </ScrollViewBorder>
    );
  };
  return (
    <>
      <Header
        title={`Consolidate ${selectPrivacy?.symbol ? selectPrivacy?.symbol : ''}`}
        customHeaderTitle={(
          <BtnQuestionDefault
            style={styled.questionIcon}
            icon={srcQuestion}
            onPress={handleNavigateWhyStreamline}
          />
        )}
        onGoBack={() => {
          if (isPending) {
            onClearData();
            handleFetchData();
          }
          navigation.goBack();
        }}
      />
      {renderMain()}
    </>
  );
};

Streamline.propTypes = {
  handleFetchData: PropTypes.func.isRequired,
  onClearData: PropTypes.func.isRequired,
};

export default compose(
  withStreamline,
  withLayout_2,
)(Streamline);
