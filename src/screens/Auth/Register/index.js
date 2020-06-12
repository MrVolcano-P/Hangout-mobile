import React, { useState, useCallback } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Alert, Image } from 'react-native'
import { Button } from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import authAPI from 'src/api/auth'
import profileAPI from 'src/api/profile'
import { setAuthToken } from 'src/actions/authToken'
import { setProfile } from 'src/actions/profile'
import { dateMonth } from 'src/helpers/text'
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';
import moment from 'moment'
import imagePicker from 'src/helpers/imagePicker'
import { Icon as IconElements } from 'react-native-elements'
const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);
const WrongIcon = (props) => (
    <Icon {...props} name='close-outline' />
);
const CorrectIcon = (props) => (
    <Icon {...props} name='checkmark-outline' />
);
const CalenderIcon = (props) => (
    <Icon {...props} name='calendar-outline' />
);

export default function Register() {
    const navigation = useNavigation()

    const [username, setUsername] = useState('')
    const checkUsername = username && username.length > 0;
    const [checkUsernameAvailable, setCheckUsernameAvailable] = useState(false)
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

    const [passwordConfirm, setPasswordConfirm] = useState('')
    const checkPasswordConfirm = passwordConfirm && passwordConfirm.length > 4 && password === passwordConfirm
    const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false);
    const [secureTextPassConEntry, setSecureTextPassConEntry] = React.useState(true);
    const toggleSecureConEntry = () => {
        setSecureTextPassConEntry(!secureTextPassConEntry);
    };

    const renderIconCon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureConEntry}>
            <Icon {...props} name={secureTextPassConEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const [name, setName] = useState('')
    const checkName = name && name.length > 0;
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('')
    const checkEmail = email && email.length > 0
    const [emailFocus, setEmailFocus] = useState(false);
    const [checkFormatEmail, setCheckFormatEmail] = useState(false)
    const checkEmailIsValid = (mail) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(mail)
    }

    const [firstName, setFirstName] = useState('')
    const checkFirstName = firstName && firstName.length > 0;
    const [firstNameFocus, setfirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('')
    const checkLastName = lastName && lastName.length > 0;
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [dob, setDOB] = useState(new Date())
    const [isLoadingRegister, setIsLoadingRegister] = useState(false)
    const [isDatePickerVisible, setIsDatePickerVisble] = useState(false)
    const dispatch = useDispatch()

    const changeDOB = useCallback((date) => {
        setIsDatePickerVisble(false)
        setDOB(date)
    }, [setDOB, setIsDatePickerVisble])

    const checkUsernameAfterEnd = () => {
        console.log('run')
        authAPI.checkUsernameAvailability(username)
            .then(res => {
                console.log('res', res.is_Available)
                setCheckUsernameAvailable(res.is_Available)
            })
            .catch(err => console.log(err))
    }

    const [profileImage, setProfileImage] = useState('')
    const [imageData, setImageData] = useState({})

    const changeProfileImage = useCallback(async () => {
        try {
            const image = await imagePicker()
            setProfileImage(image)
            const uri = image.uri;
            const type = image.type;
            const name = image.fileName;
            const source = {
                uri,
                type,
                name,
            }
            setImageData(source)
        }
        catch (error) { }
    }, [])
    const callRegisterAPI = useCallback((photo) => {
        const parseDate = moment.utc(dob, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        console.log({
            username,
            password,
            name,
            firstName,
            lastName,
            email,
            parseDate,
            photo,
        })
        const data = {
            "username": username,
            "password": password,
            "name": name,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "dob": parseDate,
            "image": photo,
            "role": "customer"
        }
        // console.log(data)
        authAPI.register(data)
            .then(({ token }) => {
                dispatch(setAuthToken(token))
                console.log(token)
                profileAPI.get(token)
                    .then(res => {
                        console.log(res)
                        dispatch(setProfile(res))
                        navigation.navigate('BottomTab')
                    })
                    .catch(err => console.log(err))
            })
            .finally(() => {
                setIsLoadingRegister(false)
            })

    }, [dispatch, navigation, username, password, name, firstName, lastName, dob, email])
    const cloudinaryUpload = () => {
        setIsLoadingRegister(true)
        const data = new FormData()
        data.append('file', imageData)
        data.append('upload_preset', 'tg0bqnqp')
        data.append("cloud_name", "dvuadgr2r")
        fetch("https://api.cloudinary.com/v1_1/dvuadgr2r/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                // setPhoto(data.secure_url)
                console.log(data.secure_url)
                callRegisterAPI(data.secure_url)

            }).catch(err => {
                Alert.alert("An Error Occured While Uploading")
            })
    }
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
            <SafeAreaView style={styles.contentContaier}>
                <Text style={styles.mainText}>
                    REGISTER
                </Text>
                <View style={styles.formContainer}>
                    {/* username */}
                    <Input
                        style={styles.input}
                        label='Username'
                        status={!userFocus ? 'info' : !checkUsername ? 'danger' : checkUsernameAvailable ? 'info' : 'danger'}
                        caption={!userFocus ? null : !checkUsername ? 'Can not be empty' : checkUsernameAvailable ? null : 'username already exist'}
                        autoCapitalize='none'
                        placeholder='example'
                        accessoryRight={!userFocus ? null : !checkUsername ? WrongIcon : checkUsernameAvailable ? CorrectIcon : WrongIcon}
                        captionIcon={!userFocus || checkUsername ? null : AlertIcon}
                        value={username}
                        onChangeText={setUsername}
                        onFocus={() => { setUserFocus(true); }}
                        onEndEditing={checkUsernameAfterEnd}
                    />
                    {/* password */}
                    <Input
                        style={styles.input}
                        label='Password'
                        status={!passwordFocus || checkPassword ? 'info' : 'danger'}
                        caption={!passwordFocus || checkPassword ? null : 'more than 4'}
                        autoCapitalize='none'
                        placeholder='password'
                        accessoryRight={renderIcon}
                        captionIcon={!passwordFocus || checkPassword ? null : AlertIcon}
                        secureTextEntry={secureTextEntry}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => { setPasswordFocus(true); }}
                    />
                    {/* confirmpassword */}
                    <Input
                        style={styles.input}
                        label='Confirm Password'
                        status={!passwordConfirmFocus || checkPasswordConfirm ? 'info' : 'danger'}
                        caption={!passwordConfirmFocus || checkPasswordConfirm ? null : 'must equal password'}
                        autoCapitalize='none'
                        placeholder='confirm password'
                        accessoryRight={renderIconCon}
                        captionIcon={!passwordConfirmFocus || checkPasswordConfirm ? null : AlertIcon}
                        secureTextEntry={secureTextPassConEntry}
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                        onFocus={() => { setPasswordConfirmFocus(true); }}
                    />
                    {/* name */}
                    <Input
                        style={styles.input}
                        label='Name'
                        status={!nameFocus || checkName ? 'info' : 'danger'}
                        caption={!nameFocus || checkName ? null : 'Can not be empty'}
                        autoCapitalize='none'
                        placeholder='example'
                        accessoryRight={!nameFocus ? null : checkName ? CorrectIcon : WrongIcon}
                        captionIcon={!nameFocus || checkName ? null : AlertIcon}
                        value={name}
                        onChangeText={setName}
                        onFocus={() => { setNameFocus(true); }}
                    />
                    {/* firstname */}
                    <Input
                        style={styles.input}
                        label='FirstName'
                        status={!firstNameFocus || checkFirstName ? 'info' : 'danger'}
                        caption={!firstNameFocus || checkFirstName ? null : 'Can not be empty'}
                        autoCapitalize='none'
                        placeholder='example'
                        accessoryRight={!firstNameFocus ? null : checkFirstName ? CorrectIcon : WrongIcon}
                        captionIcon={!firstNameFocus || checkFirstName ? null : AlertIcon}
                        value={firstName}
                        onChangeText={setFirstName}
                        onFocus={() => { setfirstNameFocus(true); }}
                    />
                    {/* lastname */}
                    <Input
                        style={styles.input}
                        label='LastName'
                        status={!lastNameFocus || checkLastName ? 'info' : 'danger'}
                        caption={!lastNameFocus || checkLastName ? null : 'Can not be empty'}
                        autoCapitalize='none'
                        placeholder='example'
                        accessoryRight={!lastNameFocus ? null : checkLastName ? CorrectIcon : WrongIcon}
                        captionIcon={!lastNameFocus || checkLastName ? null : AlertIcon}
                        value={lastName}
                        onChangeText={setLastName}
                        onFocus={() => { setLastNameFocus(true); }}
                    />
                    {/* email */}
                    <Input
                        style={styles.input}
                        label='Email'
                        status={!emailFocus ? 'info' : !checkEmail ? 'danger' : checkFormatEmail ? 'info' : 'danger'}
                        caption={!emailFocus ? null : !checkEmail ? 'Can not be empty' : checkFormatEmail ? null : 'email not valid'}
                        autoCapitalize='none'
                        placeholder='example@hangout.com'
                        accessoryRight={!emailFocus ? null : !checkEmail ? WrongIcon : checkFormatEmail ? CorrectIcon : WrongIcon}
                        captionIcon={!emailFocus || checkEmail ? null : AlertIcon}
                        value={email}
                        onChangeText={(email) => {
                            setEmail(email)
                            setCheckFormatEmail(checkEmailIsValid(email))
                        }}
                        onFocus={() => { setEmailFocus(true); }}
                    />
                    {/* dob */}
                    <TouchableOpacity onPress={() => setIsDatePickerVisble(true)}>
                        <Input
                            style={styles.inputDate}
                            label='Date OF Birth'
                            status={'info'}
                            caption={"Tap to Select"}
                            autoCapitalize='none'
                            accessoryRight={CalenderIcon}
                            captionIcon={AlertIcon}
                            value={dateMonth(dob)}
                            disabled

                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={changeDOB}
                        onCancel={() => setIsDatePickerVisble(false)}
                    />
                    {/* image */}
                    <View style={styles.headerInsetContainer} >
                        {profileImage === undefined || profileImage === '' ?
                            <TouchableOpacity onPress={changeProfileImage}>
                                <View>
                                    <Image
                                        source={require('src/assets/no-avatar.jpg')}
                                        style={styles.image}
                                    />
                                    <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' onPress={console.log('I was clicked')} />
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={changeProfileImage}>
                                <View>
                                    <Image
                                        source={profileImage}
                                        style={styles.image}
                                    />
                                    <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' onPress={console.log('I was clicked')} />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        title="REGISTER"
                        raised
                        containerStyle={styles.registerButtonContainer}
                        color="#F2F1F0"
                        buttonStyle={styles.btn}
                        onPress={cloudinaryUpload}
                        loading={isLoadingRegister}
                        disabled={!checkUsername || !checkPassword || !checkPasswordConfirm || !checkName || !checkFirstName || !checkLastName || profileImage === ''}
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.backText}>BACK TO LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
