import React, { useState, useCallback, useEffect } from 'react'
import { ScrollView, View, Text, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native'
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
import { Icon as IconElements } from 'react-native-elements'
import Modal from 'react-native-modal';
import Login from '../../../Auth/Login'
import moment from 'moment'
import { Button } from 'react-native-elements'
import { host } from 'src/api/instance'
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

export default function Profile() {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const mypub = useSelector(state => state.mypub)
    const [profileImage, setProfileImage] = useState({ uri: profile?.image })
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const logout = useCallback(() => {
        authAPI.logout(token)
            .finally(() => {
                dispatch(setAuthToken(null))
                dispatch(setProfile(null))
            })
        console.log('logout')
    }, [dispatch, token])

    const changeProfileImage = useCallback(async () => {
        try {
            const image = await imagePicker()
            console.log(image)
            var blob = new Blob(image.data)
            var file = new File([blob], image.fileName, { type: image.type, lastModified: Date.now() });
            var form = new FormData();
            form.append("photos", file)
            setProfileImage(image)
            profileAPI.updateImage(form, token)
                .then(res => {
                    console.log('sss')
                })
                .catch(error => { })
        }
        catch (error) { }
    }, [token])

    useEffect(() => {
    }, [])
    console.log(mypub)
    return (
        <>
            {
                token === null && profile === null ?
                    <SafeAreaView style={{ flex: 1 }}>
                        <Appbar.Header>
                            <ContentTitle title={'Profile'} style={styles.contentTitle} />
                        </Appbar.Header>
                        <View style={{ flex: 1, backgroundColor: '#F2F1F0' }}>
                            <Image
                                source={require('src/assets/party.jpg')}
                                resizeMode="cover"
                                style={styles.editProfileImage}
                            />
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ marginVertical: 10 }}>
                                    <Text>Please Login first</Text>
                                </View>
                                <Button
                                    title="Login"
                                    color="#F2F1F0"
                                    buttonStyle={styles.btn}
                                    onPress={() => navigation.navigate('Login')}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                    :
                    <SafeAreaView style={{ flex: 1 }}>
                        <Appbar.Header>
                            <ContentTitle title={'Profile'} style={styles.contentTitle} />
                        </Appbar.Header>
                        <View style={styles.headerInsetContainer}>
                            {profile?.image === undefined || profile?.image === '' ?
                                <TouchableOpacity onPress={changeProfileImage}>
                                    <View>
                                        <Image
                                            source={require('src/assets/no-avatar.jpg')}
                                            style={{ width: 150, height: 150, borderRadius: 2 }}
                                        />
                                        <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' onPress={console.log('I was clicked')} />
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={changeProfileImage}>
                                    <View>
                                        <Image
                                            source={profileImage}
                                            style={{ width: 150, height: 150, borderRadius: 2 }}
                                        />
                                        <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' onPress={console.log('I was clicked')} />
                                    </View>
                                </TouchableOpacity>
                            }

                        </View>
                        <View style={styles.profileContainer}>
                            <Text style={styles.profileUsernameText}>{profile?.username}</Text>
                            <Text style={styles.profileNameText}>{profile?.name}</Text>
                            <View style={styles.profileInfoContainer}>
                                <Chip icon="cake" style={styles.profileInfoChip}>
                                    {dateMonth(profile?.dob)}
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
                            {profile?.role === 'owner' ?
                                <List.Item
                                    title="Edit My Pub"
                                    description="Change your pub data"
                                    left={props => <List.Icon {...props} icon="key" />}
                                    onPress={() => navigation.navigate('ChangePubData')}
                                />
                                :
                                null
                            }
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
