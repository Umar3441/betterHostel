import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomButton from '../../components/customButton';
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import * as Progress from 'react-native-progress';
import moment from 'moment';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const AddSuggestion = () => {


    const [suggestion, setsuggestion] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [isAnonymous, setIsAnonymous] = useState(false)
    const user = useSelector(state => state.reducer.user)

    const idData = [
        {
            value: false,
            label: 'Show my Identity'
        },
        {
            value: true,
            label: 'Anonymous'
        }
    ];



    const publishSuggestion = () => {




        if (!suggestion) {
            alert('suggest Something')
            return
        }

        setLoading(true)


        firestore()
            .collection('suggestions')
            .add({
                isAnonymous: isAnonymous,
                suggestion: suggestion,
                user: user.uid,
                userName: user.displayName,
                profile_picture: user.photoURL,
                userEmail: user.email,
                timeStamp: moment().toISOString(),
                votes: []
            })
            .then(() => {
                //console.log('suggestions added!');
                setLoading(false)
                navigation.goBack()
            }).catch(
                (error) => {
                    //console.log(error)
                    setLoading(false)
                }
            );


    }


    return (
        <ScrollView bounces={false} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <AntDesign name='close' size={25} onPress={() => navigation.goBack()} />
                    <Text style={styles.headingText} >
                        Suggest Something
                    </Text>
                    <Text style={styles.nextText} onPress={() => publishSuggestion()}>
                        Next
                    </Text>
                </View>

                <View style={styles.contentContainer}>

                    <RadioButtonRN
                        initial={1}
                        textStyle={{ fontWeight: '500' }}
                        box={false}
                        data={idData}
                        selectedBtn={(e) => setIsAnonymous(e.value)}
                        icon={
                            <Icon
                                name="check-circle"
                                size={25}
                                color={colors.primary}
                            />
                        }
                    />

                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.grey, letterSpacing: 2, marginVertical: 10 }}>
                        Suggestion
                    </Text>
                    <View style={{ maxHeight: 400 }}>
                        <TextInput
                            value={suggestion}
                            onChangeText={(text) => setsuggestion(text)}
                            style={{ marginHorizontal: 5, marginVertical: 5, marginBottom: 10 }}
                            placeholder='write Something'
                            multiline={true}

                        />
                    </View>

                    <View
                        horizontal={true}
                        style={styles.imagesContainer}>

                        <CustomButton title='Publish' onPress={() => publishSuggestion()} customStyles={styles.publishButtonView} />

                    </View>

                </View>

            </View>

            {loading ?
                <View style={{ alignSelf: 'center', position: 'absolute', top: '50%' }}>
                    <Progress.Bar width={Dimensions.get('screen').width - 50} color={colors.primary} animated indeterminate />
                </View>
                : null}

        </ScrollView>
    );
};

export default AddSuggestion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: getStatusBarHeight(),
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    headingText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    nextText: {
        fontSize: 17,
        fontWeight: '500',
        color: colors.primary,

    },
    contentContainer: {
        flex: 1,
        // backgroundColor: 'red',
        marginTop: 20,
        paddingHorizontal: 20
    },
    imagesContainer: {
        width: '100%',
        marginBottom: 10

        // backgroundColor: 'red'
    },
    imagesPickerComponent: {
        width: 110,
        height: 110,
        borderRadius: 10,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    publishButtonView: {
        width: '100%',
        marginTop: 20
    }
});
