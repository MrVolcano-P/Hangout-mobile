import React, { useState, useCallback, useRef } from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import styles from './styles'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import authAPI from 'src/api/auth'
import profileAPI from 'src/api/profile'
import { useDispatch } from 'react-redux'
import { setAuthToken } from 'src/actions/authToken'
import { setProfile } from 'src/actions/profile'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import colors from 'src/themes/colors'


export default function Login() {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [ isLoadingLogin, setIsLoadingLogin ] = useState(false)

    const passwordInput = useRef()

    const login = useCallback(() => {
        if (username && password) {
            setIsLoadingLogin(true)
            authAPI.login(username, password)
                .then(({ token }) => {
                    dispatch(setAuthToken(token))
                    profileAPI.get(token)
                        .then((profile) => {
                            dispatch(setProfile(profile))
                            navigation.navigate('AllWallet')
                        })
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.data.messages.includes('incorrect/username')) {
                            Alert.alert(
                                'กรุณาตรวจสอบข้อมูล',
                                'Username ไม่ถูกต้อง',
                            )
                        }
                        if (error.response.data.messages.includes('incorrect/password')) {
                            Alert.alert(
                                'กรุณาตรวจสอบข้อมูล',
                                'Password ไม่ถูกต้อง',
                            )
                        }
                    }
                    else {
                        Alert.alert(
                            'ไม่สามารถเชื่อมต่ออินเทอร์เน็ต',
                            'ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้ กรุณาตรวจสอบการเชื่อมต่อของท่านอีกครั้ง',
                        )
                    }
                })
                .finally(() => {
                    setIsLoadingLogin(false)
                })
        }
        else {
            Alert.alert(
                'กรุณาตรวจสอบข้อมูล',
                'กรุณากรอก Username และ Password ให้ครบถ้วน',
            )
        }
    }, [ username, password, navigation, dispatch ])

    register = useCallback(() => {
        navigation.navigate('Register')
    }, [ navigation ])

    return (
        // <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
        //     <SafeAreaView style={styles.container}>
        //         <View style={styles.logoContainer}>
        //             <Image
        //                 style={styles.logo}
        //                 resizeMode="contain"
        //                 source={require('src/assets/logo.png')}
        //             />
        //             <Text style={styles.welcomeTextSecondary}>
        //                 WELCOME USER
        //             </Text>
        //             <Text style={styles.welcomeText}>
        //                 SIGN IN HERE
        //             </Text>
        //         </View>
        //         <View style={styles.formContainer}>
        //             <TextInput
        //                 label="Username"
        //                 mode="outlined"
        //                 style={styles.input}
        //                 value={username}
        //                 onChangeText={setUsername}
        //                 returnKeyType="next"
        //                 textContentType="username"
        //                 autoCapitalize="none"
        //                 onSubmitEditing={() => passwordInput.current.focus()}
        //             />
        //             <TextInput
        //                 ref={passwordInput}
        //                 label="Password"
        //                 mode="outlined"
        //                 secureTextEntry
        //                 style={styles.input}
        //                 value={password}
        //                 onChangeText={setPassword}
        //                 returnKeyType="done"
        //                 textContentType="password"
        //                 autoCapitalize="none"
        //                 onSubmitEditing={login}
        //             />
        //         </View>
        //         <View style={styles.actionContainer}>
        //             <Button
        //                 title="LOGIN"
        //                 ViewComponent={LinearGradient}
        //                 linearGradientProps={{
        //                     colors: [ colors.secondary, colors.primary ],
        //                     start: { x: 0, y: 0 },
        //                     end: { x: 1, y: 1 },
        //                 }}
        //                 raised
        //                 containerStyle={styles.loginButtonContainer}
        //                 buttonStyle={styles.loginButton}
        //                 onPress={login}
        //                 loading={isLoadingLogin}
        //             />
        //             <TouchableOpacity
        //                 style={styles.registerButton}
        //                 onPress={register}
        //             >
        //                 <Text style={styles.registerText}>REGISTER A NEW ACCOUNT</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </SafeAreaView>
        // </ScrollView>
        <>
        <Text>Login</Text>
        </>
    )
}
