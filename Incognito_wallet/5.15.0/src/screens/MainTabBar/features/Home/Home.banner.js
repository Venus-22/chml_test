import React from 'react';
import {ScreenWidth} from '@utils/devices';
import {DEFAULT_PADDING, homeStyled} from '@screens/MainTabBar/MainTabBar.styled';
import {TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {ImageCached} from '@src/components';
import {useSelector} from 'react-redux';
import {bannersSelector} from '@src/redux/selectors/settings';
import linkingService from '@services/linking';

const BANNER_WIDTH = (ScreenWidth - (DEFAULT_PADDING * 2));
const Banner = React.memo(() => {
  const banners = useSelector(bannersSelector) || [];
  const getRatio = (ratio) => {
    const [ratioWidth, ratioHeight] = ratio.split('x');
    const width = (ScreenWidth - (DEFAULT_PADDING * 2));
    const height = (ratioHeight / ratioWidth) * width;
    return {
      width,
      height
    };
  };
  const handleOpenLink = (url) => {
    if (!url) return;
    linkingService.openUrl(url);
  };
  const renderItem = (data) => {
    const item = data.item;
    const { width, height } = getRatio(item.ratio) || {};
    return (
      <TouchableOpacity onPress={() => handleOpenLink(item.path)} activeOpacity={0.7}>
        <ImageCached
          key={`banner-${item.img}`}
          uri={item.img}
          style={{ width: width, height: height, borderRadius: 8 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={homeStyled.wrapBanner}>
      <Carousel
        sliderWidth={BANNER_WIDTH}
        sliderHeight={BANNER_WIDTH}
        itemWidth={BANNER_WIDTH}
        data={banners}
        renderItem={renderItem}
        lockScrollWhileSnapping
        autoplay
        loop
      />
    </View>
  );
});

export default Banner;
