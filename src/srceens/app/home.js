import React, { useState, useEffect, useRef } from 'react'
import { Button, StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import Image from 'react-native-fast-image'
import auth from '@react-native-firebase/auth'
import { colors } from '../../utils'
import Post from '../../components/post'
// import { posts } from '../../data/posts'
import { Viewport } from '@skele/components'
import firestore from '@react-native-firebase/firestore'

import { useSelector, useDispatch } from 'react-redux'
import { addPosts } from '../../redux/actions'







export default function Home({ navigation }) {



    // const [postsData, setPostsData] = useState(posts)
    const [currentIndex, setCurrentIndex] = useState(0)
    const dispatch = useDispatch()

    const user = useSelector(state => state.reducer.user)

    const posts = useSelector(state => state.reducer.posts)



    // const [posts, setposts] = useState([]);

    // console.log('??????', posts)





    useEffect(() => {
        const subscribe = firestore()
            .collection('posts')
            .orderBy('timeStamp', "desc")
            .onSnapshot((querySnapshot) => {

                const postsTemp = []
                querySnapshot.forEach(function (doc) {
                    // console.log("snapshot added ", doc)
                    postsTemp.push({ id: doc.id, ...doc.data() })
                });
                dispatch(addPosts(postsTemp))
            }
            )

        return subscribe

    }

        , [])



    // useEffect(() => {
    //     const subscribe = firestore()
    //         .collection('posts')
    //         .orderBy('timeStamp', "desc")
    //         .onSnapshot((querySnapshot) => {
    //             const postsTemp = []
    //             setposts(querySnapshot.docs.map(function (doc) {
    //                 return { id: doc.id, ...doc.data() }
    //                 // postsTemp.push(doc.data())
    //             }))

    //             dispatch(addPosts(postsTemp))
    //         }
    //         )

    //     return subscribe

    // }

    //     , [])




    // useEffect(() => {
    //     // const subscribe =
    //     firestore()
    //         .collection('posts')
    //         .orderBy('timeStamp', "desc")
    //         .get().then(
    //             (querySnapshot) => {

    //                 const postsTemp = []
    //                 querySnapshot.forEach(function (doc) {
    //                     console.log("snapshot added ", doc)
    //                     postsTemp.push(doc.data())
    //                 });
    //                 dispatch(addPosts(postsTemp))
    //             }
    //         )

    //     // return subscribe

    // }, [])







    const Header = () => {

        return (
            <View style={[styles.headerContainer]}>

                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 30 }}>
                    Home
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

            {posts.length > 0 ?
                <Viewport.Tracker style={{
                    zIndex: -1,
                }}>
                    <FlatList

                        // onViewableItemsChanged={onViewableItemsChanged.current}
                        // viewabilityConfig={
                        //     viewabilityConfig.current
                        // }
                        style={styles.flatListStyles}
                        data={posts}
                        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
                        renderItem={({ item, index }) =>
                            <View style={{ marginBottom: index === posts.length - 1 ? 300 : 0 }}>
                                <Post post={item} />
                            </View>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </Viewport.Tracker>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.grey, fontSize: 18 }}>No Posts to Show!</Text>
                </View>
            }

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
        zIndex: -5


    },
    itemSeperator: {
        width: '90%',
        height: 0.5,
        backgroundColor: colors.grey,
        alignSelf: 'center',
        marginVertical: 10
    }
})
