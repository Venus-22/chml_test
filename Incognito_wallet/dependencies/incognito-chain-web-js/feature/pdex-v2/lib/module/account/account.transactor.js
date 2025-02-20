import bn from "bn.js";
import Validator from "@lib/utils/validator";
import { base64Encode, stringToBytes } from "@lib/privacy/utils";
import { CustomError, ErrorObject } from "@lib/common/errorhandler";
import { encryptMessageOutCoin, PRVIDSTR } from "@lib/core";
import { wasm } from "@lib/wasm";
import { checkDecode } from "@lib/common/base58";
import { MAX_FEE_PER_TX, MAX_INPUT_PER_TX } from "./account.constants";
import {
  newParamTxV2,
  prepareInputForTxV2,
  newTokenParamV2,
} from "./account.utils";
import { TX_STATUS } from "./account.constants";

/**
 * @param {PaymentAddress: string, Amount: string, Message: string }} prvPayments
 * @param {number} fee
 * @param {string} info
 * @param {object} metadata
 * @param {boolean} isEncryptMessage
 * @param {function} txHandler
 */
async function createAndSendNativeToken({
  transfer: { prvPayments = [], fee, info = "" },
  extra: {
    metadata = null,
    isEncryptMessage = false,
    txHandler = null,
    txType,
  } = {},
} = {}) {
  new Validator("prvPayments", prvPayments).required().paymentInfoList();
  new Validator("fee", fee).required().amount();
  new Validator("info", info).string();
  new Validator("metadata", metadata).object();
  new Validator("isEncryptMessage", isEncryptMessage).boolean();
  new Validator("txType", txType).required().number();
  await this.updateProgressTx(10, "Encrypting Message");
  const isEncodeOnly = !isEncryptMessage;
  prvPayments = await encryptMessageOutCoin(prvPayments, isEncodeOnly);
  try {
    const tx = await this.transact({
      transfer: { prvPayments, fee, info },
      extra: { metadata, txHandler, txType },
    });
    await this.updateProgressTx(100, "Completed");
    return tx;
  } catch (e) {
    throw e;
  }
}

/**
 *
 * @param {{PaymentAddress: string, Amount: number, Message: string }} prvPayments
 * @param {{PaymentAddress: string, Amount: number, Message: string }} tokenPayments
 * @param {number} fee
 * @param {string} info
 * @param {boolean} tokenID
 * @param {object} metadata
 * @param {boolean} isEncryptMessage
 * @param {boolean} isEncryptMessageToken
 * @param {function} txHandler
 */
async function createAndSendPrivacyToken({
  transfer: { prvPayments = [], tokenPayments = [], fee, info = "", tokenID },
  extra: {
    metadata = null,
    isEncryptMessage = false,
    isEncryptMessageToken = false,
    txHandler = null,
    txType,
  } = {},
}) {
  new Validator("prvPayments", prvPayments).paymentInfoList();
  new Validator("tokenPayments", tokenPayments).required().paymentInfoList();
  new Validator("fee", fee).required().amount();
  new Validator("info", info).string();
  new Validator("tokenID", tokenID).string();
  new Validator("metadata", metadata).object();
  new Validator("isEncryptMessage", isEncryptMessage).boolean();
  new Validator("isEncryptMessageToken", isEncryptMessageToken).boolean();
  new Validator("txType", txType).required().number();
  if (fee < 0) {
    fee = 0;
  }
  await this.updateProgressTx(10, "Encrypting Message");
  let isEncodeOnly = !isEncryptMessage;
  prvPayments = await encryptMessageOutCoin(prvPayments, isEncodeOnly);
  isEncodeOnly = !isEncryptMessageToken;
  tokenPayments = await encryptMessageOutCoin(tokenPayments, isEncodeOnly);
  try {
    let tx = await this.transact({
      transfer: {
        prvPayments,
        fee,
        info,
        tokenID,
        tokenPayments,
      },
      extra: { metadata, txHandler, txType },
    });
    await this.updateProgressTx(100, "Completed");
    return tx;
  } catch (e) {
    throw e;
  }
}

