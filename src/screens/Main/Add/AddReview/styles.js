import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: 16,
    }, modal: {
        flex: 1,
        width: '100%',
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
        borderRadius: 5
    },
    input: {
        paddingHorizontal: 0,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    textLength: {
        paddingHorizontal: 0,
        marginHorizontal: 10,
        alignItems: 'flex-end'
    }, btn: {
        backgroundColor: '#321069',
        marginHorizontal: 40
    }
})