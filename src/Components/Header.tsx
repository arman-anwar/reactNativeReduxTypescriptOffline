import { Text } from "@react-native-material/core"
import { View,StyleSheet } from "react-native"

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Todo App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height:80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        zIndex: 5
    },
    text: {
        fontSize: 18,
        fontWeight: '900',
        color: '#141414'
    }
})