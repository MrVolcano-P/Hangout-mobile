import React, { useState, useCallback, useEffect } from 'react'
import { ScrollView, View, Text, ImageBackground, TouchableOpacity, Image, Button, Alert } from 'react-native'
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
import Login from '../../../Auth/Login'
import moment from 'moment'
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

export default function Profile() {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const [profileImage, setProfileImage] = useState({ uri: profile?.img })
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const logout = useCallback(() => {
        // authAPI.logout(token)
        //     .finally(() => {
        dispatch(setAuthToken(null))
        dispatch(setProfile(null))
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
        // profileAPI.get(token)
        //     .then((profile) => {
        //         dispatch(setProfile(profile))
        //     })
        //     .catch(error => { })
        // profileAPI.getFull()
        //     .then((data) => {
        //         console.log(data.find(d => d.username === 'edyth'))
        //         dispatch(setProfile(data.find(d => d.username === 'edyth')))
        //     })
        //     .catch(error => console.log(error))
    }, [dispatch, token])

    useEffect(() => {
        getProfile()
    }, [getProfile])

    return (
        <>
            {
                token === null ?
                    <SafeAreaView style={{ flex: 1 }}>
                        <Appbar.Header>
                            <ContentTitle title={'Profile'} style={styles.contentTitle} />
                        </Appbar.Header>
                        {/* <View style={{ flex: 3 }}>

                        </View> */}
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text>Pls Login first</Text>
                            <Button
                                title="Login"
                                color="#555"
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>
                    </SafeAreaView>
                    :
                    <SafeAreaView style={{ flex: 1 }}>
                        <Appbar.Header>
                            <ContentTitle title={'Profile'} style={styles.contentTitle} />
                        </Appbar.Header>
                        <View style={styles.headerInsetContainer}>
                            {profile?.img === undefined || profile?.img === '' ?
                                <TouchableOpacity onPress={changeProfileImage}>
                                    <Image style={{ width: 150, height: 150, borderRadius: 2 }} source={require('src/assets/no-avatar.jpg')} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={changeProfileImage}>
                                    <Image style={{ width: 150, height: 150, borderRadius: 2 }} source={profileImage} />
                                </TouchableOpacity>
                            }

                        </View>
                        <View style={styles.profileContainer}>
                            <Text style={styles.profileUsernameText}>{profile?.username}</Text>
                            <Text style={styles.profileNameText}>{profile?.name}</Text>
                            <View style={styles.profileInfoContainer}>
                                <Chip icon="cake" style={styles.profileInfoChip}>
                                    {dateMonth(profile?.DOB)}
                                </Chip>
                            </View>
                        </View>
                        <View style={styles.listContainer}>
                            <List.Item
                                title="Edit Profile"
                                description="Edit the your profile information"
                                left={props => <List.Icon {...props} icon="account-edit" />}
                                onPress={() => navigation.navigate('EditProfile')}
                            />
                            <List.Item
                                title="Change Password"
                                description="Change your current password"
                                left={props => <List.Icon {...props} icon="key" />}
                                onPress={() => navigation.navigate('ChangePassword')}
                            />
                            <List.Item
                                title="Logout"
                                description="Sign out from the system"
                                left={props => <List.Icon {...props} icon="logout-variant" />}
                                onPress={logout}
                            />
                        </View>
                    </SafeAreaView>
            }
        </>
    )
}
