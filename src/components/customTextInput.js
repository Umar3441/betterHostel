import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '../utils'

export default function CustomTextInput({ placeholder, onChangeText, customStyles, error, ...otherProps }) {


    return (
        <View style={[{ width: '100%' }, customStyles]}>
            <View style={[styles.container]}>
                <TextInput

                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    style={[styles.textStyle]}
                    {...otherProps}


                />
            </View>
            {!!error &&
                <Text style={styles.errorText}>{error}</Text>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: colors.lightGrey,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    textStyle: {
        width: '95%',
        fontWeight: '600',

    },
    errorText: {
        color: 'red',
        paddingLeft: 15
    }
})
