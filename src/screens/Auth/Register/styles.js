import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f1f0',
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 32,
        textAlign: 'center'
    },
    subText: {
        fontSize: 20,
        marginHorizontal: 32,
    },
    registerImage: {
        marginTop: 18,
        width: 240,
        height: 250,
    },
    contentContaier: {
        marginTop: 40,
        marginBottom: 32,
    },
    formContainer: {
        marginTop: 18,
        marginHorizontal: 32,
        marginBottom: 22,

        borderRadius: 5
    },
    input: {
        paddingHorizontal: 0,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    actionContainer: {
        marginTop: 24,
        alignItems: 'center'
    },
    registerButtonContainer: {
        width: '70%',
    },
    registerButton: {
        borderRadius: 999,
    },
    backButton: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backText: {
        color: '#321069',
        fontSize: 12,
    }, btn: {
        backgroundColor: '#321069',
    },
    inputDate: {
        paddingHorizontal: 0,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: '#2E8AD8',
    }, image: {
        flex: 1,
        width: 150,
        height: 150,
        justifyContent: 'center',
    },
    headerInsetContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    }, icon: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position: 'absolute',
        bottom: -12,
        right: -12,
        height: 30,
        width: 30,
        borderRadius: 2
    }
})
