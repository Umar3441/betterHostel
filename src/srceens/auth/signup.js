import React, { useState, useEffect, useRef } from 'react'
import { Keyboard, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Platform, ScrollView } from 'react-native'
import CustomButton from '../../components/customButton'
import CustomTextInput from '../../components/customTextInput'
import { colors } from '../../utils'

import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'







export default function Signup() {

    const navigation = useNavigation()


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [firstNameError, setFirstNameError] = useState(null)
    const [lastNameError, setLastNameError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [confirmPasswordError, setConfirmPasswordError] = useState(null)

    const [loading, setLoading] = useState(false)

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const scrollViewRef = useRef(null)


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action

            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function ValidateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function ValidateForm() {

        let state = true

        if (!firstName) {
            setFirstNameError('Required')
            state = false
        } else {
            setFirstNameError(null)
        }



        if (!lastName) {
            setLastNameError('Required')
            state = false
        } else {
            setLastNameError(null)
        }

        if (!email) {
            setEmailError('Required')
            state = false
        } else {
            if (ValidateEmail(email)) {
                setEmailError(null)

            } else {
                setEmailError('Invalid Email')
                state = false
            }
        }

        if (!password) {
            setPasswordError('Required')
            state = false

        } else {
            if (password.length < 6) {
                setPasswordError('Password must be of atleast 6 characters')
                state = false
            } else {
                setPasswordError(null)
            }
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Required')
            state = false
        } else {
            if (password === confirmPassword) {
                setConfirmPasswordError(null)
            } else {
                setConfirmPasswordError('Password does not match')
                state = false
            }
        }


        return state

    }



    const Header = () => {

        return (
            <View style={[styles.headerContainer]}>

                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 30 }}>
                    Sign Up
                </Text>
                <View style={styles.subHeader1} />
                <View style={styles.subHeader2} />
            </View>
        )
    }



    const signup = () => {
        setLoading(true)
        if (ValidateForm()) {
            auth().createUserWithEmailAndPassword(email, password)
                .then(({ user }) => {
                    user.updateProfile(
                        {
                            displayName: firstName + " " + lastName
                        }
                    ).then(() => {
                        // setLoading(false)
                    }

                    )
                }).catch(
                    error => {
                        setConfirmPasswordError(error.message.split(']')[1])
                        setLoading(false)
                    }
                )

        } else {
            setLoading(false)
        }
    }

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container} >

                <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
                <Header />

                <View style={[styles.inputContainer]}>

                    <CustomTextInput
                        error={firstNameError}
                        placeholder='First Name'
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        customStyles={{ marginVertical: 10 }}
                        onFocus={() => setFirstNameError(null)}
                        onBlur={() => {

                            firstName ? setFirstNameError(null) : setFirstNameError('Required')
                        }
                        }


                    />

                    <CustomTextInput
                        error={lastNameError}
                        placeholder='Last Name'
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        customStyles={{ marginVertical: 10 }}
                        onFocus={() => setLastNameError(null)}
                        onBlur={() => {
                            lastName ? setLastNameError(null) : setLastNameError('Required')
                        }
                        }

                    />

                    <CustomTextInput
                        error={emailError}
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        customStyles={{ marginVertical: 10 }}
                        onFocus={() => setEmailError(null)}
                        onBlur={() =>
                            email ? ValidateEmail(email) ? setEmailError(null) : setEmailError('Invalid Email Address') : setEmailError('Required')
                        }

                    />

                    <CustomTextInput
                        error={passwordError}
                        placeholder='Password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        customStyles={{ marginVertical: 10 }}
                        onFocus={() => setPasswordError(null)}
                        onBlur={() => {
                            password ? password.length < 6 ? setPasswordError('Password must be of atleast 6 characters') : setPasswordError(null) : setPasswordError('Required')
                        }
                        }


                    />

                    <CustomTextInput
                        error={confirmPasswordError}
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        customStyles={{ marginVertical: 10 }}
                        onFocus={() => setConfirmPasswordError(null)}
                        onBlur={() => {
                            confirmPassword ? setConfirmPasswordError(null) : setConfirmPasswordError('Required')
                        }
                        }

                    />


                </View>


                <CustomButton title='Sign Up' onPress={() => signup()} loading={loading} />


                <View style={{ width: '95%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginVertical: 10, }}>
                    <View style={{ width: '45%', height: 2, backgroundColor: colors.grey, borderRadius: 40 }} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.grey }}>OR</Text>
                    <View style={{ width: '45%', height: 2, backgroundColor: colors.grey, borderRadius: 40 }} />
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                    <Text style={{}}>
                        {'Already a member? '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Sign In</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    headerContainer: {
        width: '100%',
        height: '12%',
        backgroundColor: colors.primary,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    subHeader1: {
        width: '94%',
        backgroundColor: colors.primary,
        opacity: 0.5,
        height: 10,
        position: 'absolute',
        bottom: -6,
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },

    subHeader2: {
        width: '90%',
        backgroundColor: colors.primary,
        opacity: 0.2,
        height: 9,
        position: 'absolute',
        bottom: -14,
        alignSelf: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10

    },
    inputContainer: {
        width: '100%',
        padding: 20,
        marginTop: 90
    }
})
