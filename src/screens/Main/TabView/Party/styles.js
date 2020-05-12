import { StyleSheet } from "react-native";

export default StyleSheet.create({
    content: {
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
        marginHorizontal: 8,
    },
    title: {
        fontSize: 18,
        color: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#fff',
        fontFamily: 'System',
    }
    , modal: {
        width: '100%',
        height: 500,
        backgroundColor: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal:20
    },
    modalTop: {
        flex: 0.5,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        justifyContent: 'flex-start'
    },
    modaltitle: {
        fontSize: 18,
    },
    itemContainer: {
        flex: 1,
        height: 110,
    },
});