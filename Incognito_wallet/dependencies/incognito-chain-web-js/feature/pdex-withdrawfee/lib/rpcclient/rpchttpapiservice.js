import { camelCaseKeys } from "@lib/module/Account/account.utils";

const { default: createAxiosInstance } = require("@lib/http/axios");
const { default: Validator } = require("@lib/utils/validator");

class RpcHTTPApiServiceClient {
  constructor(url, token) {
    this.http = createAxiosInstance({ baseURL: url, token });
  }

  apiGetAuthToken = async ({ deviceID, deviceToken } = {}) => {
    new Validator("deviceID", deviceID).required().string();
    new Validator("deviceToken", deviceToken).string();
    let _deviceToken = deviceToken || deviceID;
    return await this.http.post("auth/new-token", {
      DeviceID: deviceID,
      DeviceToken: _deviceToken,
    });
  };

  apiGetPTokenHistory = async ({
    tokenID,
    paymentAddress,
    signPublicKeyEncode,
  }) => {
    new Validator("apiGetPTokenHistory-tokenID", tokenID).required().string();
    new Validator("apiGetPTokenHistory-paymentAddress", paymentAddress)
      .required()
      .string();
    new Validator(
      "apiGetPTokenHistory-signPublicKeyEncode",
      signPublicKeyEncode
    )
      .required()
      .string();
    const data = {
      WalletAddress: paymentAddress,
      PrivacyTokenAddress: tokenID,
      SignPublicKeyEncode: signPublicKeyEncode,
    };
    return this.http
      .post("eta/history", data)
      .then((res) => res || [])
      .catch((err) =>
        console.log("ERROR apiGetPTokenHistory", JSON.stringify(err))
      );
  };
}

export { RpcHTTPApiServiceClient };
