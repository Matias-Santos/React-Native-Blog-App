import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Context } from '../context/BlogContext'

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context)

    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id') )

    return <View style = { styles.viewStyle }>
        <View style = { styles.divStyle }>
            <Text style = { styles.titleStyle }>{ blogPost.title }</Text>
            <Text style = { styles.textStyle }>{ blogPost.content }</Text>
        </View>
    </View>
}

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
        <TouchableOpacity onPress={() => { navigation.navigate('Edit', { id: navigation.getParam('id')})}}>
            <Ionicons name = "pencil" style = { styles.editIconStyle }/>
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: '#363636'
    },
    divStyle: {
        margin: 10,
        borderRadius: 8,
        backgroundColor: '#000000'
    },
    titleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 10,
        color: '#ffffff'
    },
    textStyle: {
        marginHorizontal: 20,
        marginBottom: 20,
        color: '#ffffff'
    },
    editIconStyle: {
        margin: 10,
        fontSize: 24,
        color: 'black',
        justifyContent: 'center'
    }
})

export default ShowScreen