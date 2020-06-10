import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, TextInput, } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { dateMonth } from 'src/helpers/text'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import LinearGradient from 'react-native-linear-gradient'
import { Button } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';
import { setProfile } from 'src/actions/profile'
import moment from 'moment'
import profileAPI from 'src/api/profile'
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
const showWarningPopup = (message) => Alert.alert(
    'กรุณาตรวจสอบข้อมูล',
    message,
)
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

export default EditProfile = () => {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const navigation = useNavigation()
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

    const [name, setName] = useState(profile.name)
    const checkName = name && name.length > 0;
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState(profile.email)
    const checkEmail = email && email.length > 0
    const [emailFocus, setEmailFocus] = useState(false);
    const [checkFormatEmail, setCheckFormatEmail] = useState(false)
    const checkEmailIsValid = (mail) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(mail)
    }

    const [firstName, setFirstName] = useState(profile.fistName)
    const checkFirstName = firstName && firstName.length > 0;
    const [firstNameFocus, setfirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState(profile.lastName)
    const checkLastName = lastName && lastName.length > 0;
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [dob, setDOB] = useState(profile.dob)
    const [isDatePickerVisible, setIsDatePickerVisble] = useState(false)
    const dispatch = useDispatch()

    const changeDOB = useCallback((date) => {
        setIsDatePickerVisble(false)
        setDOB(date)
    }, [setDOB, setIsDatePickerVisble])

    const submit = useCallback(() => {
        let data = {
            "email": email,
            "name": name,
            "firstName": firstName,
            "lastName": lastName,
            "dob": dob
        }
        setIsLoadingSubmit(true)
        profileAPI.update(data, token)
            .then(res => {
                dispatch(setProfile(res))
                navigation.goBack()
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoadingSubmit(false)
            })
    }, [dispatch, name, email, firstName, lastName, dob, navigation, token])

    useEffect(() => {
        // setName(profile.name)
        // setDOB(new Date(profile.DOB))
    }, [profile])
    console.log(new Date())
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
            <SafeAreaView style={styles.contentContaier}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <ContentTitle title={'Edit Profile'} style={styles.contentTitle} />
                    <Appbar.Action />
                </Appbar.Header>
                <View style={styles.formContainer}>
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
                    <View style={styles.actionContainer}>
                        <Button
                            title="CHANGE PROFILE"
                            color="#F2F1F0"
                            buttonStyle={styles.btn}
                            onPress={submit}
                            loading={isLoadingSubmit}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
