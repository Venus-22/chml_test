
# react-native-zmq-service

## Getting started

`$ npm install react-native-zmq-service --save`

### Mostly automatic installation

`$ react-native link react-native-zmq-service`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-zmq-service` and add `RNZmqService.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNZmqService.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNZmqServicePackage;` to the imports at the top of the file
  - Add `new RNZmqServicePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-zmq-service'
  	project(':react-native-zmq-service').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-zmq-service/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-zmq-service')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNZmqService.sln` in `node_modules/react-native-zmq-service/windows/RNZmqService.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Zmq.Service.RNZmqService;` to the usings at the top of the file
  - Add `new RNZmqServicePackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNZmqService from 'react-native-zmq-service';

// TODO: What to do with the module?
RNZmqService;
```
  