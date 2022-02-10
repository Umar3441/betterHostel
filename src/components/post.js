import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions, StatusBar, KeyboardAvoidingView, TextInput, ScrollView, Keyboard } from 'react-native'

import Image from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'
import ReadMore from 'react-native-read-more-text';
import VideoPlayer from 'react-native-video-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import numbro from 'numbro';
import Carousel from 'react-native-snap-carousel';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from '../utils'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'




import { Viewport } from '@skele/components'
import moment from 'moment';
import Modal from 'react-native-modal';

const ViewportAwareVideo = Viewport.Aware(VideoPlayer)

export default function Post({ post }) {


    console.log('====>>>>>>>>>>', post)

    const [currentIndex, setcurrentIndex] = useState(1)
    const snapCarouselRef = useRef(null)
    const mediaRefs = useRef([])
    mediaRefs.current = []
    const userId = auth().currentUser.uid;
    const postId = post.id;
    const [commentText, setCommentText] = useState();
    const [showCommentsModal, setShowCommentsModal] = useState(false);



    const [media, setMedia] = useState([])
    const [liked, setLiked] = useState(false);


    const [statusBarContent, setstatusBarContent] = useState('dark-content');



    const comments = post.comments

    useEffect(() => {
        setMedia(post?.media?.map((content) => {
            return {
                ...content,
                loading: false
            }
        }))

        checkLiked()
    }, [post]);



    const checkLiked = () => {
        let liked = false;
        post?.likes?.map(like => {
            if (like === userId) {
                liked = true

            }
        })
        setLiked(liked)
    }


    const like = () => {
        console.log('liking', postId, '--->', userId)


        if (!liked) {
            firestore().collection('posts').doc(postId).update(
                {
                    likes: [...post.likes, userId],
                }
            )
        } else {
            const likes = post.likes.filter(like => like !== userId)

            console.log('------>', likes)

            firestore().collection('posts').doc(postId).update(
                {
                    likes: likes,
                }
            )
        }
    }


    const addComment = () => {


        if (!commentText) {
            return
        }


        firestore().collection('posts').doc(postId).update(
            {
                comments: [
                    ...post.comments
                    ,
                    {
                        userId: auth()?.currentUser?.uid,
                        userName: auth()?.currentUser?.displayName,
                        userAvatar: auth().currentUser.photoURL,
                        comment: commentText,
                        timeStamp: moment().toISOString(),
                    }
                ]
            }
        ).then(
            () => {

                // Keyboard.dismiss()
                setCommentText(null)
            }
        )

    }


    const fromDate = () => {
        const span = moment(post.timeStamp).fromNow().toString().split(' ')[1];
        // console.log(span)
        if (span === 'years' || span === 'year' || span === 'months' || span === 'month') {
            return moment(post.timeStamp).format('MM/DD/YYYY')
        } else {
            return moment(post.timeStamp).fromNow()
        }
    }

    const addToRef = (ref, index) => {
        mediaRefs.current[index] = ref
    }

    const renderSnapItem = (item, index) => {

        return (
            <>
                {item?.loading ? <ActivityIndicator size='large'
                    color={colors.white}
                    style={{
                        position: 'absolute',
                        top: '2%',
                        left: '2%',
                        zIndex: 100

                    }} /> : null}

                {item?.type === 'image' ?
                    <Image
                        style={{ width: '100%', height: '100%', borderRadius: 20 }}
                        source={{ uri: item?.url }}
                    /> :
                    <ViewportAwareVideo
                        innerRef={(ref) => addToRef(ref, index)}
                        // onViewportEnter={() => mediaRefs?.current[1]?.resume()}
                        onViewportLeave={() => mediaRefs?.current[snapCarouselRef?.current?.currentIndex]?.pause()}
                        disableSeek={true}
                        customStyles={
                            {
                                playButton: {
                                    backgroundColor: colors.primary
                                },
                                seekBarProgress: {
                                    backgroundColor: colors.white
                                },
                                seekBarKnob: {
                                    backgroundColor: colors.white
                                },
                                controls: {
                                    backgroundColor: colors.primary,
                                    borderRadius: 10,

                                    position: 'absolute',
                                    bottom: 10,
                                    right: 10,
                                    left: 10
                                },

                                videoWrapper: {
                                    backgroundColor: 'black',
                                    borderRadius: 20
                                },
                                seekBarFullWidth: {
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 10,
                                    left: 10

                                },

                            }
                        }
                        pauseOnPress
                        video={{
                            uri: item?.url
                        }}
                        style={{ width: '100%', height: '100%', borderRadius: 20, }}
                        resizeMode='contain'
                        thumbnail={{ uri: item?.thumbnail }}

                        onLoadStart={() => setMedia(media.map((content, ind) => {
                            if (ind === index) {
                                return {
                                    ...content,
                                    loading: true
                                }
                            } else {
                                return {
                                    ...content,

                                }
                            }
                        }))}

                        onLoad={() => setMedia(media.map((content, ind) => {
                            if (ind === index) {
                                return {
                                    ...content,
                                    loading: false
                                }
                            } else {
                                return {
                                    ...content,
                                }
                            }
                        }))}
                    />}
            </>

        )
    }



    return (
        <View style={[styles.container,]}>
            {/* <StatusBar translucent barStyle={statusBarContent} backgroundColor='transparent' /> */}
            <View style={styles.postHeaderContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 25, borderWidth: 2, borderColor: colors.primary, overflow: 'hidden' }} >
                        <Image source={{ uri: post.profile_picture }} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode='cover' />
                    </TouchableOpacity>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>
                            {post.userName}
                        </Text>
                        <Text style={styles.emailText}>
                            {post.userEmail}
                        </Text>
                    </View>
                </View>
                {/* <Entypo name='dots-three-horizontal' size={30} color={colors.grey} onPress={() => console.log('we are three dots in post header', snapCarouselRef.current.currentIndex)} /> */}
            </View>
            <View style={styles.titleContainer}>
                <ReadMore

                    numberOfLines={2}
                    renderTruncatedFooter={(handlePress) => { return <Text onPress={handlePress} style={{ color: 'grey' }}>show more</Text> }}
                    renderRevealedFooter={(handlePress) => { return <Text onPress={handlePress} style={{ color: 'grey' }}>show less</Text> }}
                >
                    <Text style={styles.titleText}>{post.caption}</Text>
                </ReadMore>

            </View>

            {media?.length > 0 ?
                <View style={styles.mediaContainer}>

                    {media?.length > 1 ? <View style={styles.indexContainer}>
                        <Text style={[styles.mediumGray, { color: 'white' }]}>{currentIndex} / {media.length}</Text>
                    </View> : null}

                    <Carousel
                        // layoutCardOffset={100}
                        lockScrollWhileSnapping={true}
                        layout={'default'}
                        style={{ borderRadius: 20 }}
                        ref={snapCarouselRef}
                        data={media}
                        onSnapToItem={(item) => {
                            setcurrentIndex(item + 1)
                            mediaRefs?.current[item - 1]?.pause()
                            mediaRefs?.current[item + 1]?.pause()


                        }}
                        renderItem={({ item, index }) => renderSnapItem(item, index)}
                        sliderWidth={Dimensions.get('screen').width}
                        itemWidth={Dimensions.get('screen').width - 10}
                    />


                </View> : null}

            <View style={styles.reactionContainer}>

                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                    {liked ?
                        <MaterialCommunityIcons name='heart' size={25} color={colors.red} onPress={() => like()} />
                        : <MaterialCommunityIcons name='heart-outline' size={25} color={colors.grey} onPress={() => like()} />}
                    <Text style={{ marginHorizontal: 5, color: colors.grey, fontWeight: '500' }}>{post?.likes?.length}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    <MaterialCommunityIcons name='comment-outline' size={22} color={colors.grey} onPress={() => setShowCommentsModal(true)} />
                    <Text style={{ marginHorizontal: 5, color: colors.grey, fontWeight: '500' }}>{post?.comments?.length}</Text>
                </View>
            </View>

            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ marginHorizontal: 5, color: colors.grey, fontWeight: '500' }}>{fromDate()}</Text>
            </View>

            <Modal
                animationType={"slide"}
                visible={showCommentsModal}
                style={styles.commentsModal}

            >

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.commentsContainer}>

                    <MaterialCommunityIcons name='close' size={30} onPress={() => setShowCommentsModal(false)} style={{ position: 'absolute', top: 10, right: 20 }} />

                    <View style={{ width: 30, height: 10, backgroundColor: colors.grey, alignSelf: 'center', borderRadius: 20 }} />

                    <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center', color: colors.black, marginVertical: 5 }}>Comments</Text>

                    <ScrollView showsVerticalScrollIndicator={false}>


                        {
                            comments.map((comment, index) => <CommentBody key={index} comment={comment} />)
                        }
                    </ScrollView>
                    <View style={styles.commentInput}>
                        <TextInput placeholder='Comment' value={commentText} onChangeText={(text) => setCommentText(text)} multiline={true} style={{ backgroundColor: colors.lightGrey, flex: 7, padding: 10, paddingTop: 10, borderRadius: 10, alignItems: 'center' }} />
                        <View style={{ flex: 1, marginHorizontal: 5 }}>
                            <FontAwesome name='send' size={30} color={colors.primary} onPress={() => addComment()} />
                        </View>


                    </View>
                </KeyboardAvoidingView>

            </Modal>

        </View>
    )
}