async function transact({
  transfer: {
    prvPayments = null,
    tokenPayments = null,
    fee = MAX_FEE_PER_TX,
    info = "",
    tokenID = PRVIDSTR,
    tokenParams = null,
  } = {},
  extra: { metadata = null, txHandler = null, txType } = {},
}) {
  new Validator("prvPayments", prvPayments).paymentInfoList();
  new Validator("tokenPayments", tokenPayments).paymentInfoList();
  new Validator("fee", fee).required().number();
  new Validator("info", info).string();
  new Validator("tokenID", tokenID).string();
  new Validator("metadata", metadata).object();
  new Validator("tokenParams", tokenParams).object();
  new Validator("txType", txType).required().number();
  console.log(20);
  await this.updateProgressTx(20, "Preparing Your Payments");
  info = base64Encode(stringToBytes(info));
  console.log(info);
  let receiverPaymentAddrStr = new Array(prvPayments.length);
  let totalAmountTransfer = new bn(0);
  for (let i = 0; i < prvPayments.length; i++) {
    receiverPaymentAddrStr[i] = prvPayments[i].paymentAddressStr;
    totalAmountTransfer = totalAmountTransfer.add(
      new bn(prvPayments[i].Amount)
    );
    prvPayments[i].Amount = new bn(prvPayments[i].Amount).toString();
  }
  console.log(30);
  await this.updateProgressTx(30, "Selecting Coins");
  let inputForTx;
  try {
    inputForTx = await prepareInputForTxV2({
      amountTransfer: totalAmountTransfer,
      fee,
      account: this,
      tokenID: PRVIDSTR,
    });
  } catch (e) {
    throw new CustomError(
      ErrorObject.InitNormalTxErr,
      "Error while preparing inputs",
      e
    );
  }
  if (inputForTx.inputCoinStrs.length > MAX_INPUT_PER_TX) {
    throw new CustomError(ErrorObject.TxSizeExceedErr);
  }
  console.log(40);
  await this.updateProgressTx(40, "Packing Parameters");
  let txParams = newParamTxV2(
    this.key,
    prvPayments,
    inputForTx.inputCoinStrs,
    fee,
    null,
    metadata,
    info,
    inputForTx.coinsForRing
  );
  // handle token transfer
  let tokenReceiverPaymentAddrStr = [];
  let totalAmountTokenTransfer = new bn(0);
  let inputForToken = {
    inputCoinStrs: [],
    coinsForRing: {},
  };
  console.log(50);
  await this.updateProgressTx(50, "Adding Token Info");
  // tokenID is non-null when transferring token; tokenParams is non-null when creating new token
  if (!!tokenPayments) {
    let isInit = Boolean(tokenParams);
    let isTransfer = Boolean(tokenID);
    if (!(isInit || isTransfer)) {
      throw new CustomError(
        ErrorObject.InitNormalTxErr,
        "Invalid Token parameters"
      );
    }
    tokenReceiverPaymentAddrStr = new Array(tokenPayments.length);
    for (let i = 0; i < tokenPayments.length; i++) {
      receiverPaymentAddrStr[i] = tokenPayments[i].paymentAddressStr;
      totalAmountTokenTransfer = totalAmountTokenTransfer.add(
        new bn(tokenPayments[i].Amount)
      );
      tokenPayments[i].Amount = new bn(tokenPayments[i].Amount).toString();
    }
    console.log(60);
    await this.updateProgressTx(60, "Selecting Token Coins");
    if (isTransfer) {
      try {
        inputForToken = await prepareInputForTxV2({
          amountTransfer: totalAmountTokenTransfer,
          fee: 0,
          tokenID,
          account: this,
        });
      } catch (e) {
        throw new CustomError(
          ErrorObject.InitNormalTxErr,
          `Error while preparing inputs ${e}`
        );
      }
    }
    console.log(70);
    await this.updateProgressTx(70, "Decorating Parameters");
    tokenParams = newTokenParamV2(
      tokenPayments,
      inputForToken.inputCoinStrs,
      tokenID,
      inputForToken.coinsForRing,
      tokenParams || {}
    );
    txParams.TokenParams = tokenParams;
  }
  let txParamsJson = JSON.stringify(txParams);
  console.log(80);
  await this.updateProgressTx(80, "Signing Transaction");
  console.log("txParamsJson", txParamsJson);
  let theirTime = await this.rpc.getNodeTime();
  console.log('theirTime: ', theirTime)
  let wasmResult = await wasm.createTransaction(txParamsJson, theirTime);
  let { b58EncodedTx, hash, outputs } = JSON.parse(wasmResult);
  console.log('b58EncodedTx: ', b58EncodedTx)
  if (!!hash && typeof txHandler === "function") {
    await txHandler(hash);
  }
  if (!b58EncodedTx || !hash) {
    throw new CustomError(
      ErrorObject.InitNormalTxErr,
      "Can not init transaction transfering"
    );
  }
  let tempBuf = checkDecode(b58EncodedTx).bytesDecoded;
  let theString = String.fromCharCode.apply(null, tempBuf);
  let txObj = JSON.parse(theString);
  txObj.Encoded = b58EncodedTx;
  console.log(90);
  await this.updateProgressTx(90, "Submitting Transaction");
  let tx = {
    txId: hash,
    tx: txObj,
    hash,
    outputs,
    amount: totalAmountTransfer.toString(),
    inputs: inputForTx.inputCoinStrs,
    receivers: receiverPaymentAddrStr,
    tokenID,
    tokenAmount: totalAmountTokenTransfer.toString(),
    tokenInputs: inputForToken.inputCoinStrs,
    tokenReceivers: tokenReceiverPaymentAddrStr,
    isPrivacy: true,
    metadata,
    txType,
    status: TX_STATUS.PROCESSING,
    info,
  };
  await this.saveTxHistory({
    tx,
  });
  let response;
  try {
    response = await this.rpcTxService.apiPushTx({
      rawTx: b58EncodedTx,
    });
    console.log("response", response);
    if (!response) {
      throw new CustomError(
        ErrorObject.FailPushRawTxToPubsub,
        "Can not send transaction",
      );
    }
  } catch (error) {
    throw error;
  }
  // try {
  //   response = await this.send(b58EncodedTx, Boolean(tokenPayments));
  // } catch (e) {
  //   throw new CustomError(ErrorObject.SendTxErr, "Can not send transaction", e);
  // }
  await this.updateProgressTx(95, "Saving Records");
  let taskSpendingCoins = [];
  if (!!inputForTx.inputCoinStrs) {
    taskSpendingCoins.push(
      this.setSpendingCoinsStorage({
        coins: inputForTx.inputCoinStrs,
        tokenId: PRVIDSTR,
      })
    );
  }
  if (!!inputForToken.inputCoinStrs && tokenID !== PRVIDSTR) {
    taskSpendingCoins.push(
      this.setSpendingCoinsStorage({
        coins: inputForToken.inputCoinStrs,
        tokenId: tokenID,
      })
    );
  }
  await Promise.all(taskSpendingCoins);
  console.log("tx", tx.txId);
  return tx;
}

async function send(encodedTx, isToken) {
  new Validator("isToken", isToken).boolean();
  new Validator("encodedTx", encodedTx).required();
  if (this.offlineMode) {
    return { offline: true };
  }
  let response;
  if (isToken) {
    console.log("isToken", isToken);
    response = await this.rpc.sendRawTxCustomTokenPrivacy(encodedTx);
  } else {
    response = await this.rpc.sendRawTx(encodedTx);
  }
  return response;
}

export default {
  createAndSendNativeToken,
  createAndSendPrivacyToken,
  send,
  transact,
};
