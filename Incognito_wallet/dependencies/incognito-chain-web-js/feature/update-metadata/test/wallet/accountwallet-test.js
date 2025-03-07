import {KeyWallet as keyWallet} from "../../lib/wallet/hdwallet";
import {AccountWallet, Wallet} from "../../lib/wallet/wallet";
import {RpcClient} from "../../lib/rpcclient/rpcclient";
import {CustomTokenInit, CustomTokenTransfer} from "../../lib/tx/constants";
import { PaymentAddressType, PRVIDSTR } from "../../lib/wallet/constants";
import {ENCODE_VERSION} from "../../lib/constants";
import {checkEncode} from "../../lib/base58";

// const rpcClient = new RpcClient("https://mainnet.incognito.org/fullnode");
const rpcClient = new RpcClient("https://testnet.incognito.org/fullnode");
// const rpcClient = new RpcClient("http://localhost:9354");
// const rpcClient = new RpcClient("https://dev-test-node.incognito.org");
// const rpcClient = new RpcClient("http://54.39.158.106:9334");

async function sleep(sleepTime) {
  return new Promise(resolve => setTimeout(resolve, sleepTime));
}

async function TestGetRewardAmount() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // HN1 change money
  let senderSpendingKeyStr = "112t8rnX7qWSJFCnGBq4YPHYN2D29NmGowC5RSbuDUC8Kg8ywg6GsPda5xRJMAmzmVKwLevdJNi5XfrqHRWDzSGEg37kbsrcWrAEQatR1UQQ";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // get reward amount
  let response0;
  try {
    response0 = await accountSender.getRewardAmount(false, "");
  } catch (e) {
    console.log(e);
  }
  console.log("REsponse getRewardAmount: ", response0);
}

// TestGetRewardAmount();

async function TestCreateAndSendRewardAmountTx() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // sender key
  let senderSpendingKeyStr = "112t8rnX7qWSJFCnGBq4YPHYN2D29NmGowC5RSbuDUC8Kg8ywg6GsPda5xRJMAmzmVKwLevdJNi5XfrqHRWDzSGEg37kbsrcWrAEQatR1UQQ";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // create and send constant tx
  let response;
  try {
    response = await accountSender.createAndSendWithdrawRewardTx("");
  } catch (e) {
    console.log(e);
  }

  console.log("Response createAndSendWithdrawRewardTx: ", response);
}

// TestCreateAndSendRewardAmountTx();

async function TestBurningRequestTx() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // sender key
  let senderSpendingKeyStr = "112t8rnX7qWSJFCnGBq4YPHYN2D29NmGowC5RSbuDUC8Kg8ywg6GsPda5xRJMAmzmVKwLevdJNi5XfrqHRWDzSGEg37kbsrcWrAEQatR1UQQ";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // create and send burning request tx
  let response0;
  try {
    response0 = await accountSender.createAndSendBurningRequestTx(
      [],
      {
        "Privacy": true,
        "TokenID": "51753277b5066ecbacb9bbb822812b88a3c8272c3d6b563a6a52a7d9e192f436",
        "TokenName": "Rose",
        "TokenSymbol": "Rose",
        "TokenTxType": 1,
        "TokenAmount": 100,
        "TokenReceivers": {"PaymentAddress": "", "Amount": 100}
      },
      0,
      0,
      "d5808Ba261c91d640a2D4149E8cdb3fD4512efe4",
    );
  } catch (e) {
    console.log(e);
  }

  console.log("Response createAndSendBurningRequestTx: ", response0);
}

// TestBurningRequestTx();

async function TestStakerStatus() {
  Wallet.RpcClient = rpcClient;
  // sender key
  let senderSpendingKeyStr = "112t8rnYZr2s7yMuD8V2VtXxEAWPbRjE4ycQbpuQktKADoJYiKxbCxgefjGQG64YbufDPdbTHxhczS8ucQWcXnp84X74PxSW7Kb2VsaSPZ48";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  await sleep(5000);

  // get staker status
  let response0;
  try {
    response0 = await accountSender.stakerStatus();
  } catch (e) {
    console.log(e);
  }

  console.log("REsponse status staker: ", response0);
}

// TestStakerStatus();

