import React, { useState, useCallback, useEffect } from 'react'
import { ScrollView, View, Text, ImageBackground, TouchableOpacity, Image, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Avatar, Chip, Appbar, TextInput, } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { List } from 'react-native-paper'
import { dateMonth } from 'src/helpers/text'
import imagePicker from 'src/helpers/imagePicker'
import { setProfile } from 'src/actions/profile'
import profileAPI from 'src/api/profile'
import authAPI from 'src/api/auth'
import { setAuthToken } from 'src/actions/authToken'
import LinearGradient from 'react-native-linear-gradient'
import colors from 'src/themes/colors'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Modal from 'react-native-modal';
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

export default function Profile() {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const [profileImage, setProfileImage] = useState({ uri: profile.profileImage })
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const logout = useCallback(() => {
        // authAPI.logout(token)
        //     .finally(() => {
        //         dispatch(setAuthToken(null))
        //     })
        console.log('logout')
    }, [dispatch, token])

    const changeProfileImage = useCallback(async () => {
        try {
            const image = await imagePicker()
            setProfileImage(image)
            profileAPI.updateImage(image, token)
                .then(() => {
                    getProfile()
                })
                .catch(error => { })
        }
        catch (error) { }
    }, [getProfile, token])

    const getProfile = useCallback(() => {
        profileAPI.get(token)
            .then((profile) => {
                dispatch(setProfile(profile))
            })
            .catch(error => { })
    }, [dispatch, token])

    useEffect(() => {
        getProfile()
    }, [getProfile])

    return (
        <>
            {
                token !== null ?
                    navigation.navigate('Login')
                    :
                    <SafeAreaView style={{ flex: 1 }}>
                        <Appbar.Header>
                            <ContentTitle title={'Profile'} style={styles.contentTitle} />
                        </Appbar.Header>
                        <View style={styles.picContainer}>
                            <Image
                                style={styles.pic}
                                resizeMode="contain"
                                source={{ uri: 'https://reactjs.org/logo-og.png' }}
                            />
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ flex: 1 }}></View>
                                <View style={{ flex: 2, alignItems: 'flex-end',marginRight:5 }}>
                                    <Text style={{ fontSize: 24 }}>Name</Text>
                                </View>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('EditProfile')}>
                                    <Icon name="edit" size={25} color="#000" />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }}></View>
                            </View>
    
                        </View>
                        <View style={{ flex: 3 }}>

                        </View>
                        <View style={styles.bottomContainer}>
                            <Button
                                title="LOGOUT"
                                color="#900"
                                onPress={logout}
                            />
                        </View>
                    </SafeAreaView>
            }
        </>
    )
}
