import React, { useState, useRef, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image, ScrollView, Dimensions } from 'react-native'
import auth from '@react-native-firebase/auth'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { colors } from '../../utils'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ImagePicker from 'react-native-image-crop-picker';
import CustomButton from '../../components/customButton';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { addPosts } from '../../redux/actions'
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment'


export default function AddSuggestion() {

    const navigation = useNavigation()

    const [title, setTitle] = useState(null)
    const [imagesPicked, setimagesPicked] = useState([])
    const scrollViewRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [isAnonymous, setIsAnonymous] = useState(false)

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

    const user = useSelector(state => state.reducer.user)
    const dispatch = useDispatch()




    const pickImage = () => {
        ImagePicker.openPicker({
            multiple: true,
        }).then(image => {
            // console.log('---------------------->', image);
            const arr = []
            image.forEach(element => {

                let type = 'image'

                // console.log('type ----------->', element.mime)

                if (element.mime.includes('image')) {
                    type = 'image'
                } else {
                    type = 'video'
                }

                const media = {
                    type: type,
                    url: element.path
                }
                arr.push(media)
            });
            setimagesPicked([...imagesPicked, ...arr])
        });


    }


    const deleteImage = (image) => {

        setimagesPicked(imagesPicked.filter(item => item !== image))
    }



    const publishPost = async () => {


        if (!title && imagesPicked.length < 1) {
            alert('Add something to post')
            return
        }

        const postImages = []
        setLoading(true)

        try {

            if (imagesPicked.length > 0) {
                for (let index = 0; index < imagesPicked.length; index++) {
                    const element = imagesPicked[index];

                    const reference = storage().ref(`posts/${uuidv4()}`);
                    const task = reference.putFile(element.url);
                    task.on('state_changed', taskSnapshot => {
                        // console.log((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
                    });

                    task.then(
                        async () => {
                            const url = await reference.getDownloadURL().catch((error) => { console.log('---', error) });
                            // console.log('------------->', url)
                            postImages.push({
                                type: element.type,
                                url: url
                            })
                            // if (index === imagesPicked.length - 1) {
                            if (postImages.length === imagesPicked.length) {
                                firestore()
                                    .collection('complaints')
                                    .add({
                                        caption: title,
                                        media: postImages,
                                        user: user.uid,
                                        userName: user.displayName,
                                        profile_picture: user.photoURL,
                                        userEmail: user.email,
                                        timeStamp: moment().toISOString(),
                                        votes: [],
                                        isAnonymous: isAnonymous
                                    })
                                    .then(() => {


                                        // const tempPosts = [
                                        //     {
                                        //         caption: title,
                                        //         media: postImages,
                                        //         user: user.uid,
                                        //         userName: user.displayName,
                                        //         profile_picture: user.photoURL,
                                        //         userEmail: user.email,
                                        //         comments: [],
                                        //         timeStamp: moment().toISOString(),
                                        //         likes: 0
                                        //     }

                                        //     , ...posts]
                                        // // tempPosts.push({
                                        // //     caption: title,
                                        // //     media: postImages,
                                        // //     user: user.uid,
                                        // //     userName: user.displayName,
                                        // //     profile_picture: user.photoURL,
                                        // //     userEmail: user.email,
                                        // //     comments: [],
                                        // //     timeStamp: moment().toISOString(),
                                        // //     likes: 0
                                        // // })

                                        // dispatch(addPosts(tempPosts))


                                        // console.log('post added!');
                                        setLoading(false)
                                        setimagesPicked([])
                                        setTitle(null)
                                        navigation.goBack()
                                    }).catch(
                                        (error) => {
                                            console.log(error)
                                            setLoading(false)
                                        }
                                    );
                            }
                        }

                    )

                }
            } else {


                firestore()
                    .collection('complaints')
                    .add({
                        caption: title,
                        media: postImages,
                        user: user.uid,
                        userName: user.displayName,
                        profile_picture: user.photoURL,
                        userEmail: user.email,
                        timeStamp: moment().toISOString(),
                        votes: [],
                        isAnonymous: isAnonymous
                    })
                    .then(() => {
                        console.log('post added!');
                        setLoading(false)
                        navigation.goBack()
                    }).catch(
                        (error) => {
                            console.log(error)
                            setLoading(false)
                        }

                    );
            }


        } catch (error) {
            console.log('err', error)
        }

    }



    useEffect(() => {
        scrollViewRef.current.scrollToEnd()
    }, [imagesPicked])

    return (
        <ScrollView bounces={false} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <AntDesign name='close' size={25} onPress={() => navigation.goBack()} />
                    <Text style={styles.headingText} >
                        Add Complaint
                    </Text>
                    <Text style={styles.nextText} onPress={() => publishPost()}>
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

                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.grey, letterSpacing: 2, marginVertical: 5 }}>Problem</Text>
                    <View style={{ maxHeight: 400 }}>
                        <TextInput
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                            style={{ marginHorizontal: 5, marginVertical: 5, marginBottom: 10 }}
                            placeholder='write Something'
                            multiline={true}

                        />
                    </View>

                    <View
                        horizontal={true}
                        style={styles.imagesContainer}>
                        <ScrollView
                            ref={scrollViewRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            {imagesPicked ?
                                imagesPicked.map((image, index) => {

                                    return <TouchableOpacity key={index} onPress={() => deleteImage(image)}>
                                        <Image source={{ uri: image.url }} style={styles.imagesPickerComponent} />
                                    </TouchableOpacity>
                                }
                                )
                                : null
                            }


                            <TouchableOpacity
                                onPress={pickImage}
                                activeOpacity={0.7} style={styles.imagesPickerComponent}>
                                <Entypo name='plus' size={80} color={'white'} />
                            </TouchableOpacity>

                        </ScrollView>

                        <CustomButton title='Publish' onPress={() => publishPost()} customStyles={styles.publishButtonView} />

                    </View>

                </View>

            </View>

            {loading ?
                <View style={{ alignSelf: 'center', position: 'absolute', top: '50%' }}>
                    <Progress.Bar width={Dimensions.get('screen').width - 50} color={colors.primary} animated indeterminate />
                </View>
                : null}

        </ScrollView>
    )
}

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
})
