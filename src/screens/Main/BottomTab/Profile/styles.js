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
    },
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
    }, editProfileImage: {
        marginTop: 12,
        width: '100%',
        height: 150,
    }, btn: {
        backgroundColor: '#321069',
        marginHorizontal: 40
    }, icon: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
        bottom: -12,
        right: -12,
        height:30,
        width:30,
        borderRadius:2
    }
});