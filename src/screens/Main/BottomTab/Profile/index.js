import React, { useState, useCallback, useEffect } from 'react'
import { ScrollView, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Avatar, Chip, Appbar } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { List } from 'react-native-paper'
import { dateMonth } from 'src/helpers/text'
import imagePicker from 'src/helpers/imagePicker'
import { setProfile } from 'src/actions/profile'
import profileAPI from 'src/api/profile'
import authAPI from 'src/api/auth'
import { setAuthToken } from 'src/actions/authToken'

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

export default function Profile() {
    const navigation = useNavigation()
    const token = useSelector(state => state.authToken)
    console.log(token)
    return (
        <>
            {
                token === null ?
                    navigation.navigate('Login')
                    :
                    <SafeAreaView>
                        <Appbar.Header>
                            <ContentTitle title={'Profile'} style={styles.contentTitle} />
                        </Appbar.Header>
                    </SafeAreaView>
            }
        </>
    )
}
