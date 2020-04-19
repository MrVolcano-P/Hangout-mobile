import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#900',
    },
    contentContainerStyle: {
        flexGrow: 1,
        // paddingBottom: 16,
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 32,
        textAlign:'center'
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
        backgroundColor: 'rgba(255, 253, 253, 0.5)',
        borderRadius:5
    },
    input: {
        paddingHorizontal: 0,
        marginHorizontal:10,
        marginVertical: 10,
    },
    actionContainer: {
        marginTop: 24,
        alignItems:'center'
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
        color: '#BBB',
        fontSize: 12,
    },
})
