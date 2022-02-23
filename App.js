import React, { useState, useEffect } from 'react'
import AuthNavigator from './src/navigation/authNavigator'
import auth from '@react-native-firebase/auth';
import Home from './src/srceens/app/home';
import TabNavigator from './src/navigation/tabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/appNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './src/redux/actions';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const user = useSelector(state => state.reducer.user)
  const dispatch = useDispatch();


  function onAuthStateChanged(user) {
    // setUser(user);
    dispatch(addUser(user))
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


