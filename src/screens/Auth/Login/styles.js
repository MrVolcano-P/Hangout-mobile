import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    containerContent: {
        flexGrow: 1,
        marginHorizontal: 32,
        paddingVertical: 32,
    },
    logoContainer: {
        flex: 0,
        justifyContent: 'flex-start',
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
        flex: 0,
        marginTop: 40,
        marginBottom: 22,
    },
    input: {
        paddingHorizontal: 0,
        marginBottom: 18,
    },
    actionContainer: {
        flex: 1,
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
