# Next

## storage
- added `snapshot` property to `Task` as per web spec.
- made `StorageReference.put` return a `Task`, not a promise.


### Bug Fixes

* **admob:** add null checks for getCurrentActivity() usages ([#2913](https://github.com/invertase/react-native-firebase/issues/2913)) ([1fb296d](https://github.com/invertase/react-native-firebase/commit/1fb296dc3bc2ffcf2db1d09f5f17b0209ff8276a))
* **admob,ios:** use `AdMob` vs `Admob` for Pod name ([#2922](https://github.com/invertase/react-native-firebase/issues/2922)) ([88a0167](https://github.com/invertase/react-native-firebase/commit/88a01672a8e443e87c7e1513cdb0d0594dd47ed9))
* **analytics:** ts logEvent params arg should be optional ([#2822](https://github.com/invertase/react-native-firebase/issues/2822)) ([3b8757c](https://github.com/invertase/react-native-firebase/commit/3b8757c0d4f6787c2e5f1ca2c04e73e809d3deae))
* **auth:** collection was mutated while being enumerated. ([#2900](https://github.com/invertase/react-native-firebase/issues/2900)) ([5471187](https://github.com/invertase/react-native-firebase/commit/5471187b30527cd1157bde209886664e52413a7c))
* **auth:** dont mutate modifiers ordering when building query key (fixes [#2833](https://github.com/invertase/react-native-firebase/issues/2833)) ([9df493e](https://github.com/invertase/react-native-firebase/commit/9df493e837b6a709b8f61027690219738ffa830a))
* **auth:** trigger initial listener asynchronously ([#2897](https://github.com/invertase/react-native-firebase/issues/2897)) ([227ab63](https://github.com/invertase/react-native-firebase/commit/227ab631a6163a950af675da690b1467f7616d6c))
* **crashlytics:** setCrashlyticsCollectionEnabled return promise ([#2792](https://github.com/invertase/react-native-firebase/issues/2792)) ([4c19b94](https://github.com/invertase/react-native-firebase/commit/4c19b9439ddf6ecf57e59f7e2d8b64954678d8e5))
* **database,android:** fix issue where transaction signal state error not caught ([d7252a2](https://github.com/invertase/react-native-firebase/commit/d7252a2d4e1987114ab1a8e5c04f0088a86d2b5b))
* **database,ios:** return null snapshot key if does not exist (fixes [#2813](https://github.com/invertase/react-native-firebase/issues/2813)) ([bbf3df9](https://github.com/invertase/react-native-firebase/commit/bbf3df98ab88559de1392cba7163666a31e98ee3))
* **messaging:** deprecate onTokenRefresh(event => event.token) fixes [#2889](https://github.com/invertase/react-native-firebase/issues/2889) ([1940d6c](https://github.com/invertase/react-native-firebase/commit/1940d6c8fbab64ccf739186cea9633a605237942))
* **messaging:** typo in isRegisteredForRemoteNotifications ([#2645](https://github.com/invertase/react-native-firebase/issues/2645)) ([f0e614f](https://github.com/invertase/react-native-firebase/commit/f0e614f48567645e89e837ee56d3f3d251473b09)), closes [/github.com/invertase/react-native-firebase/blob/master/packages/messaging/ios/RNFBMessaging/RNFBMessagingModule.m#L58](https://github.com//github.com/invertase/react-native-firebase/blob/master/packages/messaging/ios/RNFBMessaging/RNFBMessagingModule.m/issues/L58)
* **messaging,ios:** hasPermission checks authorizationStatus ([#2908](https://github.com/invertase/react-native-firebase/issues/2908)) ([7cab58d](https://github.com/invertase/react-native-firebase/commit/7cab58d87fcba592c697a3441bd77033eb09ab3c))
* **messaging,ios:** wait for remote notification registration status ([8c339d1](https://github.com/invertase/react-native-firebase/commit/8c339d10e288ef60e83e38bc4a245c5a251c83ff)), closes [#2657](https://github.com/invertase/react-native-firebase/issues/2657)
* **storage:** fix video asset resources on iOS13 ([#2750](https://github.com/invertase/react-native-firebase/issues/2750)) ([fded286](https://github.com/invertase/react-native-firebase/commit/fded28621fb5c73c3daba009cc4f2ef6fde21745))
* **storage,ios:** use long value for maxResults list option (fixes [#2804](https://github.com/invertase/react-native-firebase/issues/2804)) ([9488103](https://github.com/invertase/react-native-firebase/commit/94881037e0d304e3a585088be1dcae42be8794a8))
* **storage,js:** validate that list maxResults is an integer value ([2fc9e9d](https://github.com/invertase/react-native-firebase/commit/2fc9e9d537e954989a50f941e2479fbbdb3874c9))
* **template:** add noCompress tflite by default to android template (for [#2478](https://github.com/invertase/react-native-firebase/issues/2478)) ([9dd3fa6](https://github.com/invertase/react-native-firebase/commit/9dd3fa68c30b8b2f687bae4d9e81f438311ae739))


### Features

* **firestore:** array-contains, array-contains-any & in filters ([#2868](https://github.com/invertase/react-native-firebase/issues/2868)) ([42e034c](https://github.com/invertase/react-native-firebase/commit/42e034c4807da54441d2baeab9f57bbf1a137a4a))
* **ios:** upgrade Firebase iOS SDK version to 6.13.0 ([547d0a2](https://github.com/invertase/react-native-firebase/commit/547d0a2d74a68808b29063f9b3aa3e1ac38551fc))
* **remote-config:** support minimumFetchInterval config setting ([#2789](https://github.com/invertase/react-native-firebase/issues/2789)) ([57965e7](https://github.com/invertase/react-native-firebase/commit/57965e73a7e1089335c5446fb91cd44c1b19725d)), closes [/github.com/firebase/firebase-ios-sdk/blob/master/FirebaseRemoteConfig/Sources/Public/FIRRemoteConfig.h#L148-L149](https://github.com//github.com/firebase/firebase-ios-sdk/blob/master/FirebaseRemoteConfig/Sources/Public/FIRRemoteConfig.h/issues/L148-L149)
* **template:** update template to RN 0.61.5 ([3e90981](https://github.com/invertase/react-native-firebase/commit/3e909813fb1b14a3baeb3468cb5e78ea86503f60))
* **template:** upgrade to React Native 0.61.4 ([#2821](https://github.com/invertase/react-native-firebase/issues/2821)) ([fb4941b](https://github.com/invertase/react-native-firebase/commit/fb4941b6e5dc6b3101eeaa2c1c429300a3e05da7))



## [6.0.4](https://github.com/invertase/react-native-firebase/compare/v6.0.3...v6.0.4) (2019-11-17)


### Bug Fixes

* **analytics:** Use correct add_to_cart event name ([#2882](https://github.com/invertase/react-native-firebase/issues/2882)) ([2369c62](https://github.com/invertase/react-native-firebase/commit/2369c629fc21705f32f2a4b6487260e3ab05569e))
* **auth:** Fix exception in PhoneAuthListener ([#2828](https://github.com/invertase/react-native-firebase/issues/2828)) ([0843cbd](https://github.com/invertase/react-native-firebase/commit/0843cbdf3a4548c78a93bed115a1b3b0666436d1)), closes [#2639](https://github.com/invertase/react-native-firebase/issues/2639)
* **firestore:** correctly apply internal `__name__` query modif… ([#2866](https://github.com/invertase/react-native-firebase/issues/2866)) ([a5da010](https://github.com/invertase/react-native-firebase/commit/a5da0107ff570dc6327bb3ae5d7fff4143183ac9)), closes [#2854](https://github.com/invertase/react-native-firebase/issues/2854)
* **firestore,ios:** Settings incorrectly set multiple times ([#2869](https://github.com/invertase/react-native-firebase/issues/2869)) ([ed858c9](https://github.com/invertase/react-native-firebase/commit/ed858c96eee0bcfa796faf3f151116c35a4328c0))
* **storage,ios:** Handle null Storage metadata values ([#2875](https://github.com/invertase/react-native-firebase/issues/2875)) ([26f752a](https://github.com/invertase/react-native-firebase/commit/26f752a1172a36e7c5ea837c1792610fd37adbb4))
* **storage,ios:** Handle null Storage metadata values ([#2881](https://github.com/invertase/react-native-firebase/issues/2881)) ([eeb90c0](https://github.com/invertase/react-native-firebase/commit/eeb90c0a376e88f4ceb20a1dc5fd3bb4ce558a61))
* **template:** Fix invalid flow config file ([1def1c1](https://github.com/invertase/react-native-firebase/commit/1def1c1ce5ee320e7ff8d490e9e711281f5abdda))



## [6.0.3](https://github.com/invertase/react-native-firebase/compare/v6.0.2...v6.0.3) (2019-10-25)


### Bug Fixes

* **database:** Fix crash when removing listeners at RN reload ([#2770](https://github.com/invertase/react-native-firebase/issues/2770)) ([e2b1b6f](https://github.com/invertase/react-native-firebase/commit/e2b1b6f56f8123ccf5f9c03bf6b5bc64a95ccc89))
* **storage,ios:** Fix issue with `ph://` (Photos) paths ([cbced41](https://github.com/invertase/react-native-firebase/commit/cbced419d4a85661da445929c8b3640b028f340b))



## [6.0.2](https://github.com/invertase/react-native-firebase/compare/v6.0.1...v6.0.2) (2019-10-18)


### Bug Fixes

* **auth:** Fix iOS event subscriptions not correctly removing on reload ([49c0050](https://github.com/invertase/react-native-firebase/commit/49c0050383aa0c54a2329104e2ad85a5e41a4a95))
* **vision:** Improve null checks on iOS [#2744](https://github.com/invertase/react-native-firebase/issues/2744) ([#2747](https://github.com/invertase/react-native-firebase/issues/2747)) ([d717f98](https://github.com/invertase/react-native-firebase/commit/d717f981d480d14476ed278fed349b1bedea8798))


# v6.0.0

See the [v6.0.0 release page](https://invertase.io/oss/react-native-firebase/releases/v6.0.0).
