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
import partyAPI from 'src/api/party'

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

export default AddParty = (props) => {
    const [visible, setVisible] = useState(false)
    const navigation = useNavigation()
    const [pub, setPub] = useState([])
    const [name, setName] = useState('')
    const [place, setPlace] = useState(props.route.params?.pubNow.title)
    const [date, setDate] = useState(new Date())
    const [isLoadingAddParty, setIsLoadingAddParty] = useState(false)
    const [isDatePickerVisible, setIsDatePickerVisble] = useState(false)
    const [partyAmount, setPartyAmount] = useState('')
    const [pubId, setPubId] = useState(props.route.params?.pubNow.id)
    const profile = useSelector(state => state.profile)
    const [dis, setDis] = useState(props.route.params?.dis)
    const [disable, setDisable] = useState(false)
    const placeInput = useRef()
    const partyAmountInput = useRef()

    const changeDate = useCallback((date) => {
        setIsDatePickerVisble(false)
        setDate(date)
        // partyAmountInput.current.focus()
    }, [setDate, setIsDatePickerVisble])

    const validateForm = useCallback(() => {
        if (!name) {
            showWarningPopup('กรุณากรอกชื่อปาตี้')
        }
        else if (!place) {
            showWarningPopup('กรุณาเลือกสถานที่')
        }
        else if (!date) {
            showWarningPopup('กรุณาเลือกวันและเวลา')
        }
        else if (!partyAmount) {
            showWarningPopup('กรุณากรอกจำนวนคนในปาตี้')
        }
        else if (partyAmount < 2) {
            showWarningPopup('จำนวนคนในปาตี้ต้องมากกว่า1คน')
        }
        else {
            return true
        }
        return false
    }, [name, place, date, partyAmount])

    const addParty = useCallback(() => {
        if (validateForm()) {
            const unixDate = date.getTime()
            setIsLoadingAddParty(true)
            partyAPI.add(name, partyAmount, unixDate.toString(), profile, pubId)
                .then(() => {
                    console.log('success')
                    navigation.goBack()
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setIsLoadingAddParty(false)
                    setName('')
                    setDate(new Date())
                    setPartyAmount('')
                })
        }
    }, [name, place, date, partyAmount])

    const getPub = useCallback(() => {
        pubAPI.get()
            .then((pubs) => {
                setPub(pubs)
            })
            .catch(error => { })
    }, [])
    if (dis === true) {
        setDisable(true)
        setDis(false)
    }
    useEffect(() => {
        getPub()
    }, [getPub])

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.contentContaier}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <ContentTitle title='Add Party' style={styles.contentTitle} />
                    <Appbar.Action />
                </Appbar.Header>
            </SafeAreaView>
            <View style={styles.modal}>
                <View style={styles.formContainer}>
                    <ScrollView>
                        <TextInput
                            label="Party Name"
                            mode="outlined"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            textContentType="name"
                            returnKeyType="next"
                            maxLength={16}
                        // onSubmitEditing={() => setIsDatePickerVisble(true)}
                        />
                        <Menu
                            visible={visible}
                            onDismiss={() => setVisible(false)}
                            anchor={
                                <TouchableOpacity onPress={() => setVisible(true)} disabled={disable}>
                                    <TextInput
                                        ref={placeInput}
                                        label="Place"
                                        mode="outlined"
                                        style={styles.input}
                                        value={place}
                                        onChangeText={setPlace}
                                        textContentType="location"
                                        // returnKeyType="next"
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            }
                        >
                            {pub.map((p, i) =>
                                <Menu.Item key={i} onPress={() => {
                                    setPlace(p.title)
                                    setPubId(p.id)
                                    setVisible(false)
                                }} title={p.title} />
                            )}
                        </Menu>
                        <TouchableOpacity onPress={() => setIsDatePickerVisble(true)}>
                            <TextInput
                                label="Date"
                                mode="outlined"
                                style={styles.input}
                                value={moment(date).format('DD-MM-YYYY')}
                                editable={false}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={changeDate}
                            onCancel={() => setIsDatePickerVisble(false)}
                        />
                        <TextInput
                            label="Time"
                            mode="outlined"
                            style={styles.input}
                            value={moment(date).format('HH:mm')}
                            editable={false}
                        />
                        <TextInput
                            ref={partyAmountInput}
                            label="Party Amount"
                            mode="outlined"
                            style={styles.input}
                            value={partyAmount}
                            onChangeText={setPartyAmount}
                            keyboardType={'numeric'}
                        />
                    </ScrollView>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Button
                        title="Create"
                        onPress={addParty}
                        loading={isLoadingAddParty}
                        color="#F2F1F0"
                        buttonStyle={styles.btn}
                    />
                </View>
            </View>
        </View>
    )
}