import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import styles from './styles'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, TextInput, Menu } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
// import Icon from 'react-native-vector-icons/FontAwesome5'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import pubAPI from 'src/api/pub'
import moment from 'moment'
import reviewAPI from 'src/api/review'
import { Icon, Input, Autocomplete, IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);
const WrongIcon = (props) => (
    <Icon {...props} name='close-outline' />
);
const CorrectIcon = (props) => (
    <Icon {...props} name='checkmark-outline' />
);
const CalenderIcon = (props) => (
    <Icon {...props} name='calendar-outline' />
);
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
    const token = useSelector(state => state.authToken)
    const pub = useSelector(state => state.pub)
    const [isLoadingAddReview, setIsLoadingAddReview] = useState(false)
    const profile = useSelector(state => state.profile)

    const [text, setText] = useState('')
    const checkText = text && text.length > 0;
    const [textFocus, setTextFocus] = useState(false);

    const addReview = useCallback(() => {
        // if (validateForm()) {
        //     const unixDate = new Date().getTime()
        setIsLoadingAddReview(true)
        let data = {
            "text": text
        }
        reviewAPI.add(pub.id, data, token)
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
        // }
    }, [text, token])
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
                    <Input
                        style={styles.input}
                        label='Review'
                        status={!textFocus || checkText ? 'info' : 'danger'}
                        caption={!textFocus || checkText ? null : 'Can not be empty'}
                        autoCapitalize='none'
                        placeholder='example'
                        accessoryRight={!textFocus ? null : checkText ? CorrectIcon : WrongIcon}
                        captionIcon={!textFocus || checkText ? null : AlertIcon}
                        value={text}
                        onChangeText={setText}
                        onFocus={() => { setTextFocus(true); }}
                        multiline={true}
                        textStyle={{ minHeight: 100 }}
                        maxLength={123}
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
                            disabled={!checkText}
                        />
                    </View>
                </View>

            </View>
        </View>
    )
}