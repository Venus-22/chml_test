import React, { memo } from 'react';
import { StyleSheet, Modal } from 'react-native';
import { Text, View } from '@components/core';
import { Text4 } from '@components/core/Text';
import PropTypes from 'prop-types';
import { FONT } from '@src/styles';
import { BtnPrimary, BtnSecondary } from '@components/core/Button/Button';
import { colorsSelector } from '@src/theme';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 24,
  },
  wrapContent: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    minHeight: 200,
    justifyContent: 'center',
  },
  title: {
    ...FONT.TEXT.incognitoH5,
    textAlign: 'center',
  },
  subTitle: {
    ...FONT.TEXT.incognitoP1,
    textAlign: 'center',
    marginVertical: 16,
  },
  buttonStyle: {
    height: 50,
    width: '48%',
  },
});

const CONTENT = {
  title: 'Clear history',
  subTitle:
    'This will delete transaction histories from display. Are you sure you want to continue?',
  cancel: 'Cancel',
  accept: 'OK',
};

const RemoveDialog = (props) => {
  const {
    visible,
    onPressCancel,
    onPressAccept,
    title,
    subTitle,
    acceptStr,
    canStr,
    icon,
  } = props;
  const colors = useSelector(colorsSelector);
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.wrapContent}>
          {icon && icon}
          <Text style={[styles.title, { color: colors.grey1 }]}>
            {title || CONTENT.title}
          </Text>
          <Text4 style={[styles.subTitle]}>
            {subTitle || CONTENT.subTitle}
          </Text4>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <BtnSecondary
              onPress={() => onPressAccept()}
              title={acceptStr || CONTENT.accept}
              wrapperStyle={[
                styles.buttonStyle,
                { backgroundColor: colors.grey1, borderColor: 'transparent' },
              ]}
              textStyle={{ color: colors.against }}
            />
            <BtnPrimary
              onPress={() => onPressCancel()}
              title={canStr || CONTENT.cancel}
              wrapperStyle={styles.buttonStyle}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

RemoveDialog.propTypes = {
  visible: PropTypes.bool,
  onPressCancel: PropTypes.func.isRequired,
  onPressAccept: PropTypes.func.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  acceptStr: PropTypes.string,
  icon: PropTypes.element,
};

RemoveDialog.defaultProps = {
  visible: true,
  title: '',
  subTitle: '',
  acceptStr: undefined,
};

export default memo(RemoveDialog);
