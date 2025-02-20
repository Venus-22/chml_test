import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, Text } from 'react-native';
import {Text4} from '@components/core/Text';
import _ from 'lodash';
import images from '@src/assets';
import DeviceLog from '@components/DeviceLog/index';
import { openQrScanner } from '@components/QrCodeScanner/index';
import APIService from '@services/api/miner/APIService';
import Util from '@utils/Util';
import ViewUtil, { onClickView } from '@utils/ViewUtil';
import nodeVerified from '@src/assets/images/node/node_verified.png';
import { COLORS } from '@src/styles';
import FONT from '@src/styles/font';
import styles from '../../styles';

export const TAG = 'GetQrcode';
const GetQrcode = React.memo(({ onSuccess, qrCode = '' }) => {
  const [deviceId, setDeviceId] = useState(qrCode);
  const [loading, setLoading] = useState(false);
  const [isPassedValidate, setIdPassedValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const verifyQrcode = onClickView(async (qrcode) => {
    if (!_.isEmpty(qrcode)) {
      setLoading(true);
      DeviceLog.logInfo(`${TAG}-verifyQrcode begin- value = ${qrCode}`);
      const checked = await Util.excuteWithTimeout(APIService.qrCodeCheck({ QRCode: qrcode }), 6).catch(console.log) || {};
      const { data = '', status = -1 } = checked ?? {};
      DeviceLog.logInfo(`${TAG}-verifyQrcode result = ${JSON.stringify(checked)}`);
      const isPassed = _.isEqual(status, 1) || __DEV__;
      setIdPassedValidate(isPassed);
      setDeviceId(qrcode);
      setErrorMessage(isPassed ? '' : data);
      isPassed && onSuccess && onSuccess(qrcode);
      setLoading(false);
    }
  });
  useMemo(() => verifyQrcode(qrCode), [qrCode]);
  const handleQrcode = useCallback(onClickView(() => {
    openQrScanner(async dataReader => {
      if(_.isEmpty(dataReader)) {
        setDeviceId('');
        setIdPassedValidate(false);
        setErrorMessage('Please scan QR code to get a verification code');
      }else{
        setDeviceId(dataReader);
        verifyQrcode(dataReader);
      }
    });
  }), [deviceId]);
  return (
    <>
      <Image style={styles.content_step1} source={images.ic_getstarted_scan_device} />
      {!isPassedValidate ? (
        <TouchableOpacity onPress={handleQrcode}>
          <Image style={styles.content_step1QRCode} source={images.ic_getstarted_qrcode} />
          <Text4 style={styles.step3_text}>Tap to scan</Text4>
        </TouchableOpacity>
      ) : (loading ? ViewUtil.loadingComponent() : (
        <>
          <Image style={styles.nodeVerifiedImage} source={nodeVerified} />
          <Text4 style={[styles.step3_text]}>Hello, Node:</Text4>
        </>
      )
      )}
      {!_.isEmpty(deviceId) ?
        <Text style={[styles.text, { textAlign: 'center', paddingBottom: 2, fontFamily: FONT.NAME.bold }]}>{deviceId}</Text>
        : null}
      {!isPassedValidate && errorMessage !== '' ?
        <Text style={[styles.text, styles.errorText]}>{errorMessage}</Text> : null}
    </>
  );
});

GetQrcode.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  qrCode: PropTypes.string,
};

GetQrcode.defaultProps = {
  qrCode: ''
};

export default GetQrcode;
