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
import { Appbar } from 'react-native-paper'
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
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);
export default function Register() {
    const navigation = useNavigation()
    const token = useSelector(state => state.authToken)
    const mypub = useSelector(state => state.mypub)
    const dispatch = useDispatch()
    const [visible, setVisible] = React.useState(false);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false)
    const [namePub, setNamePub] = useState(mypub.name)
    const checkNamePub = namePub && namePub.length > 0;
    const [namePubFocus, setNamePubFocus] = useState(false);

    const [detailPub, setDetailPub] = useState(mypub.detail)
    const [detailPubFocus, setDetailPubFocus] = useState(false);

    const [pubImage, setPubImage] = useState(mypub.image)
    const [imageData, setImageData] = useState({})
    const [change, setChange] = useState(false)
    const changePubImage = useCallback(async () => {
        setVisible(false)
        try {
            const image = await imagePickerCrop()
            setChange(true)
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
            setChange(true)
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
    const [longtitude, setLongtitude] = useState(parseFloat(mypub.geolocation.longtitude))
    const [latitude, setLatitude] = useState(parseFloat(mypub.geolocation.latitude))
    let pubID = mypub?.id
    const callUpdateAPI = useCallback((photo) => {
        const data = {
            "name": namePub,
            "image": photo,
            "detail": detailPub,
            "geolocation": {
                "longtitude": longtitude.toString(),
                "latitude": latitude.toString(),
            },
            "pub_id": pubID,
        }
        pubAPI.updatepub(data, token)
            .then(res => {
                dispatch(setMyPub(res))
                navigation.goBack()
            })
            .finally(() => {
                setIsLoadingRegister(false)
            })
    }, [dispatch, navigation, namePub, detailPub, longtitude, latitude, token, pubID])
    const cloudinaryUpload = () => {
        setIsLoadingRegister(true)
        if (change) {
            const data = new FormData()
            data.append('file', imageData)
            data.append('upload_preset', 'dz8g51wn')
            data.append("cloud_name", "dvuadgr2r")
            fetch("https://api.cloudinary.com/v1_1/dvuadgr2r/image/upload", {
                method: "post",
                body: data
            }).then(res => res.json()).
                then(data => {
                    callUpdateAPI(data.secure_url)
                }).catch(err => {
                    Alert.alert("An Error Occured While Uploading")
                })
        } else {
            callUpdateAPI(pubImage)
        }
    }
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
            <SafeAreaView>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <ContentTitle title={'Edit My Pub'} style={styles.contentTitle} />
                    <Appbar.Action />
                </Appbar.Header>
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
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <View>
                            <Image
                                source={change ? pubImage : { uri: pubImage }}
                                style={styles.image}
                            />
                            <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' />
                        </View>
                    </TouchableOpacity>
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
                        title="Update"
                        raised
                        containerStyle={styles.registerButtonContainer}
                        color="#F2F1F0"
                        buttonStyle={styles.btn}
                        onPress={cloudinaryUpload}
                        loading={isLoadingRegister}
                        disabled={!checkNamePub || pubImage === ''}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