const CommentBody = ({ comment }) => {
    return (
        <View style={styles.commentContentContainer}>

            <View style={styles.userAvatar}>
                <Image source={{ uri: comment.userAvatar }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
            </View>

            <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
                <Text style={{ color: colors.grey, fontWeight: 'bold', fontSize: 18 }}>{comment.userName}</Text>
                <Text style={{ color: colors.grey }}>{moment(comment.timeStamp).fromNow(true)}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, marginTop: 10 }}>
                <Text style={{ textAlign: 'justify' }}>{comment.comment} </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: colors.white,
        borderRadius: 20,
    },
    postHeaderContainer: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    nameContainer: {
        marginLeft: 5
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.grey
    },
    emailText: {

        fontWeight: '500',
        color: colors.grey

    },
    titleContainer: {
        width: '100%',
        marginVertical: 5,
        backgroundColor: colors.white,
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 15,
        color: colors.lightBlack,
        lineHeight: 18
    },
    mediaContainer: {
        width: '100%',
        height: 300,
        // borderRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
        marginBottom: 2

    },
    indexContainer:
    {
        width: 50,
        height: 30,
        backgroundColor: colors.grey,
        borderRadius: 5,
        position: 'absolute',
        right: 15,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200

    },
    mediumGray: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.grey
    },
    reactionContainer: {
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'red',
        marginVertical: 5,
        paddingHorizontal: 20,
    },

    commentsModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: Dimensions.get('screen').width,
        alignSelf: 'center',
        marginVertical: 0,
        marginTop: getStatusBarHeight(),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',



    },
    commentsContainer: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: colors.white,
        justifyContent: 'space-between',



    },
    commentContentContainer:
    {
        width: Dimensions.get('screen').width - 35,
        // height: 140,
        paddingVertical: 20,
        paddingLeft: 40,
        marginVertical: 10,
        backgroundColor: colors.white,
        borderRadius: 20,
        // borderColor: colors.primary,
        // borderWidth: 1,
        marginLeft: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    userAvatar: {
        backgroundColor: colors.white,
        width: 55,
        height: 55,
        borderRadius: 10,
        position: 'absolute',
        top: 15,
        left: -20,
        overflow: 'hidden',
        borderColor: colors.grey,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    commentInput:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20
    }
})
