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
import AddSuggestion from '../srceens/app/addSuggestion';
import AddComplaint from '../srceens/app/addComplaint';


const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={
                {
                    headerShown: false
                }
            }>
                <Stack.Screen name='TabNavigator' component={TabNavigator} />
                <Stack.Screen name='AddSuggestion' component={AddSuggestion} />
                <Stack.Screen name='AddComplaint' component={AddComplaint} />
                <Stack.Screen name='AddPost' component={AddPost} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
