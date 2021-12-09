import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from '../srceens/auth/signIn';
import Signup from '../srceens/auth/signup';
import TabNavigator from './tabNavigator';
import Suggestions from '../srceens/app/suggestions';
import Complaints from '../srceens/app/complaints';
import AddPost from '../srceens/app/addPost';
import Account from '../srceens/app/Account';


const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='TabNavigator' component={TabNavigator} />
                <Stack.Screen name='Suggestions' component={Suggestions} />
                <Stack.Screen name='Complaints' component={Complaints} />
                <Stack.Screen name='AddPost' component={AddPost} />
                <Stack.Screen name='Account' component={Account} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
