import React, {memo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from '@screens/Node/components/style';
import theme from '@src/styles/theme';
import {Text, TouchableOpacity} from '@components/core';
import { Text4 } from '@components/core/Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '@src/styles';
import linkingService from '@services/linking';
import {CONSTANT_CONFIGS} from '@src/constants';
import { colorsSelector } from '@src/theme';
import { useSelector } from 'react-redux';
import statusStyled from '../NodeStatus/style';

const SlashStatus = ({ device }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const colors = useSelector(colorsSelector);

  const handleOpenLink = () => {
    linkingService.openUrl(`${CONSTANT_CONFIGS.MAIN_WEBSITE}/t/node-unstaking-slashed-read-me-re-stake-guide/14040`,);
  };

  const renderDesc = () => {
    if (device.IsVNode || device.IsFundedUnstaked) {
      return (
        <View style={statusStyled.container}>
          <Text4 style={statusStyled.desc}>
            No worries. <Text4 onPress={handleOpenLink} style={[statusStyled.desc, { textDecorationLine: 'underline', color: COLORS.blue5 }]}>Follow these instructions</Text4> to get back up and running again.
            Your stake has been returned to you. Please check your assets in this keychain, and follow the prompt to convert your coins from v1 to v2 if necessary.
            New
          </Text4>
        </View>
      );
    }

    return (
      <View style={statusStyled.container}>
        <Text4 style={statusStyled.desc}>
          No worries. <Text4 onPress={handleOpenLink} style={[statusStyled.desc, { textDecorationLine: 'underline', color: COLORS.blue5 }]}>Follow these instructions</Text4> to get back up and running again.
        </Text4>
      </View>
    );
  };

  if (!device || !device?.IsSlashing) return null;

  return (
    <>
      <View style={[styles.balanceContainer, theme.MARGIN.marginBottomDefault, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text style={[theme.text.boldTextStyleMedium]}>Status</Text>
        <TouchableOpacity
          style={[{ flexDirection: 'row' }, styles.balanceContainer]}
          onPress={() => setIsExpanded(value => !value)}
        >
          <Text style={[theme.text.boldTextStyleMedium, theme.MARGIN.marginRightDefault]}>Slashed</Text>
          <Ionicons name={isExpanded ? 'ios-arrow-up' : 'ios-arrow-down'} size={25} color={colors.arrowRightIcon} />
        </TouchableOpacity>
      </View>
      {!isExpanded && renderDesc()}
    </>
  );
};

SlashStatus.propTypes = {
  device: PropTypes.object.isRequired
};

export default memo(SlashStatus);