async function TestCreateAndSendNativeToken() {
  Wallet.RpcClient = rpcClient;
  await sleep(10000);

  // sender key (private key)
  let senderPrivateKeyStr = "113G5oSiKADearq753S38NMqQA1jKPGxpqJaHkaZk7s6rZHXx3cxQ6RN2gnVTBNDbV32adPuN1aFr5oa5rM9XhWUNjR7LKrKjeLejPxm7uXD";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderPrivateKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // receiver key (payment address)
  let receiverPaymentAddrStr = "12S5gFMbfrPqF76K6WAbq89reUj2PipxqGnS9Zpja1vXZnVT3eNDmMaJd9Rn1ppJT13wgQG8J59Spb3tpVfD1i7sW3mfYSaqtGhp3RS";
  // let receiverKeyWallet = keyWallet.base58CheckDeserialize(receiverPaymentAddrStr);
  // let receiverPaymentAddr = receiverKeyWallet.KeySet.PaymentAddress;

  // get balance

  let balance = await accountSender.getBalance();
  console.log("AAA balance: ", balance);

  let fee = 100;
  let isPrivacy = false;
  let info = "";
  let amountTransfer = balance - fee; // in nano PRV

  let paymentInfosParam = [];
  paymentInfosParam[0] = {
    "paymentAddressStr": receiverPaymentAddrStr,
    "amount": amountTransfer,
    // "message": "A mouse is so cute A mouse is so cute A mouse is so cute A mouse is so cute A mouse is so cute A mouse is so cute A mouse is so cute"
  };

  // create and send PRV
  try {
    let res = await accountSender.createAndSendNativeToken(paymentInfosParam, fee, isPrivacy, info, false);
    console.log('Send tx succesfully with TxID: ', res.txId);
  } catch (e) {
    console.log("Error when send PRV: ", e);
  }
  console.log("Send tx 1 done");
}

// TestCreateAndSendNativeToken();

async function TestCreateAndSendPrivacyTokenInit() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // sender key (private key)
  let senderSpendingKeyStr = "112t8rnjeorQyyy36Vz5cqtfQNoXuM7M2H92eEvLWimiAtnQCSZiP2HXpMW7mECSRXeRrP8yPwxKGuziBvGVfmxhQJSt2KqHAPZvYmM1ZKwR";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
  let senderPaymentAddressStr = senderKeyWallet.base58CheckSerialize(PaymentAddressType);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // payment info for PRV
  let paymentInfos = [];

  // prepare token param for tx privacy token init
  let amountInit = 100000;
  let tokenParams = {
    Privacy: true,
    TokenID: "",
    TokenName: "Rose",
    TokenSymbol: "Rose",
    TokenTxType: CustomTokenInit,
    TokenAmount: amountInit,
    TokenReceivers: [{
      PaymentAddress: senderPaymentAddressStr,
      Amount: amountInit
    }]
  }

  let feePRV = 10;
  let feePToken = 0;
  let hasPrivacyForToken = false;
  let hasPrivacyForNativeToken = false;

  try {
    let res = await accountSender.createAndSendPrivacyToken(paymentInfos, tokenParams, feePRV, feePToken, hasPrivacyForNativeToken, hasPrivacyForToken, "");
    console.log('Send tx succesfully with TxID: ', res.txId);
  } catch (e) {
    console.log("Error when initing ptoken: ", e);
  }
}

// TestCreateAndSendPrivacyTokenInit();

