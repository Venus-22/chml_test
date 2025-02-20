import { pdexv3 } from "@lib/core/constants";
import { getBurningAddress, PRVIDSTR } from "@lib/core";
import bn from "bn.js";
import { ACCOUNT_CONSTANT, Validator } from "@lib/wallet";
import { MAX_FEE_PER_TX, TX_STATUS } from "@lib/module/Account";

async function createAndSendOrderRequestTx(params) {
  try {
    const {
      transfer: { fee = MAX_FEE_PER_TX, info = "" } = {},
      extra: {
        tokenIDToSell,
        poolPairID,
        sellAmount,
        version,
        minAcceptableAmount,
        tokenIDToBuy,
      },
    } = params;
    new Validator("createAndSendOrderRequestTx-fee", fee).required().amount();
    new Validator("createAndSendOrderRequestTx-info", info).string();
    new Validator("createAndSendOrderRequestTx-tokenIDToSell", tokenIDToSell)
      .required()
      .string();
    new Validator("createAndSendOrderRequestTx-tokenIDToBuy", tokenIDToBuy)
      .required()
      .string();
    new Validator("createAndSendOrderRequestTx-poolPairID", poolPairID)
      .required()
      .string();
    new Validator("createAndSendOrderRequestTx-sellAmount", sellAmount)
      .required()
      .amount();
    new Validator(
      "createAndSendOrderRequestTx-minAcceptableAmount",
      minAcceptableAmount
    )
      .required()
      .amount();
    new Validator("createAndSendOrderRequestTx-version", version)
      .required()
      .number();
    const nftID = await this.getAvailableNFTToken({ version });
    new Validator("createAndSendOrderRequestTx-nftID", nftID)
      .required()
      .string();
    await this.account?.updateProgressTx(10, "Generating Metadata");
    let burningAddress = await getBurningAddress(this.rpc);
    let burningPayments = [
      {
        PaymentAddress: burningAddress,
        Amount: new bn(sellAmount).toString(),
        Message: info,
      },
    ];
    let isToken = tokenIDToSell !== PRVIDSTR;
    let receiver = {};
    // create new OTA for refund
    const receivingTokens = [tokenIDToSell, tokenIDToBuy];
    for (const t of receivingTokens) {
      receiver[t] = await this.getOTAReceive();
    }
    // prepare meta data for tx
    let metadata = {
      PoolPairID: poolPairID,
      SellAmount: sellAmount,
      TokenToSell: tokenIDToSell,
      NftID: nftID,
      Receiver: receiver,
      MinAcceptableAmount: minAcceptableAmount,
      Type: pdexv3.AddOrderRequestMeta,
      TokenIDToBuy: tokenIDToBuy,
    };
    console.log("metadata", metadata);
    let result;
    if (isToken) {
      result = await this.account?.transact({
        transfer: {
          prvPayments: [],
          fee,
          info,
          tokenID: tokenIDToSell,
          tokenPayments: burningPayments,
        },
        extra: {
          metadata,
          version,
          txType: ACCOUNT_CONSTANT.TX_TYPE.ORDER_LIMIT,
        },
      });
    } else {
      result = await this.account?.transact({
        transfer: { prvPayments: burningPayments, fee, info },
        extra: {
          metadata,
          version,
          txType: ACCOUNT_CONSTANT.TX_TYPE.ORDER_LIMIT,
        },
      });
    }
    await this.account?.updateProgressTx(100, "Completed");
    return result;
  } catch (error) {
    throw error;
  }
}

async function createAndSendWithdrawOrderRequestTx(params) {
  try {
    const {
      transfer: { fee = MAX_FEE_PER_TX, info = "" } = {},
      extra: {
        withdrawTokenIDs,
        poolPairID,
        orderID,
        amount,
        version,
        txType,
        nftID,
      },
    } = params;
    new Validator("createAndSendWithdrawOrderRequestTx-fee", fee)
      .required()
      .amount();
    new Validator("createAndSendWithdrawOrderRequestTx-info", info).string();
    new Validator(
      "createAndSendWithdrawOrderRequestTx-withdrawTokenIDs",
      withdrawTokenIDs
    )
      .required()
      .array();
    new Validator("createAndSendWithdrawOrderRequestTx-poolPairID", poolPairID)
      .required()
      .string();
    new Validator("createAndSendWithdrawOrderRequestTx-nftID", nftID)
      .required()
      .string();
    new Validator("createAndSendWithdrawOrderRequestTx-orderID", orderID)
      .required()
      .string();
    new Validator("createAndSendWithdrawOrderRequestTx-amount", amount)
      .required()
      .amount();
    new Validator("createAndSendWithdrawOrderRequestTx-version", version)
      .required()
      .number();
    new Validator("createAndSendWithdrawOrderRequestTx-txType", txType)
      .required()
      .number();
    new Validator("createAndSendWithdrawOrderRequestTx-nftID", nftID)
      .required()
      .string();
    await this.account?.updateProgressTx(10, "Generating Metadata");
    let burningAddress = await getBurningAddress(this.rpc);
    let burningPayments = [
      {
        PaymentAddress: burningAddress,
        Amount: new bn(1).toString(), // burn 1 of NFTID
        Message: info,
      },
    ];
    let receivingTokens = [nftID, ...withdrawTokenIDs];
    let receiver = {};
    for (const t of receivingTokens) {
      receiver[t] = await this.getOTAReceive();
    }
    // prepare meta data for tx
    let metadata = {
      PoolPairID: poolPairID,
      OrderID: orderID,
      Amount: amount,
      NftID: nftID,
      Receiver: receiver,
      Type: pdexv3.WithdrawOrderRequestMeta,
    };
    let result = await this.account?.transact({
      transfer: {
        prvPayments: [],
        tokenPayments: burningPayments,
        tokenID: nftID,
        fee,
        info,
      },
      extra: { metadata, version, txType },
    });
    await this.setWithdrawOrderTx({
      txWithdraw: {
        withdrawTxId: result?.txId,
        status: TX_STATUS.PROCESSING,
        requestTx: orderID,
        txType,
      },
      poolid: poolPairID,
    });
    await this.account?.updateProgressTx(100, "Completed");
    return result;
  } catch (e) {
    throw e;
  }
}

export default {
  createAndSendOrderRequestTx,
  createAndSendWithdrawOrderRequestTx,
};
