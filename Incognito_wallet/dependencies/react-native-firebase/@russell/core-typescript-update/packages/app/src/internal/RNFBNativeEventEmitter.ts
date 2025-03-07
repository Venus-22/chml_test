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

import { NativeEventEmitter, NativeModules } from 'react-native';

const { RNFBAppModule } = NativeModules;

class RNFBNativeEventEmitter extends NativeEventEmitter {
  public ready: boolean;

  constructor() {
    super(RNFBAppModule);
    this.ready = false;
  }

  addListener(eventType: any, listener: any, context: any) {
    if (!this.ready) {
      RNFBAppModule.eventsNotifyReady(true);
      this.ready = true;
    }
    RNFBAppModule.eventsAddListener(eventType);
    return super.addListener(`rnfb_${eventType}`, listener, context);
  }

  removeAllListeners(eventType: any) {
    RNFBAppModule.eventsRemoveListener(eventType, true);
    super.removeAllListeners(`rnfb_${eventType}`);
  }

  removeSubscription(subscription: any) {
    RNFBAppModule.eventsRemoveListener(subscription.eventType.replace('rnfb_'), false);
    super.removeSubscription(subscription);
  }
}

export default new RNFBNativeEventEmitter();
