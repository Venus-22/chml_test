import { RPCHttpService } from "./rpchttpservice";
import { checkDecode, checkEncode } from "../common/base58";
import { stringToBytes, bytesToString } from "../privacy/utils";
import { ENCODE_VERSION } from "../common/constants";
import { CustomError, ErrorObject, RPCError } from "../common/errorhandler";
import { PRVIDSTR, PDEPOOLKEY } from "../core/constants";

const parseResponse = async (rpcService, method, params = []) => {
  const data = {
    jsonrpc: "1.0",
    method: method,
    params: params,
    id: 1,
  };
  let response;
  try {
    response = await rpcService.postRequest(data);
  } catch (e) {
    throw e;
  }

  if (response.status !== 200) {
    throw new Error("Can't request API " + data.method);
  } else if (response.data.Error) {
    throw new RPCError(method, response.data.Error);
  }

  return response.data.Result;
};

class RpcClient {
  constructor(url, user, password) {
    this.rpcHttpService = new RPCHttpService(url, user, password);
    // function aliases
    this.listTokens = this.listPrivacyCustomTokens;
  }

  getOutputCoin = async (
    paymentAdrr,
    viewingKey = "",
    otaKey,
    tokenID = null,
    toHeight = 0,
    submitted = true
  ) => {
    let data = {
      jsonrpc: "1.0",
      method: submitted ? "listoutputcoinsfromcache" : "listoutputcoins",
      params: [
        0,
        toHeight,
        [
          {
            PaymentAddress: paymentAdrr,
            ReadonlyKey: viewingKey,
            OTASecretKey: otaKey,
            // "StartHeight": toHeight
          },
        ],
      ],
      id: 1,
    };

    if (tokenID != null) {
      data["params"][3] = tokenID;
    }
    // console.debug("Coin Request: ", JSON.stringify(data));
    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }
    // console.log("response is", response)
    if (response.status !== 200) {
      throw new Error("Can't request API get all output coins");
    } else if (response.data.Error) {
      throw response.data.Error;
    }
    // console.log(response.data.Result.Outputs)
    let outCoinsMap = response.data.Result.Outputs;
    let outCoins = [];
    for (let key in outCoinsMap) {
      if (key == paymentAdrr || (viewingKey !== "" && key == viewingKey)) {
        outCoins = outCoinsMap[key];
        break;
      }
    }

