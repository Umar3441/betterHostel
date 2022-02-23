import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, FlatList, Text, View, StatusBar, ScrollView } from 'react-native'
import auth from '@react-native-firebase/auth'
import { colors } from '../../utils'
import Image from 'react-native-fast-image'
import Suggestion from '../../components/suggestion'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'


export default function Suggestions({ navigation }) {

    const [suggestions, setSuggestions] = useState([])
    const user = useSelector(state => state.reducer.user)

    useEffect(() => {
        const subscribe = firestore()
            .collection('suggestions')
            .orderBy('timeStamp', "desc")
            .onSnapshot((querySnapshot) => {
                const postsTemp = []
                setSuggestions(querySnapshot.docs.map(function (doc) {
                    return { id: doc.id, ...doc.data() }
                    // postsTemp.push(doc.data())
                }))

                // dispatch(addPosts(postsTemp))
            }
            )

        return subscribe

    }

        , [])

    const Header = () => {

        return (
            <View style={[styles.headerContainer]}>

                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 30 }}>
                    Suggestions
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 25, position: 'absolute', top: '45%', right: '4%', borderWidth: 2, borderColor: colors.white, overflow: 'hidden' }} >
                    {
                        user.photoURL ?
                            <Image source={{ uri: user.photoURL }} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode='cover' />
                            :
                            <Image source={images.dummyProfile} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode='cover' />

                    }

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
            <FlatList

                // onViewableItemsChanged={onViewableItemsChanged.current}
                // viewabilityConfig={
                //     viewabilityConfig.current
                // }
                style={styles.flatListStyles}
                data={suggestions}
                ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
                renderItem={({ item, index }) =>
                    <View style={{ marginBottom: index === suggestions.length - 1 ? 300 : 0, width: '100%' }}>
                        <Suggestion suggestion={item} />
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
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
    flatListStyles: {

        paddingTop: 20,
        zIndex: -5,



    },
    itemSeperator: {
        width: '90%',
        height: 0.5,
        backgroundColor: colors.grey,
        alignSelf: 'center',
        marginVertical: 10
    }
})
