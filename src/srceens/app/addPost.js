import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'


export default function AddPost() {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text>Add Post</Text>
            <Button title='touch' onPress={() => auth().signOut()} />
        </View>
    )
}

const styles = StyleSheet.create({})