async function TestCreateAndSendPrivacyTokenTransfer() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // sender key (private key)
  let senderSpendingKeyStr = "112t8rnjeorQyyy36Vz5cqtfQNoXuM7M2H92eEvLWimiAtnQCSZiP2HXpMW7mECSRXeRrP8yPwxKGuziBvGVfmxhQJSt2KqHAPZvYmM1ZKwR";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // receivers (payment address)
  let receiverPaymentAddressStr = "12Rwz4HXkVABgRnSb5Gfu1FaJ7auo3fLNXVGFhxx1dSytxHpWhbkimT1Mv5Z2oCMsssSXTVsapY8QGBZd2J4mPiCTzJAtMyCzb4dDcy";
  // let receiverKeyWallet = keyWallet.base58CheckDeserialize(receiverPaymentAddressStr);

  // payment info for PRV
  // let paymentInfos = [{
  //   paymentAddressStr: receiverPaymentAddressStr,
  //   amount: 5,
  //   message: "ABC"
  // }];
  let paymentInfos = [];
  let amountTransfer = 1000;

  // prepare token param for tx custom token init
  let tokenParams = {
    Privacy: true,
    TokenID: "a7668c4648ffdbf3f5e0ec6e324edbaa892da52096af10da6414190712b90d44",
    TokenName: "",
    TokenSymbol: "",
    TokenTxType: CustomTokenTransfer,
    TokenAmount: amountTransfer,
    TokenReceivers: [{
      PaymentAddress: receiverPaymentAddressStr,
      Amount: amountTransfer,
      Message: "ABC"
    }]
  }

  let feePRV = 10;
  let feePToken = 0;
  let hasPrivacyForToken = true;
  let hasPrivacyForPRV = true;

  // try {
    let res =  await accountSender.createAndSendPrivacyToken(paymentInfos, tokenParams, feePRV, feePToken, hasPrivacyForPRV, hasPrivacyForToken, "", true, true);
    console.log('Send tx succesfully with TxID: ', res.txId);
  // } catch (e) {
  //   console.log("Error when transfering ptoken: ", e);
  //   throw e;
  // }

  return;
}

// TestCreateAndSendPrivacyTokenTransfer();


async function TestCreateAndSendStakingTx() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // staker
  let senderSpendingKeyStr = "112t8rnjeorQyyy36Vz5cqtfQNoXuM7M2H92eEvLWimiAtnQCSZiP2HXpMW7mECSRXeRrP8yPwxKGuziBvGVfmxhQJSt2KqHAPZvYmM1ZKwR";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
  let senderPaymentAddressStr = senderKeyWallet.base58CheckSerialize(PaymentAddressType);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  let param = {type: 0};
  let fee = 30;
  let candidatePaymentAddress = senderPaymentAddressStr;
  // let candidateMiningSeedKey = "12VH5z8JCn9B8SyHvB3aYP4ZGr1Wf9Rywx2ZSBe3eQneADzJ3bL";
  let rewardReceiverPaymentAddress = senderPaymentAddressStr;
  let autoReStaking = true;

  let candidateMiningSeedKey = checkEncode(accountSender.key.getMiningSeedKey(), ENCODE_VERSION);

  // create and send staking tx
  try {
    await accountSender.createAndSendStakingTx(param, fee, candidatePaymentAddress, candidateMiningSeedKey, rewardReceiverPaymentAddress, autoReStaking);
  } catch (e) {
    console.log("Error when staking: ", e);
  }
}

// TestCreateAndSendStakingTx();


async function TestCreateAndSendStopAutoStakingTx() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // staker
  let senderSpendingKeyStr = "";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
  let senderPaymentAddressStr = senderKeyWallet.base58CheckSerialize(PaymentAddressType);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  let fee = 5;
  let candidatePaymentAddress = senderPaymentAddressStr;
  let candidateMiningSeedKey = checkEncode(accountSender.key.getMiningSeedKey(), ENCODE_VERSION);

  // create and send staking tx
  try {
    await accountSender.createAndSendStopAutoStakingTx(fee, candidatePaymentAddress, candidateMiningSeedKey);
  } catch (e) {
    console.log("Error when staking: ", e);
  }
}

// TestCreateAndSendStopAutoStakingTx();

async function TestDefragment() {
  await sleep(8000);
  Wallet.RpcClient = rpcClient;
  // sender
  let senderSpendingKeyStr = "112t8ro4JyjNxs1JtGt4HG9s39wY9QDz61H8tXuo28Ufb9HE9Pshqc8pdChjAs8BXEzkam3PaJc7yHfmYJVsc5NG47eTijME4RqfS9JcR1u9";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // create and send defragment tx
  let response;
  try {
    response = await accountSender.defragmentNativeCoin(100, true);
  } catch (e) {
    console.log(e);
  }

  console.log("REsponse defragment: ", response);
}

// TestDefragment();

