import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@src/components/core';
import { BtnCircleBack } from '@components/Button';
import {useNavigation} from 'react-navigation-hooks';
import debounce from 'lodash/debounce';
import globalStyled from '@src/theme/theme.styled';
import { useSelector } from 'react-redux';
import { colorsSelector } from '@src/theme/theme.selector';
import { styled } from './Tabs.styled';
import withTabs from './Tabs.enhance';

const Tabs = (props) => {
  const { renderTabs, styledTabList, styledTabs, useTab1, rightCustom, onGoBack, hideBackButton, defaultTabHeader } = props;
  const { goBack } = useNavigation();
  const handleGoBack = () =>
    typeof onGoBack === 'function' ? onGoBack() : goBack();
  const _handleGoBack = debounce(handleGoBack, 100);
  const colors = useSelector(colorsSelector);
  return (
    <View style={[
      styled.tabs,
      !useTab1 && globalStyled.defaultBorderSection,
      !useTab1 && { backgroundColor: colors.background1 },
      defaultTabHeader && styled.defaultTabHeader,
      styledTabs,
    ]}
    >
      {!hideBackButton && (
        <BtnCircleBack onPress={_handleGoBack} />
      )}
      <View
        style={[
          styled.tabList,
          useTab1 ? styled.tabList1 : styled.tabList,
          styledTabList,
        ]}
      >
        {renderTabs()}
      </View>
      {rightCustom && rightCustom}
    </View>
  );
};

Tabs.defaultProps = {
  styledTabList: null,
  styledTabs: null,
  useTab1: false,
  rightCustom: null,
  onGoBack: null,
  hideBackButton: true,
  defaultTabHeader: false
};

Tabs.propTypes = {
  styledTabList: PropTypes.any,
  styledTabs: PropTypes.any,
  renderTabs: PropTypes.func.isRequired,
  useTab1: PropTypes.func,
  rightCustom: PropTypes.any,
  onGoBack: PropTypes.func,
  hideBackButton: PropTypes.bool,
  defaultTabHeader: PropTypes.bool
};

export default withTabs(React.memo(Tabs));
