import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Suggestion = ({ suggestion }) => {
    return (
        <View>
            <View style={styles.postHeaderContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 25, borderWidth: 2, borderColor: colors.primary, overflow: 'hidden' }} >
                        <Image source={{ uri: suggestion.profile_picture }} style={{ width: 40, height: 40, borderRadius: 20 }} resizeMode='cover' />
                    </TouchableOpacity>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>
                            {suggestion.userName}
                        </Text>
                        <Text style={styles.emailText}>
                            {suggestion.userEmail}
                        </Text>
                    </View>
                </View>
                {/* <Entypo name='dots-three-horizontal' size={30} color={colors.grey} onPress={() => console.log('we are three dots in post header', snapCarouselRef.current.currentIndex)} /> */}
            </View>
        </View>
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
});
