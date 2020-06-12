/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useRef } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Alert, Image } from 'react-native'
import { Button } from 'react-native-elements'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import colors from 'src/themes/colors'
import authAPI from 'src/api/auth'
import pubAPI from 'src/api/pub'
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
import { setMyPub } from '../../../actions/myPub'
const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);
const WrongIcon = (props) => (
    <Icon {...props} name='close-outline' />
);
const CorrectIcon = (props) => (
    <Icon {...props} name='checkmark-outline' />
);

export default function Register() {
    const navigation = useNavigation()
    const token = useSelector(state => state.authToken)
    const dispatch = useDispatch()
    const [isLoadingRegister, setIsLoadingRegister] = useState(false)
    const [namePub, setNamePub] = useState('')
    const checkNamePub = namePub && namePub.length > 0;
    const [namePubFocus, setNamePubFocus] = useState(false);

    const [detailPub, setDetailPub] = useState('')
    const [detailPubFocus, setDetailPubFocus] = useState(false);

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

    const [longtitude, setLongtitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const callRegisterAPI = useCallback((photo) => {
        console.log({
            namePub,
            photo,
            detailPub,
        })
        const data = {
            "name": namePub,
            "image": photo,
            "detail": detailPub,
            "geolocation": {
                "longtitude": longtitude.toString(),
                "latitude": latitude.toString(),
            }
        }
        pubAPI.create(data, token)
            .then(res => {
                dispatch(setMyPub(res))
                navigation.navigate('BottomTab')
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoadingRegister(false)
            })
    }, [dispatch, navigation, namePub, detailPub, longtitude, latitude, token])
    const cloudinaryUpload = () => {
        setIsLoadingRegister(true)
        const data = new FormData()
        data.append('file', imageData)
        data.append('upload_preset', 'dz8g51wn')
        data.append("cloud_name", "dvuadgr2r")
        fetch("https://api.cloudinary.com/v1_1/dvuadgr2r/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
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
                    {/* detail */}
                    <Input
                        style={styles.input}
                        label='Detail'
                        status={'info'}
                        autoCapitalize='none'
                        placeholder='example'
                        value={detailPub}
                        onChangeText={setDetailPub}
                        onFocus={() => { setDetailPubFocus(true); }}
                        multiline={true}
                        textStyle={{ minHeight: 100 }}
                    />
                    {/* image */}
                    {pubImage === undefined || pubImage === '' ?
                        <TouchableOpacity onPress={changePubImage}>
                            <View>
                                <Image
                                    source={require('src/assets/no-avatar.jpg')}
                                    style={styles.image}
                                />
                                <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' onPress={console.log('I was clicked')} />
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={changePubImage}>
                            <View>
                                <Image
                                    source={pubImage}
                                    style={styles.image}
                                />
                                <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' onPress={console.log('I was clicked')} />
                            </View>
                        </TouchableOpacity>
                    }
                    {/* longtitude */}
                    <Input
                        style={styles.inputDate}
                        label='Longtitude'
                        status={'info'}
                        autoCapitalize='none'
                        value={longtitude.toString()}
                        disabled
                    />
                    {/* latitude */}
                    <Input
                        style={styles.inputDate}
                        label='Latitude'
                        status={'info'}
                        autoCapitalize='none'
                        value={latitude.toString()}
                        disabled
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Button
                            title="Choose Map"
                            raised
                            containerStyle={styles.choosemapbtnContainer}
                            color="#F2F1F0"
                            buttonStyle={styles.btn}
                            onPress={() => navigation.navigate('ChooseMap', {
                                onGoBack: (lat, long) => {
                                    setLatitude(lat)
                                    setLongtitude(long)
                                },
                                lat: latitude,
                                long: longtitude
                            })}
                        />
                    </View>
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        title="CREATE"
                        raised
                        containerStyle={styles.registerButtonContainer}
                        color="#F2F1F0"
                        buttonStyle={styles.btn}
                        onPress={cloudinaryUpload}
                        loading={isLoadingRegister}
                        disabled={!checkNamePub || pubImage === '' || longtitude === 0 || latitude === 0}
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
