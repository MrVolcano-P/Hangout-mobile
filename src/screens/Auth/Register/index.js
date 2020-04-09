import React, { useState, useCallback, useRef } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Alert, Image } from 'react-native'
import { Button } from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import colors from 'src/themes/colors'
// import authAPI from 'src/api/auth'
// import profileAPI from 'src/api/profile'
// import { setAuthToken } from 'src/actions/authToken'
// import { setProfile } from 'src/actions/profile'
// import { dateMonth } from 'src/helpers/text'

const showWarningPopup = (message) => Alert.alert(
    'กรุณาตรวจสอบข้อมูล',
    message,
)

export default function Register () {
    // const navigation = useNavigation()
    // const [ username, setUsername ] = useState('')
    // const [ password, setPassword ] = useState('')
    // const [ passwordConfirm, setPasswordConfirm ] = useState('')
    // const [ name, setName ] = useState('')
    // const [ address, setAddress ] = useState('')
    // const [ dob, setDOB ] = useState(new Date('1990-01-01'))
    // const [ isLoadingRegister, setIsLoadingRegister ] = useState(false)
    // const [ isDatePickerVisible, setIsDatePickerVisble ] = useState(false)
    // const dispatch = useDispatch()

    // const usernameInput = useRef()
    // const passwordInput = useRef()
    // const passwordConfirmInput = useRef()
    // const addressInput = useRef()

    // const changeDOB = useCallback((date) => {
    //     setIsDatePickerVisble(false)
    //     setDOB(date)
    //     usernameInput.current.focus()
    // }, [ setDOB, setIsDatePickerVisble ])

    // const validateForm = useCallback(() => {
    //     if (!name) {
    //         showWarningPopup('กรุณากรอกชื่อ')
    //     }
    //     else if (!dob) {
    //         showWarningPopup('กรุณากรอกวันเกิด')
    //     }
    //     else if (!username) {
    //         showWarningPopup('กรุณากรอก Username')
    //     }
    //     else if (!password) {
    //         showWarningPopup('กรุณากรอก Password')
    //     }
    //     else if (!passwordConfirm) {
    //         showWarningPopup('กรุณากรอก Password Confirmation')
    //     }
    //     else if (password !== passwordConfirm) {
    //         showWarningPopup('Password และ Password Confirmation ไม่ตรงกัน')
    //     }
    //     else if (!address) {
    //         showWarningPopup('กรุณากรอกที่อยู่')
    //     }
    //     else {
    //         return true
    //     }
    //     return false
    // }, [ address, dob, name, password, username, passwordConfirm ])

    // const callRegisterAPI = useCallback(() => {
    //     authAPI.register({
    //         username,
    //         password,
    //         name,
    //         address,
    //         dateOfBirth: dob,
    //     })
    //         .then(() => {
    //             authAPI.login(username, password)
    //                 .then(({ token }) => {
    //                     dispatch(setAuthToken(token))
    //                     profileAPI.get(token)
    //                         .then((profile) => {
    //                             dispatch(setProfile(profile))
    //                             navigation.navigate('ChangeProfileImage')
    //                         })
    //                 })
    //         })
    //         .finally(() => {
    //             setIsLoadingRegister(false)
    //         })
    // }, [ address, dispatch, dob, name, navigation, password, username ])

    // const register = useCallback(() => {
    //     if (validateForm()) {
    //         setIsLoadingRegister(true)
    //         authAPI.checkUsernameAvailability(username)
    //             .then(response => {
    //                 if (response.isAvailable) {
    //                     callRegisterAPI()
    //                 }
    //                 else {
    //                     Alert.alert(
    //                         'กรุณาตรวจสอบข้อมูล',
    //                         'Username ที่คุณระบุ มีการใช้งานอยู่แล้ว โปรดใช้ Username อื่น'
    //                     )
    //                     setIsLoadingRegister(false)
    //                 }
    //             })
    //     }
    // }, [ callRegisterAPI, username, validateForm ])

    return (
        // <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        //     <SafeAreaView style={styles.contentContaier}>
        //         <Text style={styles.mainText}>
        //             REGISTER
        //         </Text>
        //         <Text style={styles.subText}>
        //             CREATE A NEW ACCOUNT
        //         </Text>
        //         <Image
        //             source={require('src/assets/register.png')}
        //             resizeMode="contain"
        //             style={styles.registerImage}
        //         />
        //         <View style={styles.formContainer}>
        //             <TextInput
        //                 label="Name"
        //                 mode="outlined"
        //                 style={styles.input}
        //                 value={name}
        //                 onChangeText={setName}
        //                 textContentType="name"
        //                 returnKeyType="next"
        //                 onSubmitEditing={() => setIsDatePickerVisble(true)}
        //             />
        //             <TouchableOpacity onPress={() => setIsDatePickerVisble(true)}>
        //                 <TextInput
        //                     label="Date of Birth"
        //                     mode="outlined"
        //                     style={styles.input}
        //                     value={dateMonth(dob)}
        //                     editable={false}
        //                 />
        //             </TouchableOpacity>
        //             <DateTimePickerModal
        //                 isVisible={isDatePickerVisible}
        //                 mode="date"
        //                 onConfirm={changeDOB}
        //                 onCancel={() => setIsDatePickerVisble(false)}
        //             />
        //             <TextInput
        //                 ref={usernameInput}
        //                 label="Username"
        //                 mode="outlined"
        //                 style={styles.input}
        //                 value={username}
        //                 onChangeText={setUsername}
        //                 textContentType="username"
        //                 autoCapitalize="none"
        //                 returnKeyType="next"
        //                 onSubmitEditing={() => passwordInput.current.focus()}
        //             />
        //             <TextInput
        //                 ref={passwordInput}
        //                 label="Password"
        //                 mode="outlined"
        //                 style={styles.input}
        //                 secureTextEntry
        //                 value={password}
        //                 onChangeText={setPassword}
        //                 textContentType="password"
        //                 autoCapitalize="none"
        //                 returnKeyType="next"
        //                 onSubmitEditing={() => passwordConfirmInput.current.focus()}
        //             />
        //             <TextInput
        //                 ref={passwordConfirmInput}
        //                 label="Password Confirmation"
        //                 mode="outlined"
        //                 style={styles.input}
        //                 secureTextEntry
        //                 value={passwordConfirm}
        //                 onChangeText={setPasswordConfirm}
        //                 textContentType="password"
        //                 autoCapitalize="none"
        //                 returnKeyType="next"
        //                 onSubmitEditing={() => addressInput.current.focus()}
        //             />
        //             <TextInput
        //                 ref={addressInput}
        //                 label="Address"
        //                 mode="outlined"
        //                 style={styles.input}
        //                 value={address}
        //                 onChangeText={setAddress}
        //                 textContentType="fullStreetAddress"
        //                 multiline
        //             />
        //             <View style={styles.actionContainer}>
        //                 <Button
        //                     title="REGISTER"
        //                     ViewComponent={LinearGradient}
        //                     linearGradientProps={{
        //                         colors: [ colors.secondary, colors.primary ],
        //                         start: { x: 0, y: 0 },
        //                         end: { x: 1, y: 1 },
        //                     }}
        //                     raised
        //                     buttonStyle={styles.registerButton}
        //                     onPress={register}
        //                     loading={isLoadingRegister}
        //                 />
        //                 <TouchableOpacity
        //                     style={styles.backButton}
        //                     onPress={() => navigation.navigate('Login')}
        //                 >
        //                     <Text style={styles.backText}>BACK TO LOGIN</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     </SafeAreaView>
        // </ScrollView>
        <>
        <Text>Regis</Text>
        </>
    )
}
