import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Header from '../Components/Header';
import { Props, User } from '../types';
import { useSelector } from 'react-redux'
import { RootState } from '../features/store';
import { Button, Text, TextInput } from "@react-native-material/core";
import Footer from '../Components/Footer';
import { createUser } from '../features/slice/userReducer';

export default function Home({ navigation }: Props) {
    const usersList = useSelector((state: RootState) => state.users.userList)
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');

    const renderItem = (data: any) => {
        return (
            <TouchableOpacity
                style={styles.task}
                onPress={() => handleChooseTask(data.item)}
            >
                <Text>{data.item.id + ' - ' + data.item.name} </Text>
            </TouchableOpacity>
        )
    }
    const handleSaveTask = () => {
        dispatch(createUser({ name: userName }) )
        setUserName('');
    }

    const handleChooseTask = (task: User) => {
        navigation.navigate('ChosenTask', task);
    }

    return (
        <View style={styles.screen}>
            <Header />
            <View style={styles.body}>
                <TextInput
                    style={styles.input}
                    onChangeText={setUserName}
                    value={userName}
                    placeholder="User Name..."
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSaveTask()}
                >
                    <Text style={styles.buttonText} >Submit</Text>
                </TouchableOpacity>
                <FlatList
                    data={[...usersList]}
                    renderItem={renderItem}
                    keyExtractor={(item, index)=> index.toString()}
                />
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
        backgroundColor: '#14141410'
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