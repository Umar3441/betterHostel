import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../srceens/app/home';
import Suggestions from '../srceens/app/suggestions';
import Complaints from '../srceens/app/complaints';
import AddPost from '../srceens/app/addPost';
import Account from '../srceens/app/Account';


import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../utils';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={
            {
                tabBarLabel: () => { return null },

                tabBarStyle: {
                    backgroundColor: colors.lightGrey,
                    opacity: 0.5,
                    position: 'absolute',
                    bottom: 30,
                    // width: '90%',
                    alignSelf: 'center',
                    left: 20,
                    right: 20,
                    borderRadius: 20,
                    paddingBottom: 0,
                    height: 60,
                    borderRadius: 20




                },
                tabBarItemStyle: {
                    // backgroundColor: 'yellow',
                    padding: 0,
                    marginVertical: 0,
                }




            }



        }>
            <Tab.Screen name="Home" component={Home}

                options={
                    {

                        tabBarIcon: ({ focused }) => {
                            return <AntDesign name='home' size={30} color={focused ? colors.primary : colors.grey} />
                        }
                    }
                }
            />
            <Tab.Screen name="Suggestions" component={Suggestions}
                options={
                    {
                        tabBarIcon: ({ focused }) => <MaterialCommunityIcons name='lightbulb-on-outline' size={30} color={focused ? colors.primary : colors.grey} />
                    }
                }
            />
            <Tab.Screen name="AddPost" component={AddPost}
                options={
                    {
                        tabBarIcon: ({ focused }) => <AntDesign name='plussquareo' size={30} color={focused ? colors.primary : colors.grey} />
                    }
                }

            />
            <Tab.Screen name="Complaints" component={Complaints}
                options={
                    {
                        tabBarIcon: ({ focused }) => <MaterialIcons name='error-outline' size={30} color={focused ? colors.primary : colors.grey} />
                    }
                }
            />


            <Tab.Screen name="Account" component={Account}
                options={
                    {
                        tabBarIcon: ({ focused }) => <MaterialIcons name='person-outline' size={30} color={focused ? colors.primary : colors.grey} />,

                    }
                }
            />
        </Tab.Navigator >
    );
}