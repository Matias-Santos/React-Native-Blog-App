import React, { useContext, useEffect }from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { Context as BlogContext} from '../context/BlogContext'

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext( BlogContext )

    useEffect(() => {
        getBlogPosts()

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts()
        })

        return () => {
            listener.remove()
        }
    }, [])

    return <View style = { styles.viewStyle }>
        <TouchableOpacity
            style = { styles.buttonStyle }
            onPress={() => { navigation.navigate('Create')}}
        >
            <Text style = { styles.buttonTextStyle }>Add Blog Post</Text>
        </TouchableOpacity>
        <FlatList
            data = { state }
            keyExtractor = {( blogPost => { blogPost.id })}
            renderItem = {({ item }) => {
                return <View >
                    <TouchableOpacity style = { styles.blogView } onPress={() => { navigation.navigate('Show', { id: item.id } )}} >
                        <View>
                            <Text style = { styles.blogTitleStyle }>{ item.title }</Text>
                            <Text style = { styles.blogTextStyle }>{ item.content }</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                            <FontAwesome name = "trash-o" style = { styles.iconStyle }/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            }}
        />
    </View>
}

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('Create')}}>
                <AntDesign name = "plus" style = { styles.plusIconStyle }/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        backgroundColor: '#363636',
    },
    blogView: {
        padding: 10,
        paddingBottom: 30,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#000000',
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        borderRadius: 8,
        margin: 10,
        padding: 10,
        backgroundColor: '#121212',
        alignSelf: 'flex-start'
    },
    buttonTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    blogTitleStyle: {
        marginBottom: 10,
        fontSize: 20,
        color: '#ffffff',
    },
    blogTextStyle: {
        fontSize: 10,
        marginHorizontal: 10,
        color: '#ffffff',
    },
    iconStyle: {
        fontSize: 20,
        color: 'white'
    },
    plusIconStyle: {
        margin: 10,
        fontSize: 25,
        color: "black",
        justifyContent: 'center',
    }
})

export default IndexScreen