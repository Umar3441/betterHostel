import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'react-native-fast-image'
import { colors, images } from '../utils'
import auth from '@react-native-firebase/auth'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { addUser } from '../redux/actions'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';


const ProfileHeader = () => {


    const user = useSelector(state => state.reducer.user)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)



    const updateProfile = () => {

        ImagePicker.openPicker({
            cropping: true
        }).then(image => {
            setLoading(true)
            const path = image.path

            const reference = storage().ref(`profile/${user.uid + 'image'}`);
            const task = reference.putFile(path);
            task.on('state_changed', taskSnapshot => {
                // console.log((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100);
            });
            task.then(
                async () => {
                    const url = await reference.getDownloadURL().catch((error) => { console.log('---', error) });
                    auth().currentUser.updateProfile(
                        {
                            photoURL: url
                        }
                    ).then(
                        () => auth().currentUser.reload().then(
                            () => {
                                setLoading(false);
                                dispatch(addUser(auth().currentUser))
                            }
                        )
                    )
                }
            )
        })




    }





    return (
        <View style={styles.container}>
            <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: 152, height: 152, borderRadius: 80, borderColor: colors.primary, borderWidth: 1 }}>

                {loading ?
                    <ActivityIndicator size='large' color={colors.white} style={{ position: 'absolute', marginTop: 50, marginLeft: 50, zIndex: 100 }} />
                    : null
                }

                {user.photoURL ?
                    <Image source={{ uri: user.photoURL }} style={{ width: 150, height: 150, borderRadius: 150, }} resizeMode='cover' />
                    :
                    <Image source={images.dummyProfile} style={{ width: 150, height: 150, borderRadius: 150, }} resizeMode='cover' />

                }

                <TouchableOpacity style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 2, right: 13, backgroundColor: colors.white, borderRadius: 15 }} onPress={() => updateProfile()}>
                    <AntDesign name='pluscircle' size={25} color={colors.primary} />
                </TouchableOpacity>

            </View>
            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.grey, marginTop: 10 }}>{user.displayName}</Text>
                <Text style={{ color: colors.grey }}>{user.email}</Text>
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 60,
        borderBottomWidth: 1,
        borderColor: colors.lightGrey,
        marginHorizontal: 10,
        marginBottom: 10
    }
})