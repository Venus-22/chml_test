import BigNumber from 'bignumber.js';
import convert from '@src/utils/convert';
import format from '@src/utils/format';
import { getOriginalPairRate } from '@screens/PDexV3';

export const mappingOrderBook = (params) => {
  let result = [];
  try {
    const { data = [], token1, token2, isBuy = false, isSell = false } = params;
    result = data.map(
      ({
        token1Amount: token1Value,
        token2Amount: token2Value,
        token1Remain,
      }) => {
        const priceOriginal = getOriginalPairRate({
          token1,
          token2,
          token1Value,
          token2Value,
        });
        const price = convert.toHumanAmount(priceOriginal, token2?.pDecimals);
        const priceStr = format.amountVer2(priceOriginal, token2?.pDecimals);
        let volumeOriginalAmount = 0,
          volume,
          volumeStr;
        volumeOriginalAmount = token1Remain;
        volume = convert.toHumanAmount(volumeOriginalAmount, token1?.pDecimals);
        volumeStr = format.amountVer2(volumeOriginalAmount, token1?.pDecimals);
        const res = {
          price,
          priceStr,
          volume,
          volumeStr,
        };
        return res;
      },
    );
  } catch (error) {
    console.log('mappingOrderBook-error', error);
  }
  return result;
};
