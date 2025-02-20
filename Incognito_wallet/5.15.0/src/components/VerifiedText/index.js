import { View, Text } from '@src/components/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {generateTestId} from '@utils/misc';
import {WALLET} from '@src/constants/elements';
import { Row } from '@src/components';
import styleSheet from './style';

class VerifiedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { text, isVerified, containerStyle, style, ...textProps } = this.props;

    return (
      <Row style={[styleSheet.container, containerStyle]} centerVertical>
        <Text {...textProps} style={[styleSheet.text, style]} {...generateTestId(WALLET.TOKEN_CODE)}>{text}</Text>
        { isVerified && (
          <View style={styleSheet.verifiedFlagContainer}>
            <Icons style={styleSheet.verifiedFlag} name='check-circle' size={14} />
          </View>
        ) }
      </Row>
    );
  }
}

VerifiedText.defaultProps = {
  text: null,
  isVerified: false,
  containerStyle: null,
  style: null,
};

VerifiedText.propTypes = {
  text: PropTypes.string,
  isVerified: PropTypes.bool,
  containerStyle: PropTypes.object,
  style: PropTypes.object,
};


export default VerifiedText;
