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
    }, content: {
        flex: 1,
        width: '100%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    contentView1: {
        flex: 0.5,
        borderRightColor: 'black',
        borderRightWidth: 2,
        alignItems: 'center'
    },
    contentView2: {
        flex: 3,
        marginLeft: 10
    },
    item: {
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
        color: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#fff',
        fontFamily: 'System',
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F1F0'
    }, nopartyTitle: {
        fontFamily: 'Roboto',
        fontSize: 26,
        color: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textShadowColor: '#fff',
        fontFamily: 'System'
    }, editProfileImage: {
        marginTop: 12,
        width: '100%',
        height: 150,
    }, btn: {
        backgroundColor: '#321069',
        marginHorizontal: 40
    },
    searchbar: {
        marginVertical: 5,
        borderRadius: 8,
        marginHorizontal: 16,
        height: 40
    }
})