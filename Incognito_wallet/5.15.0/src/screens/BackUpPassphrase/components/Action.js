import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { FONT } from '@src/styles';
import { Text, TouchableOpacity } from '@components/core';
import { Text4 } from '@components/core/Text';

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  label: {
    ...FONT.TEXT.label,
  },
  desc: {
    marginTop: 8,
    ...FONT.TEXT.desc,
  },
});


const Action = ({ label, desc, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <Text4 style={styles.desc}>{desc}</Text4>
    </TouchableOpacity>
  );
};

Action.propTypes = {
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Action;