async function TestFragment() {
  await sleep(10000);
  const senders = [
    '113Hg4ewhksLe3SN5UfMS6AprNVjxjLX1AKNDRkp1vxfZkLbLRfT1iG2Cj8txpJ7PvP6jqwnUHTw1qNyDQTjR9Tx6g1WQK9PQeVJPvGh1TAp',
    '113KHgyWDDSVjP5mp2Sd4Nc4cjopm3WjBHnFgnfYhGzvz8fAMeEj5CWcudzxpr84A6kL923SB9Qh5pxfd7K25mFtYdaiYZnPTR8WiYBszFAo',
    '113G5oSiKADearq753S38NMqQA1jKPGxpqJaHkaZk7s6rZHXx3cxQ6RN2gnVTBNDbV32adPuN1aFr5oa5rM9XhWUNjR7LKrKjeLejPxm7uXD',
    '113DgVBM9RXdmHxmKS6FobrH1UTcVvVknMHjrAZnSCJZpmEkRT9z2KKEV7GaVCmujUomx6tQZfYLiUy1JJRzfoZPwhnijFWEUg1qqUZVPMvu',
    '113MhKk6mnvuheMDXrgZmCmeuvTDaN92YrDVNMgY5L5XDYPm6m2ohNNx5dHsuCdwje1c8WhCvfdU9QskXPFMLJ1etxcEuwAKsyRwjfybQgU1',
    '113iK2Y4DXfFv2D4bjWTpA9VL7QdY89WkzSfzg9jzwANHUAFozVCoj2zpmmucUkY2goN2xnaiNyLe7FnER7jXmYYxjN9Jn6uJNFUjc3GpcwS',
    '113dK4sfCN7qrcfrBMytergECXMyWoJj1QcTJUTd1kin4tfP87xBKr99NkBnHokf9U4vgn1C8zDYYjQpHjpDZ8vbY17K977b53rRQSGwiupT',
    '1137kFVc6NrAzCM4osTpYiyZ7Yup4AKEF7AzT8sLQBKz69PWL18XtUNfqspSWfsTdqVLxATrpAZhRZipbbVryQLpKQwHkFDnuC9vnbNwykYF',
    '112zsr73UXUCNqEUa3tHjUr3CQxCvfDcsYNCC7pdez7CRyvPkynXoH2wgQTYMDoEokSBve1S4Zc9EaTEvdZwzyFbdgiJbpWLvXhqf5GogTHs',
    '113Qr9vH4USFNpNyWoZqQ869sBYzofeBuA7PyQSBxtmrARPCqiGFKPzm2nxpM1UMvSC9EJaKhn6X8bHNxGW6Phm6mDnr75vtaZMnYE65FBfL',
  ];
  Wallet.RpcClient = rpcClient;

  const fragmentAccountKey = '113FavVjd4dEFCqkkdA5TP1HQMWVjczzRx7yprpMPmFuBMJ3gq17ouA6azaj4Hp5aHwNBBq1KpFnaRPoVHET6gPshyJxykgkdHBDKeffNFwt';
  const fragmentSenderKeyWallet = keyWallet.base58CheckDeserialize(fragmentAccountKey);
  fragmentSenderKeyWallet.KeySet.importFromPrivateKey(fragmentSenderKeyWallet.KeySet.PrivateKey);
  const fragmentAccount = new AccountWallet();
  fragmentAccount.key = fragmentSenderKeyWallet;

  let utxos = 0;

  const receivers = [
    '12S6kxWd2ygd6AhuQtmfkDux7EZo4AVL9iro6xgwij55FePNaeymeweFE4MJCejSEKh8Bpjw9WvJEhaVxJby4mQ5o7QW1tB44Lkvcg7',
    '12S3MLa5HfubAXYYz4zapJ3pTDzzpuLWvu4W8nHxY2BHpa1dS1VCHyfCN6PRZh8Akh653AcpuU9fhqYxRRABKNUCtD2LJuoq8nT9y7q',
    '12S1uv3VaT9KaAVdoAzqRZJVtZJoRRRvpY4ZSkJa8WjD9YLtNB5fFpX1zSoPZxacU1CMZwxPGpxUfWepN8N1G6GF25FrT4qyqNj5ojG',
    '12S4sPkKkf2ooWmogoK8fVUbFvsrewLSbBb5sd3gAMmWNikVUHUbYPGWj3tKp1qJKEVekXJsgZ8cxkzcXvzU4kMfP7QkaAkwboXbzwt',
    '12S422ZBpe3MeXbZsHQ1YzUwa6ZhvM78bNhvzEB55CA3SZbmWwAFXKSqT7tqjTxNYKc5SAP7eihkxc6gYfrKZ2mbKEZyQGH74rWprJD',
  ];

  const amountTransfer = 1e5;
  const paymentInfos = receivers.map(item => ({
    "paymentAddressStr": item,
    "amount": amountTransfer,
  }));

  while (utxos < 100) {
    for (const sender of senders) {
      const senderKeyWallet = keyWallet.base58CheckDeserialize(sender);
      senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
      const accountSender = new AccountWallet();
      accountSender.key = senderKeyWallet;

      // create and send PRV
      const res = await accountSender.createAndSendNativeToken(paymentInfos, 100, false, "Fragment", false);
      console.log('Send tx succesfully with TxID: ', res.txId);
    }

    await sleep(120000);
    utxos += 10;
    console.log('NEW UTXOs', utxos)
  }
}

