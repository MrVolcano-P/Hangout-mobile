import React, { useState, useCallback, useRef } from 'react'
import { View, ScrollView, Alert, Image, Text } from 'react-native'
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput, Appbar } from 'react-native-paper'
import colors from 'src/themes/colors'
import profileAPI from 'src/api/profile'

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const showWarningPopup = (message) => Alert.alert(
    'กรุณาตรวจสอบข้อมูล',
    message,
)

export default function ChangePassword() {
    const token = useSelector(state => state.authToken)
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const navigation = useNavigation()
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

    const passwordConfirmInput = useRef()

    const validateForm = useCallback(() => {
        if (!password) {
            showWarningPopup('กรุณากรอก Password')
        }
        else if (!passwordConfirm) {
            showWarningPopup('กรุณากรอก Password Confirmation')
        }
        else if (password !== passwordConfirm) {
            showWarningPopup('Password และ Password Confirmation ไม่ตรงกัน')
        }
        else {
            return true
        }
        return false
    }, [password, passwordConfirm])

    const submit = useCallback(() => {
        if (validateForm()) {
            setIsLoadingSubmit(true)
            profileAPI.update({
                password,
            }, token)
                .then(() => {
                    Alert.alert(
                        'เสร็จสิ้น',
                        'รหัสผ่านของคุณถูกอัพเดทเรียบร้อยแล้ว',
                        [
                            {
                                text: 'OK',
                                onPress: navigation.goBack,
                            },
                        ],
                    )
                })
                .finally(() => {
                    setIsLoadingSubmit(false)
                })
        }
    }, [navigation, password, token, validateForm])

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
            <SafeAreaView style={styles.contentContaier}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <ContentTitle title={'Change Password'} style={styles.contentTitle} />
                    <Appbar.Action />
                </Appbar.Header>
                <View style={styles.formContainer}>
                    <TextInput
                        label="Password"
                        mode="outlined"
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        textContentType="password"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordConfirmInput.current.focus()}
                    />
                    <TextInput
                        ref={passwordConfirmInput}
                        label="Password Confirmation"
                        mode="outlined"
                        style={styles.input}
                        secureTextEntry
                        value={passwordConfirm}
                        onChangeText={setPasswordConfirm}
                        textContentType="password"
                        autoCapitalize="none"
                        returnKeyType="done"
                        onSubmitEditing={submit}
                    />
                    <View style={styles.actionContainer}>
                        <Button
                            title="CHANGE PASSWORD"
                            // ViewComponent={LinearGradient}
                            // linearGradientProps={{
                            //     colors: [colors.secondary, colors.primary],
                            //     start: { x: 0, y: 0 },
                            //     end: { x: 1, y: 1 },
                            // }}
                            raised
                            buttonStyle={styles.changeProfileButton}
                            onPress={submit}
                            loading={isLoadingSubmit}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
