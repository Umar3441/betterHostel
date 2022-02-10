import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../srceens/app/home';
import Suggestions from '../srceens/app/suggestions';
import Complaints from '../srceens/app/complaints';
import AddPost from '../srceens/app/addPost';
import Account from '../srceens/app/Account';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'


import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../utils';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {

    const navigation = useNavigation()

    const [optionalPostModal, setOptionalPostModal] = useState(false)

    return (
        <>
            <Tab.Navigator screenOptions={
                {
                    tabBarLabel: () => { return null },
                    headerShown: false,

                    tabBarStyle: {

                        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        // 
                        position: 'absolute',
                        bottom: 30,
                        borderTopWidth: 0,

                        alignSelf: 'center',
                        left: 20,
                        right: 20,
                        borderRadius: 20,
                        paddingBottom: 0,
                        height: 60,
                        borderRadius: 20,

                    },





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
                <Tab.Screen name="Add" component={Dummy}
                    options={
                        {
                            tabBarIcon: ({ focused }) => <AntDesign name='plussquareo' size={30} color={focused ? colors.primary : colors.grey} />
                        }
                    }


                    listeners={{
                        tabPress: (e) => {
                            // Prevent default action
                            e.preventDefault();


                            setOptionalPostModal(true)
                            //Any custom code here
                            // alert(123);
                        },
                    }}

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
            <Modal
                isVisible={optionalPostModal}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                style={{ width: '100%', alignSelf: 'center' }}
            >
                <View style={styles.containerView}>
                    <TouchableOpacity onPress={() => {
                        setOptionalPostModal(false)
                        navigation.navigate('AddSuggestion')
                    }} style={styles.buttonBox}>
                        <MaterialCommunityIcons name='lightbulb-on-outline' size={60} color={colors.primary} />
                        <Text style={styles.optionText}>Suggest</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        setOptionalPostModal(false)
                        navigation.navigate('AddPost')
                    }} style={styles.buttonBox}>
                        <MaterialIcons name='post-add' size={60} color={colors.primary} />
                        <Text style={styles.optionText}>Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setOptionalPostModal(false)
                        navigation.navigate('AddComplaint')
                    }} style={styles.buttonBox}>
                        <MaterialIcons name='error-outline' size={60} color={colors.primary} />
                        <Text style={styles.optionText}>Complaint</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}


const Dummy = () => {
    return (
        <View></View>
    )
}

const styles = StyleSheet.create(
    {
        buttonBox:
        {
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: 20,
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
        },
        optionText:
        {
            fontWeight: '600',
            color: colors.grey,
            marginTop: 5
        }
        ,
        containerView: {
            paddingHorizontal: 10,
            flexDirection: 'row',
            width: '97%',
            alignSelf: 'center',
            height: 200,
            backgroundColor: colors.white,
            borderRadius: 30,
            justifyContent: 'space-around',
            alignItems: 'center'
        }
    }
)