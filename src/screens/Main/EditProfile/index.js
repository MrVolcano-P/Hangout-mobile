import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Button, ScrollView } from 'react-native'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, TextInput, } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'

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
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
    const dispatch = useDispatch()

    const validateForm = useCallback(() => {
        if (!name) {
            showWarningPopup('กรุณากรอกชื่อ')
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
                name
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
    }, [profile])

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
                <View style={styles.picContainer}>
                    <Image
                        style={styles.pic}
                        resizeMode="contain"
                        source={{ uri: 'https://reactjs.org/logo-og.png' }}
                    />
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        label="Name On Yark Hangout"
                        mode="outlined"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        textContentType="name"
                        returnKeyType="submit"
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <Button
                        title="Update"
                        color="#900"
                        onPress={submit}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