TestFragment();

async function TestSendMultiple() {
  await sleep(10000);
  const masterKey = '112t8roafGgHL1rhAP9632Yef3sx5k8xgp8cwK4MCJsCL1UWcxXvpzg97N4dwvcD735iKf31Q2ZgrAvKfVjeSUEvnzKJyyJD3GqqSZdxN4or';
  Wallet.RpcClient = rpcClient;

  const receivers = [
    '12RqtTDruw2nbxz2rtqHvam2hGmBwPsMUCes6WZGMaUYfXz23E2gRTwA6MAKGzeVZXeRvc7bEk7bvT6BmQ4Ao6c1JwkY5fAxrTqWhzS',
    '12RwX8oHx8uWaUKA7QR24mRRYjZJN9utAD9wyZj72fgawSRoiymHVeH3YZFV1rcxuBrmqGB5dm8VM23UH5MuXq2FHg7WsX2gZNtyAJS',
    '12S5gFMbfrPqF76K6WAbq89reUj2PipxqGnS9Zpja1vXZnVT3eNDmMaJd9Rn1ppJT13wgQG8J59Spb3tpVfD1i7sW3mfYSaqtGhp3RS',
    '12S1Gj97eNmXDx3E35A1rULXmqQPN3oNkgtNLpNYMysERbHBdjJNJ4jUZ7Mab1NExEje8Crztcs8CBP3gCcAQsUAHhHXs21THTRXx1W',
    '12RyDsu2p2y5Rp6fP4GMAdYVDcTycX2f3QVRYjrNSwVKyL6s8QMojT5xVm1mEuo3j6S1Nbk7C6U1rzouxhV63cqGv5v5FQFgtQZFre1',
    '12S25ZFRh7fusQtSWpdUVz9qvbpCKUoZLtZKhKcXCdXfrxAQRUwdU6o3EJ1runKJHEHLFt4se4GQiHFjiy7Ea884wu8z6jn4B3DGBbq',
    '12S2ixNYzczL8b6fMaWY5XTCa19hqzLX7oQJHH8TN9rb7qioVJjPNxA7DXJFYhKMEhpKfcPAsQsRAG1jnS5kgkqJzU3ZXpAEF94FVnW',
    '12S3A1qWz6kng9YRfBmDn9HTNq9sGMhotZEHX2uuK2Qj6ijVALgzKtNr3GotF3BKrDPQYusaxTTXyEuEbDBmee1et7aLKCqQ6mt8rrV',
    '12S49TkrtJPHrPqwXwiKSiv8VeWYVmwVGQCujPV8Veu1jEkyW8YdS2JUM3i3krcFMkaPoEqfcVf8QJPJ8mFtwv1VVSqNPK74ZEM56Dv',
    '12RsLeV5TH4R71qJPWPX6uHht9cKbHY5o5huEeRtA7wB512XddyK2viXQFdMmMpVtKEyp1dd1yWgppdLe8oxFhB3gDQq5Mqyc26abiC',
  ];
  const amount = 100e9;
  const paymentInfos = receivers.map(item => ({
    "paymentAddressStr": item,
    "amount": amount,
  }));

  const senderKeyWallet = keyWallet.base58CheckDeserialize(masterKey);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
  const accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;
  const res = await accountSender.createAndSendNativeToken(paymentInfos, 100, true, "Fragment", false);
  console.log('Send tx succesfully with TxID: ', res.txId);
}

