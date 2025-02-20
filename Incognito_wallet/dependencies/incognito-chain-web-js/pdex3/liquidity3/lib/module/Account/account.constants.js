import {
  STATUS_CODE_SHIELD_DECENTRALIZED,
  STATUS_CODE_SHIELD_CENTRALIZED,
  STATUS_CODE_UNSHIELD_DECENTRALIZED,
  STATUS_CODE_UNSHIELD_CENTRALIZED,
  ADDRESS_TYPE,
  STATUS_CODE_SHIELD_PORTAL,
  STATUS_CODE_UNSHIELD_PORTAL,
  STATUS_STR_SHIELD_PORTAL,
  STATUS_STR_UNSHIELD_PORTAL,
} from "@lib/module/Account/features/History/history.constant";

const TxNormalType = "n"; // normal tx(send and receive coin)
const TxSalaryType = "s"; // salary tx(gov pay salary for block producer)
const TxCustomTokenType = "t"; // token  tx with no supporting privacy
const TxCustomTokenPrivacyType = "tp"; // token  tx with supporting privacy

const CustomTokenInit = 0;
const CustomTokenTransfer = 1;
const TxVersion = 1;

export const TX_TYPE = {
  SEND: 0,
  TRADE: 1,
  PROVIDE: 2,
  STAKE_VNODE: 3,
  UNSTAKE_VNODE: 4,
  WITHDRAW_REWARD_TX: 5,
  INIT_TOKEN: 6,
  BURN: 7,
  RECEIVE: 8,
  CONVERT: 9,
  ADD_LIQUIDITY: 10,
  WITHDRAW_LIQUIDITY: 11,
  WITHDRAW_LIQUIDITY_FEE: 12,
  CONSOLIDATE: 13,
  SHIELD: 99,
  UNSHIELD: 100,
  SHIELDPORTAL: 101,
  UNSHIELDPORTAL: 102,
  MINT_NFT_TOKEN: 103,
  ORDER_LIMIT: 104,
  CANCEL_ORDER_LIMIT: 105,
  SWAP: 106,
  CONTRIBUTE: 107,
  WITHDRAW_CONTRIBUTE: 108,
  WITHDRAW_CONTRIBUTE_REWARD: 109,
  STAKING_INVEST: 110,
  STAKING_WITHDRAW: 111,
  STAKING_WITHDRAW_REWARD: 112,
};

export const TX_TYPE_STR = {
  [TX_TYPE.SEND]: "Send",
  [TX_TYPE.TRADE]: "Send",
  [TX_TYPE.PROVIDE]: "Send",
  [TX_TYPE.STAKE_VNODE]: "Send",
  [TX_TYPE.UNSTAKE_VNODE]: "Send",
  [TX_TYPE.WITHDRAW_REWARD_TX]: "Send",
  [TX_TYPE.INIT_TOKEN]: "Send",
  [TX_TYPE.BURN]: "Send",
  [TX_TYPE.RECEIVE]: "Receive",
  [TX_TYPE.CONVERT]: "Convert",
  [TX_TYPE.SHIELD]: "Shield",
  [TX_TYPE.UNSHIELD]: "Unshield",
  [TX_TYPE.SHIELDPORTAL]: "Shield",
  [TX_TYPE.UNSHIELDPORTAL]: "Unshield",
  [TX_TYPE.CONSOLIDATE]: "Consolidate",
  [TX_TYPE.ADD_LIQUIDITY]: "Send",
  [TX_TYPE.WITHDRAW_LIQUIDITY_FEE]: "Send",
  [TX_TYPE.WITHDRAW_LIQUIDITY]: "Send",
  [TX_TYPE.MINT_NFT_TOKEN]: "Mint nft",
  [TX_TYPE.ORDER_LIMIT]: "Order",
  [TX_TYPE.CANCEL_ORDER_LIMIT]: "Cancel order",
  [TX_TYPE.SWAP]: "Swap",
};

// todo: 0xkraken
// NumUTXO must be 255
// because tx zise is exceed 100kb with NumUTXO = 255
export const MaxInputNumberForDefragment = 30;
const MAX_DEFRAGMENT_TXS = 30;
export const MAX_INPUT_PER_TX = 30;
const DEFAULT_INPUT_PER_TX = 20;
const MaxInfoSize = 512;
export const NUMB_OF_OTHER_PKS = 7;

export const ShardStakingType = 0;
export const BeaconStakingType = 1;
export const StakingAmount = 1750e9;

export const MAX_FEE_PER_TX = 100;

export const LIMIT = 100;

export const TX_STATUS = {
  PROCESSING: -1,
  TXSTATUS_CANCELED: 0,
  TXSTATUS_FAILED: 1,
  TXSTATUS_PENDING: 2,
  TXSTATUS_SUCCESS: 3,
};

export const TX_STATUS_STR = {
  [TX_STATUS.PROCESSING]: "Proccessing",
  [TX_STATUS.TXSTATUS_CANCELED]: "Canceled",
  [TX_STATUS.TXSTATUS_FAILED]: "Failed",
  [TX_STATUS.TXSTATUS_PENDING]: "Pending",
  [TX_STATUS.TXSTATUS_SUCCESS]: "Success",
};

