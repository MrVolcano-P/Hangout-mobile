import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f1f0',
    },
    contentContainerStyle: {
        flexGrow: 1,
        // paddingBottom: 16,
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
        // backgroundColor: 'rgba(50, 16, 105, 0.5)',

        borderRadius: 5
    },
    input: {
        paddingHorizontal: 0,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    actionContainer: {
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
        // backgroundColor:'red'
        borderColor: '#2E8AD8',
    }, image: {
        flex: 1,
        width: '100%',
        height: 100,
        justifyContent: 'center',
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
