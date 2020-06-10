import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: 16,
    }, contentTitle: {
        fontFamily: 'Roboto',
        // color: 'white',
        fontSize: 26,
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#000',
        fontFamily: 'System'
        // height:40
    }, modalContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    modal: {
        flex: 1,
        width: '100%',
        height: 500,
        backgroundColor: '#F2F1F0',
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
        // backgroundColor: 'rgba(255, 253, 253, 0.5)',
        borderRadius: 5
    },
    input: {
        paddingHorizontal: 0,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    btn: {
        backgroundColor: '#321069',
        marginHorizontal: 40
    },
    inputDate: {
        paddingHorizontal: 0,
        marginHorizontal: 10,
        marginVertical: 10,
        // backgroundColor:'red'
        borderColor: '#2E8AD8',
    }
})