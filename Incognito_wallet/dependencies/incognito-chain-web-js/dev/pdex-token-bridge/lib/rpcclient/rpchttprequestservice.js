import Validator from "@lib/utils/validator";
import createAxiosInstance from "../http/axios";

class RpcHTTPRequestServiceClient {
  constructor(url) {
    this.http = createAxiosInstance({ baseURL: url });
  }

  apiRequestAirdrop = ({ paymentAddress } = {}) => {
    new Validator("paymentAddress", paymentAddress).required().string();
    const url = `requestdrop?paymentkey=${paymentAddress}`;
    return this.http.get(url);
  }
}

export { RpcHTTPRequestServiceClient };
