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
    },modalContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    modal: {
        width: '100%',
        height: 500,
        backgroundColor: 'white',
    },
    modalTop: {
        flex: 0.5,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        justifyContent: 'flex-start'
    },
    modaltitle: {
        fontSize: 18,
    }, formContainer: {
        flex: 3,
        marginTop: 18,
        marginHorizontal: 32,
        marginBottom: 22,
        backgroundColor: 'rgba(255, 253, 253, 0.5)',
        borderRadius: 5
    },
    input: {
        paddingHorizontal: 0,
        marginHorizontal: 10,
        marginVertical: 10,
    },content: {
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
    }
})