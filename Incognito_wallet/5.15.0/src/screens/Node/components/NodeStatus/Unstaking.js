import { Text, View, TouchableOpacity } from '@components/core';
import { Text4 } from '@components/core/Text';
import { COLORS, FONT } from '@src/styles';
import React from 'react';
import linkingService from '@services/linking';
import CONSTANT_URLS from '@src/constants/url';
import styles from './style';

const Unstaking = () => (
  <View style={styles.container}>
    <Text4 style={styles.desc}>This Node will complete the unstaking process the next time it is randomly selected to create blocks. As such, unstaking times will vary. This may take anywhere between 4 hours to 21 days.</Text4>
    <TouchableOpacity onPress={() => linkingService.openCommunityUrl(CONSTANT_URLS.UNSTAKING_PROCESS)}>
      <Text style={{color: COLORS.colorBlue, fontFamily: FONT.NAME.medium, marginVertical: 20}}>
        Learn more about unstaking
      </Text>
    </TouchableOpacity>
  </View>
);

export default React.memo(Unstaking);

