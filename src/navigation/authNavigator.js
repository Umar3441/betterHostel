import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../srceens/auth/signIn';
import Signup from '../srceens/auth/signup';


const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name='SignIn' component={Signin} options={{
                    headerShown: false
                }} />
                <Stack.Screen name='SignUp' component={Signup} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthNavigator
