import React from 'react'
import { Button, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import Image from 'react-native-fast-image'
import auth from '@react-native-firebase/auth'
import { colors } from '../../utils'
import Post from '../../components/post'
import { posts } from '../../data/posts'




export default function Home() {




    const Header = () => {

        return (
            <View style={[styles.headerContainer]}>

                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 30 }}>
                    Home
                </Text>
                <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 25, position: 'absolute', top: '45%', right: '4%', borderWidth: 2, borderColor: colors.white, overflow: 'hidden' }} >
                    <Image source={{ uri: 'https://source.unsplash.com/1024x768/?person' }} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode='cover' />
                </TouchableOpacity>
                <View style={styles.subHeader1} />
                <View style={styles.subHeader2} />
            </View >
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
            <Header />
            <View style={{ marginTop: 30 }}>
                <Post post={posts[0]} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
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
})