// TestSendMultiple();

async function TestGetBalance() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);

  // sender key (private key)
  let senderPrivateKeyStr = "112t8rnYcipb3f1tZ1nN5H9ekjX5H93pX9zpHNhDZN6UAjkRLSM1nfearhQTBijJufkZSFgRp7y1yvoS38wbG51j6wCX8GL4748Zd4r8u7TG";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderPrivateKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  let tokenID = "4cd7d5c072a888cc1998049e68d0a3e7df51ab3d41755536e7863f98f04b45db";

  // create and send PRV
  try {
    let balance = await accountSender.getBalance(null);
    console.log("balance: ", balance);
  } catch (e) {
    console.log("Error when get balance: ", e);
  }
}

// TestGetBalance();

async function TestGetAllPrivacyTokenBalance() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);

  // sender key (private key)
  let senderPrivateKeyStr = "112t8rnX7qWSJFCnGBq4YPHYN2D29NmGowC5RSbuDUC8Kg8ywg6GsPda5xRJMAmzmVKwLevdJNi5XfrqHRWDzSGEg37kbsrcWrAEQatR1UQQ";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderPrivateKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // create and send PRV
  try {
    let result = await accountSender.getAllPrivacyTokenBalance();
    console.log("result: ", result);
  } catch (e) {
    console.log("Error when get balance: ", e);
  }
}

// TestGetAllPrivacyTokenBalance();

/************************* DEX **************************/

async function TestCreateAndSendPRVContributionTx() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // staker
  let senderSpendingKeyStr = "112t8rnX7qWSJFCnGBq4YPHYN2D29NmGowC5RSbuDUC8Kg8ywg6GsPda5xRJMAmzmVKwLevdJNi5XfrqHRWDzSGEg37kbsrcWrAEQatR1UQQ";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
  // let senderPaymentAddressStr = senderKeyWallet.base58CheckSerialize(PaymentAddressType);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  let fee = 1500000;
  let pdeContributionPairID = "123";
  // let contributorAddressStr = senderPaymentAddressStr;
  let contributedAmount = 100;

  // create and send staking tx
  try {
    await accountSender.createAndSendTxWithNativeTokenContribution(
      fee, pdeContributionPairID, contributedAmount
    );
  } catch (e) {
    console.log("Error when staking: ", e);
  }
}

// TestCreateAndSendPRVContributionTx();

// async function TestCreateAndSendPRVContributionTx() {
//   Wallet.RpcClient = rpcClient;
//   await sleep(5000);
//   // staker
//   let senderSpendingKeyStr = "112t8rnX7qWSJFCnGBq4YPHYN2D29NmGowC5RSbuDUC8Kg8ywg6GsPda5xRJMAmzmVKwLevdJNi5XfrqHRWDzSGEg37kbsrcWrAEQatR1UQQ";
//   let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
//   senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
//   // let senderPaymentAddressStr = senderKeyWallet.base58CheckSerialize(PaymentAddressType);

//   let accountSender = new AccountWallet();
//   accountSender.key = senderKeyWallet;

//   let feeNativeToken = 1500000;
//   let pdeContributionPairID = "123";
//   let contributedAmount = 100;

//   let tokenParam = {
//     TokenID: "51753277b5066ecbacb9bbb822812b88a3c8272c3d6b563a6a52a7d9e192f436",
//     TokenName: "Rose",
//     TokenSymbol: "Rose"
//   }

//   // create and send staking tx
//   try {
//     await accountSender.createAndSendPTokenContributionTx(
//       tokenParam, feeNativeToken, pdeContributionPairID, contributedAmount
//     );
//   } catch (e) {
//     console.log("Error when staking: ", e);
//   }
// }

