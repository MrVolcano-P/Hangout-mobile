import React, { useState, useCallback } from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import styles from './styles'
import { Button } from 'react-native-elements'
import authAPI from 'src/api/auth'
import profileAPI from 'src/api/profile'
import pubAPI from 'src/api/pub'
import { useDispatch } from 'react-redux'
import { setAuthToken } from 'src/actions/authToken'
import { setProfile } from 'src/actions/profile'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';
import { setMyPub } from '../../../actions/myPub'

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

export default function Login() {
    const [username, setUsername] = useState('')
    const checkUsername = username && username.length > 0;
    const [userFocus, setUserFocus] = useState(false);
    const [password, setPassword] = useState('')
    const checkPassword = password && password.length > 4
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isLoadingLogin, setIsLoadingLogin] = useState(false)
    const Login = useCallback(() => {
        setIsLoadingLogin(true)
        console.log({ username, password })
        authAPI.login({ "username": username, "password": password })
            .then(({ token }) => {
                dispatch(setAuthToken(token))
                console.log(token)
                profileAPI.get(token)
                    .then(res => {
                        console.log(res)
                        dispatch(setProfile(res))
                        getMypubfunc(res, token)
                    })
                    .catch(err => console.log(err))
            })
            .catch(error => {
                console.log(error)
                Alert.alert("Username or password not correct")
            })
            .finally(() => {
                setIsLoadingLogin(false)
            })
    }, [username, password, navigation, dispatch])
    const getMypubfunc = (res, token) => {
        if (res.role === 'owner') {
            pubAPI.getmypub(token).then(res => {
                console.log(res)
                dispatch(setMyPub(res))
                navigation.navigate('BottomTab')
            }).catch(err => console.log(err))
        } else {
            navigation.navigate('BottomTab')
        }
    }
    const register = useCallback(() => {
        navigation.navigate('Register')
    }, [navigation])
    const pubregister = useCallback(() => {
        navigation.navigate('PubRegister')
    }, [navigation])

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        resizeMode="contain"
                        source={require('src/assets/logo_square.png')}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Input
                        style={styles.input}
                        label='Username'
                        status={!userFocus || checkUsername ? 'info' : 'danger'}
                        caption={!userFocus || checkUsername ? null : 'Can not be empty'}
                        autoCapitalize='none'
                        placeholder='example'
                        // accessoryRight={PersonIcon}
                        captionIcon={!userFocus || checkUsername ? null : AlertIcon}
                        value={username}
                        onChangeText={setUsername}
                        onFocus={() => { setUserFocus(true); }}
                    />
                    <Input
                        style={styles.input}
                        label='Password'
                        status={!passwordFocus || checkPassword ? 'info' : 'danger'}
                        caption={!passwordFocus || checkPassword ? null : 'Can not be empty'}
                        autoCapitalize='none'
                        placeholder='password'
                        // accessoryRight={PersonIcon}
                        accessoryRight={renderIcon}
                        captionIcon={!passwordFocus || checkPassword ? null : AlertIcon}
                        secureTextEntry={secureTextEntry}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => { setPasswordFocus(true); }}
                    />
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        title="LOGIN"
                        raised
                        containerStyle={styles.loginButtonContainer}
                        color="#F2F1F0"
                        buttonStyle={styles.btn}
                        onPress={Login}
                        loading={isLoadingLogin}
                        disabled={!checkUsername || !checkPassword}
                    />
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={register}
                    >
                        <Text style={styles.registerText}>REGISTER A NEW ACCOUNT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={pubregister}
                    >
                        <Text style={styles.registerText}>BECOME OWNER</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}
