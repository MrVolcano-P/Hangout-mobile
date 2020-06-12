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
        marginVertical: 4,
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
    },commentItem: {
        marginVertical: 4,
        marginHorizontal: 16,
    },
    commentHeader: {
        flexDirection: 'row',
        padding: 10,
    },
    commentAuthorContainer: {
        flex: 1,
        marginHorizontal: 16,
    },
    commentReactionsContainer: {
        flexDirection: 'row',
        marginTop: 8,
        marginHorizontal: -8,
        marginVertical: -8,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
})