async function TestCreateAndSendNativeTokenTradeRequestTx() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // staker
  let senderSpendingKeyStr = "112t8rnewVmmbP8poZSRmUvmohTYo2GG5qfmfHhWHZja3tvCLYLWXFwb1LZgFRMN6BA4hXioDqvBUMpajJBiNi7PAmryfAz2eNXiQ1xxvTV7";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
  // let senderPaymentAddressStr = senderKeyWallet.base58CheckSerialize(PaymentAddressType);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  let fee = 5;
  let sellAmount = 1000000000;
  let tokenIDToBuyStr = "b2655152784e8639fa19521a7035f331eea1f1e911b2f3200a507ebb4554387b";
  let minAcceptableAmount = 4943987;
  let tradingFee = 2500000;

  // create and send staking tx
  try {
    let res = await accountSender.createAndSendNativeTokenTradeRequestTx(
      fee, tokenIDToBuyStr, sellAmount, minAcceptableAmount, tradingFee
    );

    console.log("RES: ", res);

    // replace
    // let newFee = fee *2;
    // let newFeePToken = 0 * 2;

    // let response2 =  await accountSender.replaceTx(res.txId, newFee, newFeePToken);
    // console.log("Send tx 2 done : ", response2);
  } catch (e) {
    console.log("Error when trading native token: ", e);
  }
}

// TestCreateAndSendNativeTokenTradeRequestTx();

async function TestCreateAndSendPTokenTradeRequestTx() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // staker
  let senderSpendingKeyStr = "";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
  // let senderPaymentAddressStr = senderKeyWallet.base58CheckSerialize(PaymentAddressType);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  let feePRV = 10;
  let feePToken = 0;
  let sellAmount = 300000000;
  let tokenIDToBuyStr = "0000000000000000000000000000000000000000000000000000000000000004";
  let minAcceptableAmount = 680000000000;
  let tradingFee = 0;

  let tokenParams = {
    Privacy: true,
    TokenID: "716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0",
    TokenName: "",
    TokenSymbol: ""
  }

  // create and send staking tx
  try {
    let res = await accountSender.createAndSendPTokenTradeRequestTx(
      tokenParams, feePRV, feePToken, tokenIDToBuyStr, sellAmount, minAcceptableAmount, tradingFee
    );
    console.log("REs: ", res);

    // replace tx
  //   let newFee = feePRV *2;
  // let newFeePToken = feePToken * 2;
  // let newInfo = "abc";
  // let newMessageForNativeToken = "Incognito-chain";
  // let newMessageForPToken = "Incognito-chain";
  // let isEncryptMessageForPToken = false;
  // let isEncryptMessageForNativeToken = false;

  //   let response2 =  await accountSender.replaceTx(res.txId, newFee, newFeePToken,
  //     newInfo, newMessageForNativeToken, isEncryptMessageForNativeToken, newMessageForPToken, isEncryptMessageForPToken);
  //   console.log("Send tx 2 done : ", response2);
  } catch (e) {
    console.log("Error when trading native token: ", e);
  }
}

// TestCreateAndSendPTokenTradeRequestTx();


async function GetListReceivedTx() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);

  let senderSpendingKeyStr = "";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  let receivedTxs = await accountSender.getReceivedTransaction();
  console.log(JSON.stringify(receivedTxs, null, 2));
}

// GetListReceivedTx();



/******************************** REPLACE TRANSACTION *********************************/
async function TestReplaceNormalTx() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);

  // sender key (private key)
  let senderPrivateKeyStr = "112t8rnX7qWSJFCnGBq4YPHYN2D29NmGowC5RSbuDUC8Kg8ywg6GsPda5xRJMAmzmVKwLevdJNi5XfrqHRWDzSGEg37kbsrcWrAEQatR1UQQ";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderPrivateKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);

  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // receiver key (payment address)
  let receiverPaymentAddrStr = "12S4NL3DZ1KoprFRy1k5DdYSXUq81NtxFKdvUTP3PLqQypWzceL5fBBwXooAsX5s23j7cpb1Za37ddmfSaMpEJDPsnJGZuyWTXJSZZ5";
  // let receiverKeyWallet = keyWallet.base58CheckDeserialize(receiverPaymentAddrStr);
  // let receiverPaymentAddr = receiverKeyWallet.KeySet.PaymentAddress;

  let fee = 5;
  let isPrivacy = true;
  let info = "abc";
  let amountTransfer = 100 * 1e9; // in nano PRV

  let paymentInfosParam = [];
  paymentInfosParam[0] = {
    "paymentAddressStr": receiverPaymentAddrStr,
    "amount": amountTransfer
  };

  // create and send PRV
  let response;
  try {
    response = await accountSender.createAndSendNativeToken(paymentInfosParam, fee, isPrivacy, info);
  } catch (e) {
    console.log("Error when send PRV: ", e);
  }
  console.log("Send tx 1 done: ", response);

  // await sleep(40000);

  // let newFee = fee*2;
  // let newInfo = "test replace tx";
  // let newMessage = "Rose";

  // // replace tx
  // let respone2;
  // try {
  //   respone2 = await accountSender.replaceTx(response.txId, newFee, 0, newInfo, newMessage);
  // } catch (e) {
  //   console.log("Error when replace tx: ", e);
  // }
  // console.log("Send tx 2 done, ", respone2);
}

