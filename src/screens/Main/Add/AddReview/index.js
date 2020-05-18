import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import styles from './styles'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, TextInput, Menu } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import pubAPI from 'src/api/pub'
import moment from 'moment'
import reviewAPI from 'src/api/review'

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

export default AddReview = (props) => {
    const navigation = useNavigation()
    const pub = useSelector(state => state.pub)
    const [text, setText] = useState('')
    const [isLoadingAddReview, setIsLoadingAddReview] = useState(false)
    const profile = useSelector(state => state.profile)

    const validateForm = useCallback(() => {
        if (!text) {
            showWarningPopup('กรุณากรอกรีวิว')
        }
        else {
            return true
        }
        return false
    }, [text])

    const addReview = useCallback(() => {
        if (validateForm()) {
            const unixDate = new Date().getTime()
            setIsLoadingAddReview(true)
            reviewAPI.add(text, profile, pub.id, unixDate.toString())
                .then(() => {
                    console.log('success')
                    navigation.goBack()
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setIsLoadingAddReview(false)
                    setText('')
                })
        }
    }, [text])
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.contentContaier}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <ContentTitle title='Add Review' style={styles.contentTitle} />
                    <Appbar.Action />
                </Appbar.Header>
            </SafeAreaView>
            <View style={styles.modal}>
                <View style={styles.formContainer}>
                    <TextInput
                        label="Text"
                        mode="outlined"
                        style={styles.input}
                        value={text}
                        onChangeText={setText}
                        multiline
                        maxLength={123}
                        numberOfLines={4}
                    />
                    <View style={styles.textLength}>
                        {text.length === 123 ?
                            <Text style={{ color: 'red' }}>
                                {text.length}/123
                                    </Text> :
                            <Text >
                                {text.length}/123
                                    </Text>
                        }

                    </View>
                    <View style={{ flex: 0.5, marginVertical: 10 }}>
                        <Button
                            title="Add"
                            onPress={addReview}
                            loading={isLoadingAddReview}
                            color="#F2F1F0"
                            buttonStyle={styles.btn}
                        />
                    </View>
                </View>

            </View>
        </View>
    )
}