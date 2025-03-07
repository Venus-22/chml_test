import "core-js/stable";
import "regenerator-runtime/runtime";
import {
  Wallet,
  Account,
  DefaultStorage,
  TxHistoryInfo,
  RpcClient,
  PaymentInfo,
  KeyWallet,
  PaymentAddressType,
  CustomTokenTransfer,
  CustomTokenInit,
  PRVIDSTR,
  ENCODE_VERSION,
  FailedTx,
  SuccessTx,
  ConfirmedTx,
  MetaStakingBeacon,
  MetaStakingShard,
  checkEncode,
  getEstimateFee,
  getEstimateFeeForPToken,
  getMaxWithdrawAmount,
  toNanoPRV,
  toPRV,
  getShardIDFromLastByte,
  generateECDSAKeyPair,
  generateBLSKeyPair,
  //
  BurningPBSCRequestMeta,
  BurningRequestMeta,
  BurningPRVERC20RequestMeta,
  BurningPRVBEP20RequestMeta,
  BurningPDEXERC20RequestMeta,
  BurningPDEXBEP20RequestMeta,
  BurningPBSCForDepositToSCRequestMeta,
  BurningPLGRequestMeta,
  BurningPLGForDepositToSCRequestMeta,
  BurningFantomRequestMeta,
  BurningFantomForDepositToSCRequestMeta,
  WithDrawRewardRequestMeta,
  PDEContributionMeta,
  PDEPRVRequiredContributionRequestMeta,
  PDETradeRequestMeta,
  PDECrossPoolTradeRequestMeta,
  PDEWithdrawalRequestMeta,
  PortalV4ShieldingRequestMeta,
  PortalV4ShieldingResponseMeta,
  PortalV4UnshieldRequestMeta,
  PortalV4UnshieldingResponseMeta,
  hybridEncryption,
  hybridDecryption,
  encryptMessageOutCoin,
  decryptMessageOutCoin,
  constants,
  coinChooser,
  newMnemonic,
  newSeed,
  validateMnemonic,
  PrivacyVersion,
  Validator,
  ACCOUNT_CONSTANT,
  byteToHexString,
  hexStringToByte,
  TX_STATUS,
  ErrorObject,
  setShardNumber,
  isPaymentAddress,
  isOldPaymentAddress,
  VerifierTx,
  VERFIER_TX_STATUS,
  gomobileServices,
  RpcHTTPCoinServiceClient,
  PDexV3,
  EXCHANGE_SUPPORTED,
  //
  PANCAKE_CONSTANTS,
  UNI_CONSTANTS,
  CURVE_CONSTANTS,
  WEB3_CONSTANT,
  BSC_CONSTANT,
  loadBackupKey,
  parseStorageBackup,
} from '@lib/wallet';

/**
 * @async perform initialization (load WASM binary etc.)
 */
export const init = async () => {
    // load Go symbols for browser/extension target. See Webpack config webCfg
    await import("@lib/wasm/wasm_exec.js");
    if (!globalThis.__gobridge__?.ready) {
        globalThis.__gobridge__ = {};
        const go = new Go();
        // privacy.wasm is handled by wasm-loader, which outputs a WebAssembly.Instance
        const { default: createInstance } = await import('@privacy-wasm');
        const { instance } = await createInstance(go.importObject);
        go.run(instance);
        globalThis.__gobridge__.ready = true;
    }
};

export {
  Wallet,
  Account,
  DefaultStorage,
  TxHistoryInfo,
  RpcClient,
  PaymentInfo,
  KeyWallet,
  PaymentAddressType,
  CustomTokenTransfer,
  CustomTokenInit,
  PRVIDSTR,
  ENCODE_VERSION,
  FailedTx,
  SuccessTx,
  ConfirmedTx,
  MetaStakingBeacon,
  MetaStakingShard,
  checkEncode,
  getEstimateFee,
  getEstimateFeeForPToken,
  getMaxWithdrawAmount,
  toNanoPRV,
  toPRV,
  getShardIDFromLastByte,
  generateECDSAKeyPair,
  generateBLSKeyPair,
  //
  BurningPBSCRequestMeta,
  BurningRequestMeta,
  BurningPRVERC20RequestMeta,
  BurningPRVBEP20RequestMeta,
  BurningPDEXERC20RequestMeta,
  BurningPDEXBEP20RequestMeta,
  BurningPBSCForDepositToSCRequestMeta,
  BurningPLGRequestMeta,
  BurningPLGForDepositToSCRequestMeta,
  BurningFantomRequestMeta,
  BurningFantomForDepositToSCRequestMeta,
  WithDrawRewardRequestMeta,
  PDEContributionMeta,
  PDEPRVRequiredContributionRequestMeta,
  PDETradeRequestMeta,
  PDECrossPoolTradeRequestMeta,
  PDEWithdrawalRequestMeta,
  PortalV4ShieldingRequestMeta,
  PortalV4ShieldingResponseMeta,
  PortalV4UnshieldRequestMeta,
  PortalV4UnshieldingResponseMeta,
  hybridEncryption,
  hybridDecryption,
  encryptMessageOutCoin,
  decryptMessageOutCoin,
  constants,
  coinChooser,
  newMnemonic,
  newSeed,
  validateMnemonic,
  PrivacyVersion,
  Validator,
  ACCOUNT_CONSTANT,
  byteToHexString,
  hexStringToByte,
  TX_STATUS,
  ErrorObject,
  setShardNumber,
  isPaymentAddress,
  isOldPaymentAddress,
  VerifierTx,
  VERFIER_TX_STATUS,
  gomobileServices,
  RpcHTTPCoinServiceClient,
  PDexV3,
  EXCHANGE_SUPPORTED,
  //
  PANCAKE_CONSTANTS,
  UNI_CONSTANTS,
  CURVE_CONSTANTS,
  WEB3_CONSTANT,
  BSC_CONSTANT,
  loadBackupKey,
  parseStorageBackup,
};

