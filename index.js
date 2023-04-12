import { AppRegistry, LogBox } from 'react-native';
import App from './src/app';
import { name as appName } from './src/app/app.json';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
require('node-libs-react-native/globals');

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
