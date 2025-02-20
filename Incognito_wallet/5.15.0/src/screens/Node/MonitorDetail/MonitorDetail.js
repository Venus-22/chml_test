import React, { memo } from 'react';
import { ActivityIndicator, WebView, View } from '@components/core';
import {View2} from '@components/core/View';
import enhance from '@screens/Node/MonitorDetail/MonitorDetail.enhance';
import { Header } from '@src/components';
import BottomBar from '@screens/Node/MonitorDetail/components/BottomBar';
import PropTypes from 'prop-types';
import styles from '@screens/Community/style';

let webviewInstance;
const MonitorDetail = memo((props) => {
  const { url } = props;
  const [loading, setLoading] = React.useState(true);

  const onReload = () => {
    if (!webviewInstance) return;
    webviewInstance?.reload();
  };

  const onGoBack = () => {
    if (!webviewInstance) return;
    webviewInstance?.goBack();
  };

  const onGoForward = () => {
    if (!webviewInstance) return;
    webviewInstance?.goForward();
  };

  const onPappLoaded = () => {
    setLoading(false);
  };

  return (
    <View2 style={styles.container}>
      <Header title="Monitor Detail" />
      <View fullFlex borderTop style={{ overflow: 'hidden' }}>
        <WebView
          ref={(webview) => {
            if (webview?.webViewRef?.current) {
              webviewInstance = webview;
            }
          }}
          containerStyle={{ flex: 1}}
          source={{ uri: url }}
          allowsBackForwardNavigationGestures
          onLoad={(e) => {}}
          bounces
          cacheEnabled={false}
          cacheMode="LOAD_NO_CACHE"
          showsVerticalScrollIndicator={false}
          onLoadEnd={onPappLoaded}
        />
        {loading && <ActivityIndicator style={styles.loading} /> }
      </View>
      
      <BottomBar onReload={onReload} onGoBack={onGoBack} onGoForward={onGoForward} />
    </View2>

  );
});

MonitorDetail.propTypes = {
  url: PropTypes.string.isRequired
};


export default enhance(MonitorDetail);