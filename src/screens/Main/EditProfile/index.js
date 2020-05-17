import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, TextInput, } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { dateMonth } from 'src/helpers/text'
import DateTimePickerModal from 'react-native-modal-datetime-picker'


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
    const [name, setName] = useState('')
    const [dob, setDOB] = useState(new Date('1990-01-01'))
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
    const [isDatePickerVisible, setIsDatePickerVisble] = useState(false)
    const dispatch = useDispatch()

    const changeDOB = useCallback((date) => {
        setIsDatePickerVisble(false)
        setDOB(date)
    }, [setDOB, setIsDatePickerVisble])

    const validateForm = useCallback(() => {
        if (!name) {
            showWarningPopup('กรุณากรอกชื่อ')
        }
        else if (!dob) {
            showWarningPopup('กรุณากรอกวันเกิด')
        }
        else {
            return true
        }
        return false
    }, [name])

    const submit = useCallback(() => {
        if (validateForm()) {
            setIsLoadingSubmit(true)
            profileAPI.update({
                name,
                DOB: dob
            }, token)
                .then((profile) => {
                    dispatch(setProfile(profile))
                    navigation.goBack()
                })
                .finally(() => {
                    setIsLoadingSubmit(false)
                })
        }
    }, [dispatch, name, navigation, token, validateForm])

    useEffect(() => {
        setName(profile.name)
        setDOB(new Date(profile.DOB))
    }, [profile])

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.contentContaier}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <ContentTitle title={'Edit Profile'} style={styles.contentTitle} />
                    <Appbar.Action />
                </Appbar.Header>
            </SafeAreaView>
            <View style={styles.formContainer}>
                <TextInput
                    label="Name"
                    mode="outlined"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    textContentType="name"
                />
                <TouchableOpacity onPress={() => setIsDatePickerVisble(true)}>
                    <TextInput
                        label="Date of Birth"
                        mode="outlined"
                        style={styles.input}
                        value={dateMonth(dob)}
                        editable={false}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={changeDOB}
                    onCancel={() => setIsDatePickerVisble(false)}
                />
            </View>
            <View style={styles.actionContainer}>
                <Button
                    title="CHANGE PROFILE"
                    raised
                    buttonStyle={styles.changeProfileButton}
                    onPress={submit}
                    loading={isLoadingSubmit}
                />
            </View>

        </View>
        // <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        //     <SafeAreaView style={styles.contentContaier}>
        //         <Image
        //             source={require('src/assets/editprofile.png')}
        //             resizeMode="cover"
        //             style={styles.editProfileImage}
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

        // </View>
        //     </SafeAreaView>
        // </ScrollView>
    )
}
