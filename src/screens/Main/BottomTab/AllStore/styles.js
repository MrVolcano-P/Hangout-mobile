import { StyleSheet } from "react-native";

export default StyleSheet.create({
    contentTitle: {
        fontFamily: 'Roboto',
        // color: 'white',
        fontSize: 26,
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#000',
        fontFamily: 'System'
        // height:40
    },
    searchbar: {
        marginVertical: 5,
        borderRadius: 8,
        marginHorizontal: 16,
        height: 40
    }, item: {
        // backgroundColor: '#f9c2ff',
        // padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // justifyContent: 'center',
    },
    title: {
        fontSize: 24,
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
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F1F0'
    }
});