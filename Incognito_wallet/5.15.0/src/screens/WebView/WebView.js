import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { View } from '@src/components/core';
import { compose } from 'recompose';
import { withLayout_2 } from '@components/Layout';
import Header from '@components/Header';
import { SearchIcon } from '@src/components/Icons';
import sourceSearchIcon from '@assets/images/icons/search_icon.png';
import PappError from '@screens/PappView/PappError';
import PappView from '@screens/PappView/PappView';
import { containerStyle as styled } from '@screens/PappView/style';
import {useNavigationParam} from 'react-navigation-hooks';
import { View2 } from '@components/core/View';

const Empty = React.memo(() => (
  <View style={styled.emptyContainer}>
    <SearchIcon source={sourceSearchIcon} style={styled.searchIcon} />
    <Text style={styled.desc}>
      {'Enter a URL to start exploring\napps built on Incognito.'}
    </Text>
  </View>
));

const LoadingView = React.memo(() => (
  <View borderTop style={styled.wrapperIndicator}>
    <ActivityIndicator size='large' />
  </View>
));

const WebViewContainer = React.memo(() => {
  const [url, setUrl] = React.useState(useNavigationParam('url'));
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeUrl = (newURL) => {
    if (newURL !== url) setUrl(newURL);
  };

  const renderContent = () => {
    let content;
    if (!url) {
      content = <Empty />;
    } else {
      content = (
        <PappError>
          <PappView
            url={url}
            onLoadEnd={() => setIsLoading(false)}
            onLoadError={() => setIsLoading(false)}
            onChangeUrl={onChangeUrl}
          />
        </PappError>
      );
    }
    return content;
  };

  return (
    <View2 style={styled.container}>
      <Header title={url} />
      {renderContent()}
      {isLoading && (<LoadingView />)}
    </View2>
  );
});

export default compose(
  withLayout_2,
)(WebViewContainer);
