import React, { memo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, FONT } from '@src/styles';
import styled from 'styled-components/native';
import { Text, View } from '@components/core';

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 0,
    height: '75%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
  },
  safeScreen: {
    flex: 1,
  },
  title: {
    ...FONT.STYLE.medium,
    fontSize: FONT.SIZE.superMedium,
    lineHeight: FONT.SIZE.superMedium + 10,
    marginBottom: 22,
  },
});

const CustomSafeAreaView = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.background1};
  border-top-left-radius: 24;
  border-top-right-radius: 24;
`;

const ModalBottomSheet = ({
  title,
  headerView,
  contentView,
  customContent,
  style,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}
    >
      <CustomSafeAreaView style={styles.safeScreen}>
        {customContent ? (
          customContent
        ) : (
          <>
            {!!title && <Text style={styles.title}>{title}</Text>}
            {!!headerView && headerView}
            {!!contentView && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {contentView}
              </ScrollView>
            )}
          </>
        )}
      </CustomSafeAreaView>
    </View>
  );
};

ModalBottomSheet.defaultProps = {
  title: undefined,
  customContent: undefined,
  headerView: undefined,
  contentView: undefined,
  style: {},
};

ModalBottomSheet.propTypes = {
  title: PropTypes.string,
  customContent: PropTypes.any,
  headerView: PropTypes.any,
  contentView: PropTypes.any,
  style: PropTypes.any,
};

export default memo(ModalBottomSheet);
