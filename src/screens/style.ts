
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        // backgroundColor:'green',
        flex: 1,
        height:100,
        marginTop:10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    barcodeContainer: {
        // backgroundColor:'red',
        flex: 2,
        marginTop:10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        padding: 20,
    },
    task: {
        backgroundColor: 'red',
        color: 'green',
        padding: 15,
        paddingTop: 10,
        marginEnd: 10,
        marginRight: 20
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