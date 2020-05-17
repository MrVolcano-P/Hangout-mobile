import { StyleSheet } from "react-native";

export default StyleSheet.create({
    // picContainer:{
    //     flex: 1,
    //     alignItems:'center'
    // },
    // pic: {
    //     width: 180,
    //     height: 200
    // },
    // bottomContainer:{
    //     flex:1,
    //     justifyContent:'center',
    //     alignItems: 'center'
    // },
    // input:{
    //     width:100,
    //     height:100
    // }, modal: {
    //     width: '100%',
    //     height: 300,
    //     backgroundColor: 'white',
    // },
    // modaltitle: {
    //     fontSize: 18,
    // },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    containerContent: {
        flexGrow: 1,
        paddingBottom: 24,
    },
    headerContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 20,
    },
    headerInsetContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    profileContainer: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: '#FFF',
    },
    profileUsernameText: {
        color: '#888',
        fontSize: 16,
    },
    profileNameText: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    profileInfoContainer: {
        marginTop: 4,
        marginLeft: -8,
    },
    profileInfoChip: {
        backgroundColor: '#FFF',
        padding: 0,
    },
    listContainer: {
        marginHorizontal: 16,
        marginTop: 0,
    },
});