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

const { PATH, wipe } = require('../helpers');

const TEST_PATH = `${PATH}/onDisconnectSet`;

describe('database().ref().onDisconnect().set()', function () {
  after(function () {
    return wipe(TEST_PATH);
  });

  afterEach(function () {
    // Ensures the db is online before running each test
    firebase.database().goOnline();
  });

  it('throws if value is not a defined', function () {
    const ref = firebase.database().ref(TEST_PATH).onDisconnect();
    try {
      ref.set();
      return Promise.reject(new Error('Did not throw an Error.'));
    } catch (error) {
      error.message.should.containEql("'value' must be defined");
      return Promise.resolve();
    }
  });

  it('throws if onComplete is not a function', function () {
    const ref = firebase.database().ref(TEST_PATH).onDisconnect();
    try {
      ref.set(null, 'foo');
      return Promise.reject(new Error('Did not throw an Error.'));
    } catch (error) {
      error.message.should.containEql("'onComplete' must be a function if provided");
      return Promise.resolve();
    }
  });

  xit('sets value when disconnected', async function () {
    const ref = firebase.database().ref(TEST_PATH);

    const value = Date.now();

    await ref.onDisconnect().set(value);
    await firebase.database().goOffline();
    await firebase.database().goOnline();

    const snapshot = await ref.once('value');
    snapshot.val().should.eql(value);
  });

  it('calls back to the onComplete function', async function () {
    const callback = sinon.spy();
    const ref = firebase.database().ref(TEST_PATH);

    // Set an initial value
    await ref.set('foo');

    await ref.onDisconnect().set('bar', callback);
    await firebase.database().goOffline();
    await firebase.database().goOnline();

    callback.should.be.calledOnce();
  });
});