    return {
      outCoins: outCoins,
      next: response.data.Result.FromHeight,
    };
  };

  // hasSerialNumber return true if serial number existed in database
  hasSerialNumber = async (paymentAddr, serialNumberStrs, tokenID = null) => {
    const data = {
      jsonrpc: "1.0",
      method: "hasserialnumbers",
      params: [paymentAddr, serialNumberStrs],
      id: 1,
    };

    if (tokenID != null) {
      data["params"][2] = tokenID;
    }

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API check has serial number");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      existed: response.data.Result,
    };
  };

  // hasSNDerivator return true if snd existed in database
  hasSNDerivator = async (paymentAddr, snds, tokenID = null) => {
    const data = {
      jsonrpc: "1.0",
      method: "hassnderivators",
      params: [paymentAddr, snds],
      id: 1,
    };

    if (tokenID != null) {
      data["params"][2] = tokenID;
    }

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API check has serial number derivator");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      existed: response.data.Result,
    };
  };

  // randomCommitmentsProcess randoms list commitment for proving
  randomCommitmentsProcess = async (
    paymentAddr,
    inputCoinStrs,
    tokenID = null
  ) => {
    const data = {
      jsonrpc: "1.0",
      method: "randomcommitments",
      params: [paymentAddr, inputCoinStrs],
      id: 1,
    };

    if (tokenID != null) {
      data["params"][2] = tokenID;
    }

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API random commitments");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    let commitmentStrs = response.data.Result.Commitments;

    // // deserialize commitments
    // let commitments = new Array(commitmentStrs.length);
    // for (let i = 0; i < commitments.length; i++) {
    //   let res = checkDecode(commitmentStrs[i]);

    //   if (res.version !== ENCODE_VERSION) {
    //     throw new Error("Base58 check decode wrong version");
    //   }

    //   commitments[i] = P256.decompress(res.bytesDecoded);
    // }

    return {
      commitmentIndices: response.data.Result.CommitmentIndices,
      commitmentStrs: commitmentStrs,
      myCommitmentIndices: response.data.Result.MyCommitmentIndexs,
    };
  };

  sendRawTx = async (serializedTxJson) => {
    const data = {
      jsonrpc: "1.0",
      method: "sendtransaction",
      params: [serializedTxJson],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API send transaction");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      txId: response.data.Result.TxID,
    };
  };

  // for tx custom token
  sendRawTxCustomToken = async (tx) => {
    // hide private key for signing
    delete tx.sigPrivKey;

    // convert tx to json
    let txJson = JSON.stringify(tx.convertTxCustomTokenToByte());

    let txBytes = stringToBytes(txJson);

    // base58 check encode tx json
    let serializedTxJson = checkEncode(txBytes, ENCODE_VERSION);
    //

    const data = {
      jsonrpc: "1.0",
      method: "sendrawcustomtokentransaction",
      params: [serializedTxJson],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API send custom token transaction");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      txId: response.data.Result.TxID,
    };
  };

  // for tx custom token
  sendRawTxCustomTokenPrivacy = async (serializedTxJson) => {
    const data = {
      jsonrpc: "1.0",
      method: "sendrawprivacycustomtokentransaction",
      params: [serializedTxJson],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error(
        "Can't request API send privacy custom token transaction"
      );
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      txId: response.data.Result.TxID,
    };
  };

  listCustomTokens = async () => {
    const data = {
      jsonrpc: "1.0",
      method: "listcustomtoken",
      params: [],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw new CustomError(
        ErrorObject.GetListCustomTokenErr,
        "Can't request API get custom token list"
      );
    }

    if (response.status !== 200) {
      throw new CustomError(
        ErrorObject.GetListCustomTokenErr,
        "Can't request API get custom token list"
      );
    } else if (response.data.Error) {
      throw new CustomError(
        ErrorObject.GetListCustomTokenErr,
        response.data.Error.Message
      );
    }

    return {
      listCustomToken: response.data.Result.ListCustomToken,
    };
  };

  listPrivacyCustomTokens = async () => {
    const data = {
      jsonrpc: "1.0",
      method: "listprivacycustomtoken",
      params: [],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw new CustomError(
        ErrorObject.GetListPrivacyTokenErr,
        "Can't request API get privacy token list"
      );
    }

    if (response.status !== 200) {
      throw new CustomError(
        ErrorObject.GetListPrivacyTokenErr,
        "Can't request API get privacy token list"
      );
    } else if (response.data.Error) {
      throw new CustomError(
        ErrorObject.GetListPrivacyTokenErr,
        response.data.Error.Message
      );
    }

    let pTokens = response.data.Result.ListCustomToken;
    // decode txinfo for each ptoken
    for (let i = 0; i < pTokens.length; i++) {
      if (pTokens[i].TxInfo !== undefined && pTokens[i].TxInfo !== "") {
        let infoDecode = checkDecode(pTokens[i].TxInfo).bytesDecoded;
        let infoDecodeStr = bytesToString(infoDecode);
        pTokens[i].TxInfo = infoDecodeStr;
      }
    }

    return {
      listPrivacyToken: pTokens,
    };
  };

  getUnspentCustomToken = async (paymentAddrSerialize, tokenIDStr) => {
    const data = {
      jsonrpc: "1.0",
      method: "listunspentcustomtoken",
      params: [paymentAddrSerialize, tokenIDStr],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }
    if (response.data.Result) {
      return {
        listUnspentCustomToken: response.data.Result,
      };
    }
  };

  getEstimateFeePerKB = async (paymentAddrSerialize, tokenIDStr = null) => {
    return {
      unitFee: 10,
    };
  };

  getTransactionByHash = async (txHashStr) => {
    const data = {
      method: "gettransactionbyhash",
      params: [txHashStr],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get transaction by hash");
    } else if (response.data.Result === null && response.data.Error) {
      return {
        isInBlock: false,
        isInMempool: false,
        err: response.data.Error,
      };
    }

    return {
      isInBlock: response.data.Result.IsInBlock,
      isInMempool: response.data.Result.IsInMempool,
      blockHash: response.data.Result.BlockHash,
      err: null,
    };
  };

  getStakingAmount = async (type) => {
    const data = {
      jsonrpc: "1.0",
      method: "getstakingamount",
      params: [type],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw new CustomError(
        ErrorObject.GetStakingAmountErr,
        "Can't request API get staking amount"
      );
    }

    if (response.status !== 200) {
      throw new CustomError(
        ErrorObject.GetStakingAmountErr,
        "Can't request API get staking amount"
      );
    } else if (response.data.Error) {
      throw new CustomError(
        ErrorObject.GetStakingAmountErr,
        response.data.Error.Message || "Can't request API get staking amount"
      );
    }

    return {
      res: Number(response.data.Result),
    };
  };

  getActiveShard = async () => {
    const data = {
      jsonrpc: "1.0",
      method: "getactiveshards",
      params: [],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw new CustomError(
        ErrorObject.GetActiveShardErr,
        "Can't request API get active shard nunber"
      );
    }

    if (response.status !== 200) {
      throw new CustomError(
        ErrorObject.GetActiveShardErr,
        "Can't request API get active shard nunber"
      );
    } else if (response.data.Error) {
      throw new CustomError(
        ErrorObject.GetActiveShardErr,
        response.data.Error.Message ||
          "Can't request API get active shard nunber"
      );
    }

    return {
      shardNumber: parseInt(response.data.Result),
    };
  };

  getMaxShardNumber = async () => {
    const data = {
      jsonrpc: "1.0",
      method: "getmaxshardsnumber",
      params: [],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw new CustomError(
        ErrorObject.GetMaxShardNumberErr,
        "Can't request API get max shard number"
      );
    }

    if (response.status !== 200) {
      throw new CustomError(
        ErrorObject.GetMaxShardNumberErr,
        "Can't request API get max shard number"
      );
    } else if (response.data.Error) {
      throw new CustomError(
        ErrorObject.GetMaxShardNumberErr,
        response.data.Error.Message
      );
    }

    return {
      shardNumber: parseInt(response.data.Result),
    };
  };

  hashToIdenticon = async (hashStrs) => {
    const data = {
      jsonrpc: "1.0",
      method: "hashtoidenticon",
      params: hashStrs,
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw new CustomError(
        ErrorObject.HashToIdenticonErr,
        "Can't request API get image from hash string"
      );
    }

    if (response.status !== 200) {
      throw new CustomError(
        ErrorObject.HashToIdenticonErr,
        "Can't request API get image from hash string"
      );
    } else if (response.data.Error) {
      throw new CustomError(
        ErrorObject.HashToIdenticonErr,
        response.data.Error.Message
      );
    }

    return {
      images: response.data.Result,
    };
  };

  getRewardAmount = async (paymentAddrStr) => {
    const data = {
      jsonrpc: "1.0",
      method: "getrewardamount",
      params: [paymentAddrStr],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get image from hash string");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      rewards: response.data.Result,
    };
  };

  getBeaconBestState = async () => {
    const data = {
      jsonrpc: "1.0",
      method: "getbeaconbeststate",
      params: [],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get beacon best state");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      bestState: response.data.Result,
    };
  };

  getPublicKeyRole = async (publicKey) => {
    const data = {
      jsonrpc: "1.0",
      method: "getpublickeyrole",
      params: [publicKey],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get public key role");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      status: response.data.Result,
    };
  };

  getPDEState = async (beaconHeight) => {
    const data = {
      jsonrpc: "1.0",
      method: "getpdestate",
      params: [
        {
          BeaconHeight: beaconHeight,
        },
      ],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get PDE state");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      state: response.data.Result,
    };
  };

  getPDETradeStatus = async (txId) => {
    const data = {
      id: 1,
      jsonrpc: "1.0",
      method: "getpdetradestatus",
      params: [
        {
          TxRequestIDStr: txId,
        },
      ],
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get PDE state");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      state: response.data.Result,
    };
  };

  getPDEContributionStatus = async (pairId) => {
    const data = {
      id: 1,
      jsonrpc: "1.0",
      method: "getpdecontributionstatus",
      params: [
        {
          ContributionPairID: pairId,
        },
      ],
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API getPDEContributionStatus");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      state: response.data.Result,
    };
  };

  getPDEContributionStatusV2 = async (pairId) => {
    const data = {
      id: 1,
      jsonrpc: "1.0",
      method: "getpdecontributionstatusv2",
      params: [
        {
          ContributionPairID: pairId,
        },
      ],
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API getPDEContributionStatus");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      state: response.data.Result,
    };
  };

  getPDEWithdrawalStatus = async (txId) => {
    const data = {
      id: 1,
      jsonrpc: "1.0",
      method: "getpdewithdrawalstatus",
      params: [
        {
          TxRequestIDStr: txId,
        },
      ],
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API getPDEWithdrawalStatus");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return {
      state: response.data.Result,
    };
  };

  getBlockChainInfo = async () => {
    return parseResponse(this.rpcHttpService, "getblockchaininfo");
  };

  listRewardAmount = async () => {
    return parseResponse(this.rpcHttpService, "listrewardamount");
  };

  getBeaconBestStateDetail = async () => {
    return parseResponse(this.rpcHttpService, "getbeaconbeststatedetail");
  };

  getBeaconHeight = async () => {
    const data = await this.getBlockChainInfo();
    return data.BestBlocks["-1"].Height;
  };

  /**
   *
   * @param {string} tokenIDStr1
   * @param {string} tokenIDStr2, default is PRV
   */
  isExchangeRatePToken = async (tokenIDStr1, tokenIDStr2 = "") => {
    if (tokenIDStr2 === "") {
      tokenIDStr2 = PRVIDSTR;
    }

    const beaconHeight = await this.getBeaconHeight();
    const pdeStateRes = await this.getPDEState(beaconHeight);

    let tokenIDArray = [tokenIDStr1, tokenIDStr2];
    tokenIDArray.sort();

    let keyValue =
      PDEPOOLKEY +
      "-" +
      beaconHeight +
      "-" +
      tokenIDArray[0] +
      "-" +
      tokenIDArray[1];

    if (
      pdeStateRes.state.PDEPoolPairs[keyValue] !== null &&
      pdeStateRes.state.PDEPoolPairs[keyValue] !== undefined
    ) {
      if (
        tokenIDArray[0] == PRVIDSTR &&
        pdeStateRes.state.PDEPoolPairs[keyValue].Token1PoolValue < 10000 * 1e9
      ) {
        return false;
      }

      if (
        tokenIDArray[1] == PRVIDSTR &&
        pdeStateRes.state.PDEPoolPairs[keyValue].Token2PoolValue < 10000 * 1e9
      ) {
        return false;
      }

      return true;
    }
    return false;
  };

  getTransactionByReceiver = async (paymentAdrr, viewingKey) => {
    let data = {
      jsonrpc: "1.0",
      method: "gettransactionbyreceiver",
      params: [
        {
          PaymentAddress: paymentAdrr,
          ReadonlyKey: viewingKey,
        },
      ],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get all output coins");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    let result = response.data.Result;
    return {
      receivedTransactions: result.ReceivedTransactions,
    };
  };

  getListPrivacyCustomTokenBalance = async (privateKey) => {
    const data = {
      jsonrpc: "1.0",
      method: "getlistprivacycustomtokenbalance",
      params: [privateKey],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error(
        "Can't request API get list privacy custom token balance"
      );
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return (
      (response.data.Result && response.data.Result.ListCustomTokenBalance) ||
      []
    );
  };

  getBurningAddress = async (beaconHeight = 0) => {
    const data = {
      jsonrpc: "1.0",
      method: "getburningaddress",
      params: [beaconHeight],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get burning address");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return response.data.Result;
  };

  getNodeTime = async () => {
    const data = await parseResponse(this.rpcHttpService, "getnetworkinfo", "");
    return data.NodeTime;
  };

  // submit some info for a full node to create a burning transaction
  // alternatively, burning transactions can be made right in this client. See transactor.burn
  burnTokenToContract = async (
    privateKey,
    tokenID,
    amount,
    toEthAddress,
    isForContract = true
  ) => {
    let temp = await this.getBeaconBestState();
    const beaconHeight = temp.bestState.BeaconHeight;
    const burnAddr = await this.getBurningAddress(beaconHeight);
    let receivers = {};
    receivers[burnAddr] = amount;
    let method = "createandsendburningrequest";
    if (isForContract) {
      method = "createandsendburningfordeposittoscrequest";
    }
    const data = {
      jsonrpc: "1.0",
      method: method,
      params: [
        privateKey,
        null,
        5,
        -1,
        {
          TokenID: tokenID,
          TokenName: "",
          TokenSymbol: "",
          TokenTxType: 1,
          TokenAmount: amount,
          TokenReceivers: receivers,
          RemoteAddress:
            toEthAddress.length == 40 ? toEthAddress : toEthAddress.slice(2),
          Privacy: true,
          TokenFee: 0,
        },
        "",
        0,
      ],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get burning address");
    } else if (response.data.Error) {
      throw response.data.Error;
    }
    // console.log(response.data.Result);
    return response.data.Result;
  };

  getBurnProof = async (txId, isForContract = true) => {
    let method = "getburnproof";
    if (isForContract) {
      method = "getburnprooffordeposittosc";
    }

    const data = {
      jsonrpc: "1.0",
      method: method,
      params: [txId],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get burning address");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return response.data.Result;
  };

  getOtherCoinsForRing = async (
    paymentAddr,
    numOfCoinsToGet,
    tokenID = null
  ) => {
    const data = {
      jsonrpc: "1.0",
      method: "randomcommitmentsandpublickeys",
      params: [paymentAddr, numOfCoinsToGet],
      id: 1,
    };
    if (tokenID != null) {
      data["params"][2] = tokenID;
    }
    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }
    if (response.status !== 200) {
      throw new Error("Can't request API random commitments");
    } else if (response.data.Error) {
      throw response.data.Error;
    }
    const result = {
      Indexes: response.data.Result.CommitmentIndices,
      Commitments: response.data.Result.Commitments,
      PublicKeys: response.data.Result.PublicKeys,
      AssetTags: response.data.Result.AssetTags,
    };
    return result;
  };

  // submit some info for a full node to create a ETH-bridged-issuing transaction
  // alternatively, issuing transactions can be made right in this client. See transactor.shield
  issueIncToken = async (
    privateKey,
    tokenID,
    ethBlockHash,
    ethDepositProof,
    txIndex
  ) => {
    const data = {
      jsonrpc: "1.0",
      method: "createandsendtxwithissuingethreq",
      params: [
        privateKey,
        null,
        5,
        -1,
        {
          IncTokenID: tokenID,
          BlockHash: ethBlockHash,
          ProofStrs: ethDepositProof,
          TxIndex: txIndex,
        },
      ],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get burning address");
    } else if (response.data.Error) {
      throw response.data.Error;
    }
    // console.log(response.data.Result);
    return response.data.Result;
  };

  submitKey = async (sk) => {
    const data = {
      jsonrpc: "1.0",
      method: "submitkey",
      params: [sk],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get burning address");
    } else if (response.data.Error) {
      throw response.data.Error;
    }

    return response.data.Result;
  };

  getBlockByHash = async (bh) => {
    const data = {
      method: "retrieveblock",
      params: [bh, "1"],
      id: 1,
    };

    let response;
    try {
      response = await this.rpcHttpService.postRequest(data);
    } catch (e) {
      throw e;
    }

    if (response.status !== 200) {
      throw new Error("Can't request API get block by hash");
    } else if (response.data.Result === null && response.data.Error) {
      return {};
    }

    return response.data.Result;
  };
}

export { RpcClient };
