import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  RoundCornerButton,
} from '@components/core';
import Row from '@src/components/Row';
import Modal from 'react-native-modal';
import {SuccessIcon} from '@components/Icons';
import { useSelector } from 'react-redux';
import { colorsSelector } from '@src/theme/theme.selector';

import styles from './style';

const SuccessModal = (props) => {
  const {
    visible,
    title,
    description,
    buttonTitle,
    extraInfo,
    closeSuccessDialog,
    buttonStyle,
    onSuccess,
    successTitle,
  } = props;
  const colors = useSelector(colorsSelector);

  return (
    <Modal isVisible={visible} overlayStyle={styles.dialog}>
      <View style={[styles.dialogContent]}>
        <SuccessIcon fill={colors.icon1} />
        {!!title && (
          <Text style={[styles.dialogTitle]}>
            {title}
          </Text>
        )}
        {!!description && (
          <Text style={styles.dialogDesc}>
            {description}
          </Text>
        )}
        {!!extraInfo && (
          <Text style={styles.extraInfo}>
            {extraInfo}
          </Text>
        )}
        {onSuccess ? (
          <Row spaceBetween center style={styles.twoButtonWrapper}>
            <RoundCornerButton
              onPress={closeSuccessDialog}
              title={buttonTitle}
              style={[styles.button, buttonStyle, styles.twoButton]}
            />
            <RoundCornerButton
              onPress={onSuccess}
              title={successTitle}
              style={[styles.button, buttonStyle, styles.twoButton]}
            />
          </Row>
        ) : (
          <RoundCornerButton
            onPress={closeSuccessDialog}
            title={buttonTitle}
            style={[styles.button, buttonStyle]}
          />
        )}
      </View>
    </Modal>
  );
};

SuccessModal.defaultProps = {
  buttonTitle: 'OK',
  extraInfo: '',
  buttonStyle: null,
  description: '',
  title: '',
  onSuccess: undefined,
  successTitle: '',
};

SuccessModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  closeSuccessDialog: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  extraInfo: PropTypes.string,
  buttonTitle: PropTypes.string,
  buttonStyle: PropTypes.object,
  successTitle: PropTypes.string,
};

export default SuccessModal;
