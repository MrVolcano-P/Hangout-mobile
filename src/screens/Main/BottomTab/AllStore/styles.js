import { StyleSheet } from "react-native";

export default StyleSheet.create({
    contentTitle: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 30,
    },
    searchbar: {
        margin: 10,
        borderRadius: 8,
    }, item: {
        // backgroundColor: '#f9c2ff',
        // padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#000',
        fontFamily: 'System'
        // fontWeight: 'bold',
    }, image: {
        flex: 1,
        width: '100%',
        height: 100,
        justifyContent: 'center',
    }
});