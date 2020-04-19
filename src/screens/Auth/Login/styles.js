import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#900',
    },
    containerContent: {
        flexGrow: 1,
        marginHorizontal: 32,
        paddingVertical: 32,
    },
    logoContainer: {
        flex: 0,
        justifyContent: 'flex-start',
        alignItems:'center'
    },
    logo: {
        marginVertical: 18,
        width: 180,
        height: 180,
    },
    welcomeText: {
        fontWeight: '100',
        fontSize: 28,
        color: '#AAA',
    },
    welcomeTextSecondary: {
        fontWeight: '100',
        fontSize: 18,
        color: '#BCBCBC',
    },
    formContainer: {
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
        alignItems:'center'
    },
    loginButtonContainer: {
        width: '70%',
    },
    loginButton: {
        borderRadius: 999,
    },
    registerButton: {
        marginVertical: 4,
        paddingVertical: 20,
    },
    registerText: {
        color: '#BBB',
        fontSize: 12,
    },
})
