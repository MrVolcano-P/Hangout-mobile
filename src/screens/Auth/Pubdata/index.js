/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
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
import { host } from '../../../api/instance'
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

    const dispatch = useDispatch()

    const [namePub, setNamePub] = useState('')
    const checkNamePub = namePub && namePub.length > 0;
    const [namePubFocus, setNamePubFocus] = useState(false);

    const [pubImage, setPubImage] = useState('')
    const [imageData, setImageData] = useState({})
    const changePubImage = useCallback(async () => {
        try {
            const image = await imagePicker()
            setPubImage(image)
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
        setIsLoadingRegister(true)
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
            "role": "owner"
        }
        console.log(data)
        // authAPI.register(data)
        //     .then(({ token }) => {
        //         dispatch(setAuthToken(token))
        //         console.log(token)
        //         profileAPI.get(token)
        //             .then(res => {
        //                 console.log(res)
        //                 dispatch(setProfile(res))
        //                 navigation.navigate('BottomTab')
        //             })
        //             .catch(err => console.log(err))
        //     })
        //     .finally(() => {
        //         setIsLoadingRegister(false)
        //     })

    }, [dispatch, navigation,namePub])
    const cloudinaryUpload = () => {
        const data = new FormData()
        data.append('file', imageData)
        data.append('upload_preset', 'dz8g51wn')
        data.append("cloud_name", "dvuadgr2r")
        fetch("https://api.cloudinary.com/v1_1/dvuadgr2r/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                console.log(data)
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
                    Pub Data
                </Text>
                <View style={styles.formContainer}>
                    {/* namepub */}
                    <Input
                        style={styles.input}
                        label='Pub Name'
                        status={!namePubFocus || checkNamePub ? 'info' : 'danger'}
                        caption={!namePubFocus || checkNamePub ? null : 'Can not be empty'}
                        autoCapitalize='none'
                        placeholder='example'
                        accessoryRight={!namePubFocus ? null : checkNamePub ? CorrectIcon : WrongIcon}
                        captionIcon={!namePubFocus || checkNamePub ? null : AlertIcon}
                        value={namePub}
                        onChangeText={setNamePub}
                        onFocus={() => { setNamePubFocus(true); }}
                    />
                    {/* image */}
                    <TouchableOpacity onPress={changePubImage}>
                        <View>
                            <Image
                                source={pubImage}
                                style={styles.image}
                            />
                            <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' onPress={console.log('I was clicked')} />
                        </View>
                    </TouchableOpacity>
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
                        disabled={!checkUsername || !checkPassword || !checkPasswordConfirm || !checkName || !checkFirstName || !checkLastName}
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