// TestReplaceNormalTx();

async function TestCreateAndSendReplacePrivacyTokenTransfer() {
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // sender key (private key)
  let senderSpendingKeyStr = "112t8rnX7qWSJFCnGBq4YPHYN2D29NmGowC5RSbuDUC8Kg8ywg6GsPda5xRJMAmzmVKwLevdJNi5XfrqHRWDzSGEg37kbsrcWrAEQatR1UQQ";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
  let senderPaymentAddressStr = senderKeyWallet.base58CheckSerialize(PaymentAddressType);


  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  // receivers (payment address)
  let receiverPaymentAddressStr = "12Ryp47jXJfkz5Cketp4D9U7uTH4hFgFUVUEzq6k5ikvAZ94JucsYbi235siCMud5GdtRi1DoSecsTD2nkiic9TH7YNkLEoEhrvxvwt";
  // let receiverKeyWallet = keyWallet.base58CheckDeserialize(receiverPaymentAddressStr);

  // payment info for PRV
  let paymentInfos = [{
    paymentAddressStr: receiverPaymentAddressStr,
    amount: 5,
    message: "ABC"
  }];
  // let paymentInfos = [];
  let amountTransfer = 5;
  // prepare token param for tx custom token init
  let tokenParams = {
    Privacy: true,
    TokenID: "6856a8f22c3660d87ee7c5da914e4452ab245c07ecc4c3bae08ab3e0c67f81bd",
    TokenName: "D",
    TokenSymbol: "D",
    TokenTxType: CustomTokenTransfer,
    TokenAmount: amountTransfer,
    TokenReceivers: [{
      PaymentAddress: receiverPaymentAddressStr,
      Amount: amountTransfer,
      Message: "ABC"
    }]
  }

  let feePRV = 5;
  let feePToken = 0;
  let hasPrivacyForToken = true;
  let hasPrivacyForPRV = true;

  // try {
  let response1 =  await accountSender.createAndSendPrivacyToken(paymentInfos, tokenParams, feePRV, feePToken, hasPrivacyForPRV, hasPrivacyForToken, "", true, true);
  console.log("Send tx 1 done : ", response1);
  // } catch (e) {
  //   console.log("Error when transfering ptoken: ", e);
  //   throw e;
  // }

  let newFee = feePRV *2;
  let newFeePToken = feePToken * 2;
  let newInfo = "abc";
  let newMessageForNativeToken = "Incognito-chain";
  let newMessageForPToken = "Incognito-chain";
  let isEncryptMessageForPToken = false;
  let isEncryptMessageForNativeToken = false;

  let response2 =  await accountSender.replaceTx(response1.txId, newFee, newFeePToken,
    newInfo, newMessageForNativeToken, isEncryptMessageForNativeToken,
    newMessageForPToken, isEncryptMessageForPToken);
  console.log("Send tx 2 done : ", response2);
}

// TestCreateAndSendReplacePrivacyTokenTransfer();

async function TestGetOutputCoins(){
  Wallet.RpcClient = rpcClient;
  await sleep(5000);
  // sender key (private key)
  let senderSpendingKeyStr = "";
  let senderKeyWallet = keyWallet.base58CheckDeserialize(senderSpendingKeyStr);
  senderKeyWallet.KeySet.importFromPrivateKey(senderKeyWallet.KeySet.PrivateKey);
  // let senderPaymentAddressStr = senderKeyWallet.base58CheckSerialize(PaymentAddressType);


  let accountSender = new AccountWallet();
  accountSender.key = senderKeyWallet;

  let allCoins = await accountSender.getAllOutputCoins(null, Wallet.RpcClient);
  console.log("allCoins: ", allCoins);
}

// TestGetOutputCoins()

