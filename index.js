/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

import { Provider } from 'react-redux';

import configureStore from './src/redux/store'

const store = configureStore()

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)


AppRegistry.registerComponent(appName, () => Root);
