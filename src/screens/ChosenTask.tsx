import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { List, MD3Colors } from 'react-native-paper';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Props, User } from '../types';
// import { saveTodo, setTodos, updateTodo } from '../features/todoReducer';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { delUser, updateUser } from '../features/slice/userReducer';
import { DELETE_USER_BY_ID, UPDATE_USER_BY_ID } from '../features/types';

export default function ChosenTask({ route, navigation }: Props) {
    const { name, id, email } = route.params;
    const [userName, setuserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const dispatch = useDispatch();


    useEffect(() => {

        setuserEmail(email)
        setuserName(name)
    }, [])

    const handleSaveTask = () => {
        let user: User = { id, name: userName, email: userEmail }
        dispatch({ type: UPDATE_USER_BY_ID, payload: user })
    }

    const handleDelUser = () => {

        dispatch({ type: DELETE_USER_BY_ID, payload: { id } })
        navigation.goBack();
    }

    return (
        <View style={styles.screen}>
            <View style={styles.body}>
                <TextInput
                    style={styles.input}
                    onChangeText={setuserName}
                    value={userName}
                    placeholder="To do task..."
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setuserEmail}
                    value={userEmail}
                    placeholder="To do task..."
                />
                <List.Image variant="image" source={{ uri: '/storage/emulated/0/Download/apple_158989157_1001.jpg' }} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSaveTask()}
                >
                    <Text style={styles.buttonText} >Update User</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelUser()}
                >
                    <Text style={styles.buttonText} >Delete User</Text>
                </TouchableOpacity>

            </View>



            <Footer navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        flex: 8,
        width: '100%',
        backgroundColor: '#14141410',
        alignItems: 'center',
        justifyContent: 'center'
    },
    task: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 10,
        marginTop: 30,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#141414',
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 10,
        marginBottom: 30,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: '900'
    }
})