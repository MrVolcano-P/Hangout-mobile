import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: 16,
    },
    picContainer:{
        flex: 1,
        alignItems:'center'
    },
    pic: {
        width: 180,
        height: 200
    },
    bottomContainer:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    formContainer: {
        marginTop: 18,
        marginHorizontal: 32,
        marginBottom: 22,
        backgroundColor: 'rgba(255, 253, 253, 0.5)',
        borderRadius:5
    },
    input: {
        paddingHorizontal: 0,
        marginHorizontal:10,
        marginVertical: 10,
    }
})