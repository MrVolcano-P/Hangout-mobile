import { StyleSheet } from "react-native";

export default StyleSheet.create({
    contentTitle: {
        fontFamily: 'Roboto',
        fontSize: 26,
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#000',
        fontFamily: 'System'
    },
    searchbar: {
        marginVertical: 5,
        borderRadius: 8,
        marginHorizontal: 16,
        height: 40
    }, item: {
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#000',
        fontFamily: 'System',
        marginHorizontal:10
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