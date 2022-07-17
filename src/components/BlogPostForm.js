import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { Context } from "../context/BlogContext"

const BlogPostForm = ({ initialValues, onSubmit }) => {
    const [ titleState, setTitleState ] = useState( initialValues.title )
    const [ contentState, setContentState ] = useState( initialValues.content )

    return <View style = { styles.viewStyle }>
        <View style = { styles.viewFormStyle }>
            <Text style = { styles.textTitleStyle }>Enter your Blog Title:</Text>
            <TextInput
                style = { styles.inputStyle }
                autoCapitalize = 'words'
                autoCorrect = { false }
                value = { titleState }
                placeholder = 'A Title'
                placeholderTextColor={ '#cccccc'}
                onChangeText = {( newTitle ) => setTitleState(newTitle)}
            />
            <Text style = { styles.textContentStyle }>Enter your Description:</Text>
            <TextInput
                style = { styles.inputStyle }
                autoCapitalize = 'sentences'
                autoCorrect = { false }
                value = { contentState }
                placeholder = 'A Text'
                placeholderTextColor={ '#cccccc'}
                onChangeText = {( newContent ) => setContentState(newContent)}
            />
        </View>
        <TouchableOpacity
            style = { styles.buttonStyle }
            onPress={() => {
                onSubmit(titleState, contentState)
            }}
        >
            <Text style = { styles.buttonTextStyle }>Save Post</Text>
        </TouchableOpacity>

    </View>
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: '#363636',
    },
    viewFormStyle: {
        margin: 10,
        backgroundColor: '#666666',
        borderRadius: 8
    },
    textTitleStyle: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    inputStyle: {
        borderRadius: 8,
        margin: 10,
        padding: 10,
        color: '#ffffff',
        backgroundColor: '#363636'
    },
    textContentStyle: {
        margin: 10,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    buttonStyle: {
        borderRadius: 8,
        margin: 10,
        padding: 10,
        backgroundColor: '#121212',
        alignSelf: 'flex-end'
    },
    buttonTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    }
})

export default BlogPostForm