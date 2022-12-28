import axios from "axios";
import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from "react-redux";
import { GET_USERS } from "../features/types";
import { Props } from "../types";

export default function Footer({ navigation }: Props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_USERS })
    }, [])

    return (
        <View style={styles.footer}>
            <Icon
                name="home"
                size={30}
                color="#141414"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        zIndex: 5,
        borderTopWidth: 1,
        borderTopColor: '#14141410'
    },
    text: {
        fontSize: 18,
        fontWeight: '900'
    }
})