import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'

import Image from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'
import ReadMore from 'react-native-read-more-text';
import VideoPlayer from 'react-native-video-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import numbro from 'numbro';
import Carousel from 'react-native-snap-carousel';

import { colors } from '../utils'


import { Viewport } from '@skele/components'
import moment from 'moment';

const ViewportAwareVideo = Viewport.Aware(VideoPlayer)

export default function Post({ post }) {


    console.log('====>>>>>>>>>>', post)

    const [currentIndex, setcurrentIndex] = useState(1)
    const snapCarouselRef = useRef(null)
    const mediaRefs = useRef([])
    mediaRefs.current = []



    const [media, setMedia] = useState(post?.media?.map((content) => {
        return {
            ...content,
            loading: false
        }
    }))

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
                <Entypo name='dots-three-horizontal' size={30} color={colors.grey} onPress={() => console.log('we are three dots in post header', snapCarouselRef.current.currentIndex)} />
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


            </View>

            <View style={styles.reactionContainer}>

                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialCommunityIcons name='heart-outline' size={25} color={colors.grey} />
                    <Text style={{ marginHorizontal: 5, color: colors.grey, fontWeight: '500' }}>{numbro(post.likes).format({
                        spaceSeparated: false,
                        // average: true,
                        thousandSeparated: true,

                    })}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    <MaterialCommunityIcons name='comment-outline' size={22} color={colors.grey} />
                    <Text style={{ marginHorizontal: 5, color: colors.grey, fontWeight: '500' }}>{post?.comments?.length}</Text>
                </View>
            </View>

            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ marginHorizontal: 5, color: colors.grey, fontWeight: '500' }}>{fromDate()}</Text>
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
    }
})
