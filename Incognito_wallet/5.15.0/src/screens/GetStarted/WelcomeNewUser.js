import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import {
  RoundCornerButton,
  Text,
  TouchableOpacity,
  View,
} from '@src/components/core';
import { COLORS, THEME, UTILS } from '@src/styles';
import { verticalScale } from 'react-native-size-matters';

const scale = UTILS.deviceHeight() < 550 ? 0.4 : 1;

const styles = StyleSheet.create({
  title: {
    marginTop: verticalScale(120 * scale),
    ...THEME.text.boldTextStyleSuperMedium,
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    marginTop: verticalScale(110 * scale),
  },
  buttonText: {
    color: COLORS.white,
  },
  subButton: {
    marginTop: verticalScale(30 * scale),
    textAlign: 'center',
    ...THEME.text.mediumTextMotto,
  },
});

const WelcomeNewUser = ({ onCreate, onImport }) => {
  return (
    <View borderTop fullFlex>
      <Text style={styles.title}>Privacy is freedom.</Text>
      <RoundCornerButton
        style={styles.button}
        titleStyle={styles.buttonText}
        onPress={onCreate}
        title="Create your master key"
      />
      <TouchableOpacity
        onPress={onImport}
      >
        <Text style={styles.subButton}>Restore from phrase</Text>
      </TouchableOpacity>
    </View>
  );
};

WelcomeNewUser.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};

export default WelcomeNewUser;