export const AIRDROP_STATUS = {
  FAIL: 0,
  PENDING: 1,
  SUCCESS: 2,
};

export const TIME_COUNT_BALANCE = 20;
export const MAX_COUNT_BALANCE = 8;

export const META_TYPE = {
  63: "Staking",
  127: "Stop Staking",
  210: "Unstaking",
  41: "Return Staking",
  44: "Withdraw Reward Request",
  45: "Withdraw Reward Response",
  244: "Init Token Request",
  245: "Init Token Response",
  90: "Add Liquidity Request",
  95: "Add Liquidity Response",
  91: "Trade Request",
  92: "Trade Response",
  93: "Remove Liquidity Request",
  94: "Remove Liquidity Response",
  205: "Trade Request",
  206: "Trade Response",
  207: "Withdraw Fee Request",
  208: "Withdraw Fee Response",
  209: "Trading Fee Distribution",
  204: "Add Liquidity Request",
  260: "Portal Shield Request",
  261: "Portal Shield Response",
  262: "Portal Unshield Request",
  263: "Portal Unshield Response",
};

export const CONTRIBUTE_STATUS = {
  WAITING: 'waiting',
  MATCHED: 'matched',
  MATCHED_N_RETURNED: 'matchedNReturned',
  REFUND: 'refund',
  FAIL: 'fail',
};

export const CONTRIBUTE_STATUS_STR = {
  PENDING: 'Pending',
  SUCCESSFUL: 'Successfully',
  REFUNDED: 'Refunded',
  PART_REFUNFED: 'part-refunded',
  FAILED: 'Fail',
  WAITING: 'Waiting'
};

export const LIQUIDITY_STATUS = {
  REFUND: ['refund', 'xPoolTradeRefundFee', 'xPoolTradeRefundSellingToken'],
  REJECTED: ['rejected', 'withPRVFeeRejected'],
  ACCEPTED: ['accepted', 'xPoolTradeAccepted', TX_STATUS.TXSTATUS_SUCCESS],
  FAIL: [TX_STATUS.TXSTATUS_FAILED, TX_STATUS.TXSTATUS_CANCELED],
};

export const LIQUIDITY_STATUS_STR = {
  PENDING: 'Pending',
  SUCCESSFUL: 'Successfully',
  REFUNDED: 'Refunded',
  PART_REFUNFED: 'part-refunded',
  FAILED: 'Fail',
  WAITING: 'Waiting'
};

export const CONTRIBUTE_STATUS_TYPE = {
  [TX_STATUS.PROCESSING]: CONTRIBUTE_STATUS.WAITING,
  [TX_STATUS.TXSTATUS_PENDING]: CONTRIBUTE_STATUS.WAITING,
  [TX_STATUS.TXSTATUS_CANCELED]: CONTRIBUTE_STATUS.FAIL,
  [TX_STATUS.TXSTATUS_FAILED]: CONTRIBUTE_STATUS.FAIL,
  [TX_STATUS.TXSTATUS_SUCCESS]: CONTRIBUTE_STATUS.MATCHED,
  [CONTRIBUTE_STATUS.WAITING]: CONTRIBUTE_STATUS.WAITING,
  [CONTRIBUTE_STATUS.MATCHED]: CONTRIBUTE_STATUS.MATCHED,
  [CONTRIBUTE_STATUS.MATCHED_N_RETURNED]: CONTRIBUTE_STATUS.MATCHED_N_RETURNED,
  [CONTRIBUTE_STATUS.REFUND]: CONTRIBUTE_STATUS.REFUND,
  [CONTRIBUTE_STATUS.FAIL]: CONTRIBUTE_STATUS.FAIL,
};

export default {
  TxNormalType,
  TxSalaryType,
  TxCustomTokenType,
  TxCustomTokenPrivacyType,
  CustomTokenInit,
  CustomTokenTransfer,
  TxVersion,
  MaxInputNumberForDefragment,
  MaxInfoSize,
  MAX_INPUT_PER_TX,
  MAX_DEFRAGMENT_TXS,
  DEFAULT_INPUT_PER_TX,
  ShardStakingType,
  BeaconStakingType,
  StakingAmount,
  TX_TYPE,
  TX_TYPE_STR,
  TX_STATUS_STR,
  TX_STATUS,
  AIRDROP_STATUS,
  TIME_COUNT_BALANCE,
  MAX_COUNT_BALANCE,
  STATUS_CODE_SHIELD_DECENTRALIZED,
  STATUS_CODE_SHIELD_CENTRALIZED,
  STATUS_CODE_UNSHIELD_DECENTRALIZED,
  STATUS_CODE_UNSHIELD_CENTRALIZED,
  ADDRESS_TYPE,
  STATUS_CODE_SHIELD_PORTAL,
  STATUS_CODE_UNSHIELD_PORTAL,
  STATUS_STR_SHIELD_PORTAL,
  STATUS_STR_UNSHIELD_PORTAL,
  MAX_FEE_PER_TX,
  CONTRIBUTE_STATUS,
  CONTRIBUTE_STATUS_STR,
  CONTRIBUTE_STATUS_TYPE,
  LIQUIDITY_STATUS,
  LIQUIDITY_STATUS_STR,
};
