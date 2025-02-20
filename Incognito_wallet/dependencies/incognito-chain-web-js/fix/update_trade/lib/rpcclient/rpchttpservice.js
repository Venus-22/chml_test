const axios = require('axios');

class RPCHttpService {
  constructor(url = "http://localhost:9334", username, password) {
    this.auth = {
      username: username,
      password: password,
    }
    this.url = url;
    this.axios = axios;
  }

  postRequest = async (data) => {
    const response = await this.axios.post(this.url, data, {
      auth: this.auth, headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Headers': 'Content-Type, Cache-Control, X-Requested-With, X-CSRF-Token, Discourse-Visible, User-Api-Key, User-Api-Client-Id, *',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE',
      }
    });
    return response;
  }
}

export { RPCHttpService };
