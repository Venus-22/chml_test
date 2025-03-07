/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const { PATH } = require('../helpers');
const TEST_PATH = `${PATH}/connected`;

describe("database().ref('.info/connected')", function () {
  before(async function () {
    await firebase.database().goOnline();
  });
  after(async function () {
    await firebase.database().goOnline();
  });

  xit('returns true when used with once', async function () {
    const snapshot = await firebase.database().ref('.info/connected').once('value');
    snapshot.val().should.equal(true);
  });

  xit('returns true when used with once with a previous call', async function () {
    await firebase.database().ref(`${TEST_PATH}/foo`).once('value');
    const snapshot = await firebase.database().ref('.info/connected').once('value');
    snapshot.val().should.equal(true);
  });

  it('subscribes to online state', async function () {
    const callback = sinon.spy();
    await firebase.database().goOffline();

    const ref = firebase.database().ref('.info/connected');

    const handler = $ => {
      callback($.val());
    };

    ref.on('value', handler);

    await Utils.sleep(1000);
    await firebase.database().goOnline();
    await Utils.sleep(1000);
    ref.off('value', handler);

    callback.should.be.calledTwice();
    callback.getCall(0).args[0].should.equal(false);
    callback.getCall(1).args[0].should.equal(true);
  });
});
