import { STORAGE_KEYS } from '@lib/module/Account/features/Liquidity/liquidity';
import { uniqBy } from 'lodash';
import Validator from '@lib/utils/validator';

function createPairId ({ tokenID1, symbol1, tokenID2, symbol2 } = {}) {
  const address = this.getPaymentKey()
  new Validator("createPairId-symbol1", symbol1).required().string();
  new Validator("createPairId-symbol2", symbol2).required().string();
  new Validator("createPairId-tokenID1", tokenID1).required().string();
  new Validator("createPairId-tokenID2", tokenID2).required().string();
  new Validator("createPairId-address", address).required().string();
  const suffixAddress = address.substring(address.length - 5, address.length);
  return `add-${tokenID1}-${symbol1}-${tokenID2}-${symbol2}-${suffixAddress}-${Date.now()}`;
}

function getKeyStoragePairId () {
  const address = this.getPaymentKey()
  new Validator("getKeyStoragePairId-address", address).required().string();
  return `${STORAGE_KEYS.PAIR_ID}-${address}`;
}

async function getAllStoragePairIds () {
  try {
    const key = this.getKeyStoragePairId();
    return uniqBy((await this.getStorage(key) || []), 'pairID');
  } catch (e) {
    throw e;
  }
}

async function setStoragePairId ({ pairID, txId, tokenID }) {
  new Validator("setStoragePairId-pairID", pairID).required().string();
  new Validator("setStoragePairId-txId", txId).string();
  new Validator("setStoragePairId-tokenID", tokenID).string();

  try {
    const key = this.getKeyStoragePairId();
    let pairTxs = (await this.getAllStoragePairIds()) || [];
    const index = pairTxs.findIndex(pair => pair.pairID === pairID);
    if (index === -1) {
      pairTxs.push({
        pairID,
        txID1: txId,
        createTime1: Date.now(),
        tokenIDs: [tokenID]
      })
    } else {
      const pair = pairTxs[index];
      const txID1 = !!pair.txID1 ? pair.txID1 : txId;
      const txID2 = txID1 !== txId ? txId : '';
      pairTxs[index] = {
        ...pair,
        pairID,
        txID1,
        txID2,
        createTime2: Date.now(),
        tokenIDs: (pair.tokenIDs || []).concat(tokenID)
      }
    }
    await this.setStorage(key, pairTxs);
  } catch (e) {
    throw e;
  }
}

function getKeyStorageHistoriesRemovePool() {
  const address = this.getPaymentKey()
  return `${STORAGE_KEYS.STORAGE_HISTORIES_REMOVE_POOL}-${address}`;
}

async function getStorageHistoriesRemovePool() {
  const key = this.getKeyStorageHistoriesRemovePool();
  return (await this.getStorage(key)) || []
}

/**
 *
 * @param {amount} amount1
 * @param {amount} amount2
 * @param {string} tokenID
 * @param {string} requestTx
 * @param {number} status
 * @param {string} tokenId1
 * @param {string} tokenId2
 * @param {number} lockTime
 */
async function setStorageHistoriesRemovePool({
  amount1,
  amount2,
  requestTx,
  status,
  tokenId1,
  tokenId2,
  lockTime
}) {
  new Validator('setStorageHistoriesRemovePool-amount1', amount1).required().amount();
  new Validator('setStorageHistoriesRemovePool-amount2', amount2).required().amount();
  new Validator('setStorageHistoriesRemovePool-requestTx', requestTx).required().string();
  new Validator('setStorageHistoriesRemovePool-tokenId1', tokenId1).required().string();
  new Validator('setStorageHistoriesRemovePool-tokenId2', tokenId2).required().string();
  new Validator('setStorageHistoriesRemovePool-lockTime', lockTime).required().number();
  new Validator('setStorageHistoriesRemovePool-status', status).required();

  const key = this.getKeyStorageHistoriesRemovePool();
  const histories = (await this.getStorageHistoriesRemovePool()) || [];
  const isExist = histories.some(history => requestTx === history?.requestTx)
  if (!isExist) {
    const params = { amount1, amount2, requestTx, status, tokenId1, tokenId2, lockTime };
    histories.push(params)
  }
  await this.setStorage(key, histories)
}

export default {
  createPairId,
  getKeyStoragePairId,
  getAllStoragePairIds,
  setStoragePairId,
  getKeyStorageHistoriesRemovePool,
  getStorageHistoriesRemovePool,
  setStorageHistoriesRemovePool,
};
