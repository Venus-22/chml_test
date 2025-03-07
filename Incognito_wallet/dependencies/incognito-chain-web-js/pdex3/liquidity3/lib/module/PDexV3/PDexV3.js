import BaseModule from "@lib/module/BaseModule";
import sharePrototype from "./features/Share";
import followPoolsPrototype from "./features/FollowPools";
import swapPrototype from "./features/Swap";
import orderLimitPrototype from "./features/OrderLimit";
import nftTokenPrototype from "./features/NFTToken";
import historyPrototype from "./features/History";
import stakingPrototype from "./features/Staking";
import liquidityPrototype from "./features/Liquidity";

class PDexV3 extends BaseModule {
  constructor() {
    super();
  }
}

Object.assign(
  PDexV3.prototype,
  sharePrototype,
  followPoolsPrototype,
  swapPrototype,
  orderLimitPrototype,
  nftTokenPrototype,
  historyPrototype,
  liquidityPrototype,
  stakingPrototype,
);

export default PDexV3;
