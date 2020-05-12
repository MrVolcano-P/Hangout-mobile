import { StyleSheet } from "react-native";

export default StyleSheet.create({
    headReview: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    contentReview: {
        flex: 2,
        flexDirection: 'row',
        height: 100
    },
    imgProfile: {
        marginHorizontal: 10,
        borderRadius: 5,
        width: 50,
        height: 50,
    },
    item: {
        marginVertical: 8,
        marginHorizontal: 16,
    },
    hr: {
        marginHorizontal: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    modal: {
        width: '100%',
        height: 325,
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
    },
    textLength:{
        paddingHorizontal: 0,
        marginHorizontal: 10,
        alignItems:'flex-end'
    }
})