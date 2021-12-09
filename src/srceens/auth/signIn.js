import React, { useState, useEffect } from 'react'
import { Dimensions, Keyboard, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SnackBar from 'react-native-snackbar-component'

import CustomButton from '../../components/customButton'
import CustomTextInput from '../../components/customTextInput'
import { colors } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import Modal from "react-native-modal";


const Header = () => {
    return (
        <View style={styles.headerContainer}>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 30 }}>
                Sign In
            </Text>
            <View style={styles.subHeader1} />
            <View style={styles.subHeader2} />
        </View>
    )
}


export default function Signin() {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const [loading, setLoading] = useState(false)
    const [passwordRecoveryModal, setpasswordRecoveryModal] = useState(false)

    const [recoveryEmail, setrecoveryEmail] = useState(null)
    const [recoveryEmailError, setrecoveryEmailError] = useState(null)

    const [recoverySnack, setRecoverySnack] = useState(false)


    const ValidateForm = () => {
        let state = true

        if (!email) {
            setEmailError('Required')
            state = false
        } else {
            setEmailError(null)
        }

        if (!password) {
            setPasswordError('Required')
            state = false
        } else {
            setPasswordError(null)
        }

        return state
    }

    function ValidateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const login = () => {
        setLoading(true)
        if (ValidateForm()) {
            auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
                // setLoading(false)
            })
                .catch((error) => {
                    setPasswordError(error.code.split('/')[1])
                    setLoading(false)
                }
                )
        } else {
            setLoading(false)
        }

    }

    const passwordReset = () => {

        if (!recoveryEmail) {
            setrecoveryEmailError('Required')
        } else {
            if (ValidateEmail(recoveryEmail)) {
                auth().sendPasswordResetEmail(recoveryEmail).then(
                    () => {
                        setpasswordRecoveryModal(false)
                        setRecoverySnack(true)

                        setTimeout(() => {
                            setRecoverySnack(false)
                        }, 3000)
                    }
                ).catch(
                    (error) => setrecoveryEmailError(error.code.split('/')[1])
                )
            } else {
                setrecoveryEmailError('Invalid Email')
            }
        }

    }


    useEffect(() => {
        setrecoveryEmailError(null)
        setrecoveryEmail(null)
    }, [passwordRecoveryModal])

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>
                <SnackBar
                    visible={recoverySnack}
                    textMessage="Check your Email"
                    backgroundColor={colors.black}

                    position='top'
                    top={40}
                    messageStyle={{ fontWeight: 'bold' }}
                    containerStyle={{ marginHorizontal: 20, borderRadius: 10, opacity: 0.9 }}

                />
                <View style={styles.container}>

                    <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
                    <Header />

                    <View style={styles.inputContainer}>

                        <CustomTextInput

                            error={emailError}
                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            customStyles={{ marginVertical: 10 }}
                            onFocus={() => setEmailError(null)}
                            onBlur={() => {

                                email ? setEmailError(null) : setEmailError('Required')
                            }
                            }

                            autoCapitalize={false}


                        />



                        <CustomTextInput
                            error={passwordError}
                            placeholder='Password'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            customStyles={{ marginVertical: 10 }}
                            onFocus={() => setPasswordError(null)}
                            onBlur={() => {

                                password ? setPasswordError(null) : setPasswordError('Required')
                            }
                            }

                            autoCapitalize={false}
                            secureTextEntry={true}
                            keyboardType='email-address'
                        />


                    </View>


                    <CustomButton title='Sign In' onPress={() => login()} loading={loading} />


                    <View style={{ width: '95%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginVertical: 10, }}>
                        <View style={{ width: '45%', height: 2, backgroundColor: colors.grey, borderRadius: 40 }} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.grey }}>OR</Text>
                        <View style={{ width: '45%', height: 2, backgroundColor: colors.grey, borderRadius: 40 }} />
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                        <Text style={{}}>
                            {'Need an Account? '}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>SignUp</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 5 }}>
                        <Text style={{}}>
                            {'Forgot Password? '}
                        </Text>
                        <TouchableOpacity onPress={() => setpasswordRecoveryModal(true)}>
                            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Recover</Text>
                        </TouchableOpacity>
                    </View>



                </View>
                <Modal
                    isVisible={passwordRecoveryModal}
                    avoidKeyboard
                    onBackdropPress={() => setpasswordRecoveryModal(false)}
                    onBackButtonPress={() => setpasswordRecoveryModal(false)}
                    animationIn={'slideInUp'}
                    animationOut={'slideOutDown'}
                    swipeDirection={'down'}

                    onSwipeComplete={() => setpasswordRecoveryModal(false)}
                    style={{ justifyContent: 'flex-end', alignItems: 'center', width: Dimensions.get('screen').width, marginBottom: -10 }}
                >

                    <View style={{ width: '100%', height: 300, backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                        <View style={{ width: 40, height: 10, backgroundColor: colors.primary, alignSelf: 'center', marginTop: 15, borderRadius: 10 }} />
                        <TouchableOpacity onPress={() => setpasswordRecoveryModal(false)} style={{ position: 'absolute', top: 10, right: 10 }}>
                            <AntDesign name='closecircleo' size={30} color={colors.primary} />
                        </TouchableOpacity>

                        <View style={{ paddingHorizontal: 30, flex: 1, marginTop: '13%' }}>
                            <CustomTextInput
                                autoCapitalize={false}
                                value={recoveryEmail}
                                placeholder='Email'
                                error={recoveryEmailError}
                                onChangeText={(text) => {
                                    setrecoveryEmail(text)
                                    setrecoveryEmailError(null)
                                }}
                                customStyles={{ marginBottom: 25 }}
                                onFocus={() => setrecoveryEmailError(null)}

                            />

                            <CustomButton title='Send Email' onPress={() => passwordReset()} />

                        </View>

                    </View>
                </Modal>
            </>
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
        height: '14%',
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
