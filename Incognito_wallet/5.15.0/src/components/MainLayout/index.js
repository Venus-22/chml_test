import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import {
  ScrollViewBorder,
  LoadingContainer,
  KeyboardAwareScrollView,
  View
} from '@components/core';
import { FlexView2 } from  '@components/core/FlexView';
import { withLayout_2 } from '@components/Layout';
import Header from '@components/Header';
import globalStyled from '@src/theme/theme.styled';
import styles from './style';

const MainLayout = ({
  header,
  children,
  scrollable,
  loading,
  hideBackButton,
  noPadding,
  rightHeader,
  customHeaderTitle,
  onGoBack,
  contentStyle,
  noHeader,
  canSearch,
  keyboardAware,
  noPaddingBottom,
}) => {
  return (
    <FlexView2 style={[noPadding && styles.noPaddingStyle]}>
      {!noHeader && (
        <Header
          canSearch={canSearch}
          title={header}
          hideBackButton={hideBackButton}
          style={noPadding && styles.paddingHeader}
          rightHeader={rightHeader}
          customHeaderTitle={customHeaderTitle}
          onGoBack={onGoBack}
        />
      )}
      {loading ? <LoadingContainer /> :
        scrollable ? !keyboardAware ? (
          <ScrollViewBorder
            paddingBottom={!noPaddingBottom}
            contentContainerStyle={[
              styles.content,
              contentStyle,
            ]}
          >
            {children}
          </ScrollViewBorder>
        ) :  (
          <KeyboardAwareScrollView
            contentContainerStyle={[
              styles.content,
              contentStyle,
            ]}
            fullFlex
          >
            {children}
          </KeyboardAwareScrollView>
        ) : (
          <View
            borderTop
            paddingHorizontal
            style={[
              styles.content,
              contentStyle,
            ]}
          >
            {children}
          </View>
        )
      }
    </FlexView2>
  );
};

MainLayout.propTypes = {
  header: PropTypes.string,
  children: PropTypes.any,
  scrollable: PropTypes.bool,
  loading: PropTypes.bool,
  hideBackButton: PropTypes.bool,
  noPadding: PropTypes.bool,
  rightHeader: PropTypes.any,
  customHeaderTitle: PropTypes.any,
  onGoBack: PropTypes.func,
  contentStyle: PropTypes.any,
  noHeader: PropTypes.bool,
  canSearch: PropTypes.bool,
  keyboardAware: PropTypes.bool,
};

MainLayout.defaultProps = {
  header: '',
  children: null,
  scrollable: false,
  loading: false,
  hideBackButton: false,
  noPadding: false,
  rightHeader: undefined,
  customHeaderTitle: undefined,
  onGoBack: undefined,
  contentStyle: null,
  noHeader: false,
  canSearch: false,
  keyboardAware: false,
};

export default compose(
  withLayout_2,
)(MainLayout);
