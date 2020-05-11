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
        marginHorizontal:10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
})