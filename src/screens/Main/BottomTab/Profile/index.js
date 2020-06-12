import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Chip, Appbar, } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { List } from 'react-native-paper'
import { dateMonth } from 'src/helpers/text'
import imagePicker from 'src/helpers/imagePicker'
import { setProfile } from 'src/actions/profile'
import profileAPI from 'src/api/profile'
import authAPI from 'src/api/auth'
import { setAuthToken } from 'src/actions/authToken'
import { Icon as IconElements } from 'react-native-elements'
import { Button } from 'react-native-elements'
import { setMyPub } from '../../../../actions/myPub'
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

export default function Profile() {
    const token = useSelector(state => state.authToken)
    const profile = useSelector(state => state.profile)
    const [profileImage, setProfileImage] = useState({ uri: profile?.image })
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const logout = useCallback(() => {
        authAPI.logout(token)
            .finally(() => {
                dispatch(setAuthToken(null))
                dispatch(setProfile(null))
                dispatch(setMyPub({}))
            })
    }, [dispatch, token])

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
            const data = new FormData()
            data.append('file', source)
            data.append('upload_preset', 'tg0bqnqp')
            data.append("cloud_name", "dvuadgr2r")
            fetch("https://api.cloudinary.com/v1_1/dvuadgr2r/image/upload", {
                method: "post",
                body: data
            }).then(res => res.json()).
                then(image => {
                    const data = {
                        "image": image.secure_url
                    }
                    profileAPI.updateImage(data, token)
                        .then(res => {
                            dispatch(setProfile(res))
                        })
                }).catch(err => {
                    Alert.alert("An Error Occured While Uploading")
                })
        }
        catch (error) { }
    }, [token])
    useEffect(() => {
    }, [])
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
                                        <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' />
                                    </View>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={changeProfileImage}>
                                    <View>
                                        <Image
                                            source={profileImage}
                                            style={{ width: 150, height: 150, borderRadius: 2 }}
                                        />
                                        <IconElements name={'edit'} containerStyle={styles.icon} color='#fff' />
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
                                    left={props => <List.Icon {...props} icon="store" />}
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
