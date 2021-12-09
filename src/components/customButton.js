import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../utils'

const CustomButton = ({ title, onPress, loading }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {loading ?
                <ActivityIndicator color={colors.white} />
                : <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                    {title}
                </Text>

            }
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        width: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 100
    }
})
