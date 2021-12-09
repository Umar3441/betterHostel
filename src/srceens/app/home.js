import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { colors } from '../../utils'

export default function Home() {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: colors.primary }}>
            <Text>Home</Text>
            <Button title='touch' onPress={() => auth().signOut()} />
        </View>
    )
}

const styles = StyleSheet.create({})
