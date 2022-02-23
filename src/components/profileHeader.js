import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Image from 'react-native-fast-image'
import { colors } from '../utils'
import auth from '@react-native-firebase/auth'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ProfileHeader = () => {
    return (
        <View style={styles.container}>
            <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: 150, height: 150, borderRadius: 70 }}>
                <Image source={{ uri: 'https://source.unsplash.com/1024x768/?man' }} style={{ width: 150, height: 150, borderRadius: 150, }} resizeMode='cover' />
                <TouchableOpacity style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 2, right: 13, backgroundColor: colors.white, borderRadius: 15 }} >
                    <AntDesign name='pluscircle' size={25} color={colors.primary} />
                </TouchableOpacity>
            </View>
            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.grey, marginTop: 10 }}>{auth().currentUser.displayName}</Text>
                <Text style={{ color: colors.grey }}>{auth().currentUser.email}</Text>
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