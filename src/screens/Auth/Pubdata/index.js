/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Alert, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import pubAPI from 'src/api/pub'
import { Icon, Input } from '@ui-kitten/components';
import { Button as ButtonUI } from '@ui-kitten/components';
import imagePickerCrop from 'src/helpers/imagePickerCrop'
import imagePickerCropFromGal from 'src/helpers/imagePickerCropFromGal'
import { Icon as IconElements } from 'react-native-elements'
import { setMyPub } from '../../../actions/myPub'
import { Card, Modal } from '@ui-kitten/components';
const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);
const WrongIcon = (props) => (
    <Icon {...props} name='close-outline' />
);
const CorrectIcon = (props) => (
    <Icon {...props} name='checkmark-outline' />
);

const CameraIcon = (props) => (
    <Icon {...props} name='camera' />
);
const ImageIcon = (props) => (
    <Icon {...props} name='image' />
)
export default function Register() {
    const navigation = useNavigation()
    const token = useSelector(state => state.authToken)
    const dispatch = useDispatch()
    const [visible, setVisible] = React.useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false)
    const [namePub, setNamePub] = useState('')
    const checkNamePub = namePub && namePub.length > 0;
    const [namePubFocus, setNamePubFocus] = useState(false);

    const [detailPub, setDetailPub] = useState('')
    const [detailPubFocus, setDetailPubFocus] = useState(false);

    const [pubImage, setPubImage] = useState('')
    const [imageData, setImageData] = useState({})
    const changePubImage = useCallback(async () => {
        setVisible(false)
        try {
            const image = await imagePickerCrop()
            setPubImage({ uri: `data:${image.mime};base64,${image.data}` })
            const uri = image.path;
            const type = image.mime;
            const name = "fileName";
            const source = {
                uri,
                type,
                name,
            }
            setImageData(source)
        }
        catch (error) { }
    }, [])
    const changePubImageFromGallery = useCallback(async () => {
        setVisible(false)
        try {
            const image = await imagePickerCropFromGal()
            setPubImage({ uri: `data:${image.mime};base64,${image.data}` })
            const uri = image.path;
            const type = image.mime;
            const name = "fileName";
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
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <View>
                                <Image
                                    source={require('src/assets/no-avatar.jpg')}
                                    style={styles.image}
                                />
                                <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' />
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <View>
                                <Image
                                    source={pubImage}
                                    style={styles.image}
                                />
                                <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' />
                            </View>
                        </TouchableOpacity>
                    }
                    <Modal
                        visible={visible}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => setVisible(false)}>
                        <Card disabled={true}>
                            <View style={{ flexDirection: 'row' }}>
                                <ButtonUI
                                    style={styles.button}
                                    onPress={changePubImage}
                                    accessoryLeft={CameraIcon}
                                />
                                <ButtonUI
                                    style={styles.button}
                                    onPress={changePubImageFromGallery}
                                    accessoryLeft={ImageIcon}
                                />
                            </View>
                        </Card>
                    </Modal>
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
