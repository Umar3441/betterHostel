import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, images } from '../utils';
import Image from 'react-native-fast-image'
import ReadMore from 'react-native-read-more-text';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


const Suggestion = ({ suggestion }) => {


    const [voted, setVoted] = useState(false)
    const [upVoted, setupVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)

    const [upVotesCount, setUpVotesCount] = useState(0)
    const [downVotesCount, setDownVotesCount] = useState(0)
    const [profilePic, setProfilePic] = useState(null)


    useEffect(() => {
        firestore().collection('users').doc(suggestion.user)
            .get().then(
                (doc) => setProfilePic(doc.data()?.photoURL)
            )
    }, [suggestion])



    useEffect(() => {

        let upVotesCount = 0
        let downVotesCount = 0
        for (let index = 0; index < suggestion.votes.length; index++) {
            const element = suggestion.votes[index];

            if (element.voted === 'up') {
                upVotesCount++
            }
            if (element.voted === 'down') {
                downVotesCount++
            }


            if (element.id === auth().currentUser.uid) {

                setVoted(true)

                if (element.voted === 'up') {
                    setupVoted(true)


                }
                if (element.voted === 'down') {
                    setDownVoted(true)

                }
            }

        }


        setUpVotesCount(upVotesCount)
        setDownVotesCount(downVotesCount)

    }, [suggestion])


    const vote = (vote) => {

        if (voted) {
            return
        }




        firestore().collection('suggestions')
            .doc(suggestion.id)
            .update(
                {
                    votes: [...suggestion.votes, {
                        id: auth().currentUser.uid,
                        voted: vote
                    }]
                }
            )
            .then(
                () => console.log('voted')
            ).catch(
                (error) => console.log(error)
            )
    }








    return (
        <View>
            <View style={styles.postHeaderContainer}>
                <View style={{ flexDirection: 'row' }}>

                    {!suggestion.isAnonymous ?
                        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 25, borderWidth: 1, borderColor: colors.primary, overflow: 'hidden' }} >
                            {profilePic ?
                                <Image source={{ uri: profilePic }} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode='cover' />
                                : <Image source={images.dummyProfile} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode='cover' />
                            }
                        </TouchableOpacity>
                        :
                        <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 25, borderWidth: 0, overflow: 'hidden' }} >
                            <MaterialCommunityIcons name='guy-fawkes-mask' size={35} />
                        </View>
                    }
                    {!suggestion.isAnonymous ? <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>
                            {suggestion.userName}
                        </Text>
                        <Text style={styles.emailText}>
                            {suggestion.userEmail}
                        </Text>
                    </View> :
                        <View style={[styles.nameContainer, { justifyContent: 'center' }]}>
                            <Text style={styles.nameText}>
                                Anonymous
                            </Text>

                        </View>

                    }
                </View>
                {/* <Entypo name='dots-three-horizontal' size={30} color={colors.grey} onPress={() => console.log('we are three dots in post header', snapCarouselRef.current.currentIndex)} /> */}
            </View>

            <View style={styles.titleContainer}>

                <View style={{ marginRight: 5 }}>
                    <View style={{ alignItems: 'center', marginBottom: 30 }}>
                        <AntDesign name='caretup' size={30} color={upVoted ? colors.primary : colors.grey} onPress={() => vote('up')} />
                        <Text style={{ color: colors.grey }}>{upVotesCount}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: colors.grey }}>{downVotesCount}</Text>
                        <AntDesign name='caretdown' size={30} color={downVoted ? colors.primary : colors.grey} onPress={() => vote('down')} />

                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <ReadMore

                        numberOfLines={2}
                        renderTruncatedFooter={(handlePress) => { return <Text onPress={handlePress} style={{ color: 'grey' }}>show more</Text> }}
                        renderRevealedFooter={(handlePress) => { return <Text onPress={handlePress} style={{ color: 'grey' }}>show less</Text> }}
                    >
                        <Text style={styles.titleText}>{suggestion.suggestion}</Text>
                    </ReadMore>
                </View>

            </View>
        </View >
    );
};

export default Suggestion;

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
        // width: '100%',
        marginVertical: 5,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        flexDirection: 'row',
        // backgroundColor: 'red',
        // marginHorizontal: 10
    },
    titleText: {
        fontSize: 15,
        color: colors.lightBlack,
        lineHeight: 18,
        textAlign: 'left',

    },
});
