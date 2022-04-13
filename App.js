import React, { useState, useEffect } from 'react'
import AuthNavigator from './src/navigation/authNavigator'
import auth from '@react-native-firebase/auth';
import Home from './src/srceens/app/home';
import TabNavigator from './src/navigation/tabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/appNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './src/redux/actions';
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';


export default function App() {
  const [initializing, setInitializing] = useState(true);
  // const user = useSelector(state => state.reducer.user)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch();



  async function saveTokenToDatabase(token) {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;

    // Add the token to the users datastore
    await firestore()
      .collection('users')
      .doc(userId)
      .update({
        tokens: firestore.FieldValue.arrayUnion(token),
      });
  }


  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  useEffect(() => {
    requestUserPermission()
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  function onAuthStateChanged(user) {
    setUser(user);
    // dispatch(addUser(user))
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <AuthNavigator />
    );
  }

  return (
    <AppNavigator />
  )

  // return (
  //   <NavigationContainer>
  //     <TabNavigator />
  //   </NavigationContainer>
  // );
}


