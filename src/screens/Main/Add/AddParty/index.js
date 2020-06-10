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
import partyAPI from 'src/api/party'
import { Icon, Input, Autocomplete, IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { dateMonth, dateTime } from 'src/helpers/text'
import _ from 'lodash'
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);
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
const showWarningPopup = (message) => Alert.alert(
    'กรุณาตรวจสอบข้อมูล',
    message,
)

export default AddParty = (props) => {
    const token = useSelector(state => state.authToken)
    const navigation = useNavigation()
    const [pub, setPub] = useState([])
    const [pubNames, setPubNames] = useState([])
    const [isLoadingAddParty, setIsLoadingAddParty] = useState(false)
    const profile = useSelector(state => state.profile)
    const [fromPub, setFromParty] = useState(props.route.params?.fromPub)

    const [name, setName] = useState('')
    const checkName = name && name.length > 0;
    const [nameFocus, setNameFocus] = useState(false);

    const pubNow = useSelector(state => state.pub)

    const [membership, setMembership] = useState('')
    const checkMembership = membership && membership.length > 0;
    const [membershipFocus, setMembershipFocus] = useState(false);

    const [date, setDate] = useState(new Date())
    const [isDatePickerVisible, setIsDatePickerVisble] = useState(false)

    const dispatch = useDispatch()

    const changeDate = useCallback((date) => {
        setIsDatePickerVisble(false)
        setDate(date)
    }, [setDate, setIsDatePickerVisble])

    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const displayValue = pubNames[selectedIndex.row];
    const renderOption = (name) => (
        <SelectItem key={name} title={name} />
    );
    let placeData = _.find(pub, ['name', displayValue])

    const addParty = useCallback(() => {
        let id = ''
        let data = {
            "name": name,
            "membership": membership,
            "date": date
        }
        {
            fromPub ?
                id = pubNow?.id
                :
                id = placeData?.id
        }
        // if (validateForm()) {
        //     const unixDate = date.getTime()
        console.log('test', id)
        console.log(data)
        setIsLoadingAddParty(true)
        partyAPI.add(id, data,token)
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
                setMembership('')
            })
        // }
    }, [fromPub, pubNow, name, membership, date, placeData])
    const getPub = useCallback(() => {
        pubAPI.get()
            .then(res => {
                setPub(res)
                const temp = []
                res.map(r => {
                    temp.push(r.name)
                })
                setPubNames(temp)
            })
            .catch(error => { })
    }, [])
    useEffect(() => {
        getPub()
    }, [getPub])

    console.log(date)
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
                        {/* name */}
                        <Input
                            style={styles.input}
                            label='Name'
                            status={!nameFocus || checkName ? 'info' : 'danger'}
                            caption={!nameFocus || checkName ? null : 'Can not be empty'}
                            autoCapitalize='none'
                            placeholder='example'
                            accessoryRight={!nameFocus ? null : checkName ? CorrectIcon : WrongIcon}
                            captionIcon={!nameFocus || checkName ? null : AlertIcon}
                            value={name}
                            onChangeText={setName}
                            onFocus={() => { setNameFocus(true); }}
                        />
                        {/* membership */}
                        <Input
                            style={styles.input}
                            label='Member Amount'
                            status={!membershipFocus || checkMembership ? 'info' : 'danger'}
                            caption={!membershipFocus || checkMembership ? null : 'Can not be empty'}
                            autoCapitalize='none'
                            placeholder='example'
                            accessoryRight={!membershipFocus ? null : checkMembership ? CorrectIcon : WrongIcon}
                            captionIcon={!membershipFocus || checkMembership ? null : AlertIcon}
                            value={membership}
                            onChangeText={setMembership}
                            onFocus={() => { setMembershipFocus(true); }}
                            keyboardType='numeric'
                        />
                        <TouchableOpacity onPress={() => setIsDatePickerVisble(true)}>
                            <Input
                                style={styles.inputDate}
                                label='Date'
                                status={'info'}
                                caption={"Tap to Select"}
                                autoCapitalize='none'
                                accessoryRight={CalenderIcon}
                                captionIcon={AlertIcon}
                                value={dateTime(date)}
                                textStyle={{ color: '#8F9BB3' }}
                                disabled

                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={changeDate}
                            onCancel={() => setIsDatePickerVisble(false)}
                        />
                        {fromPub ?
                            <Input
                                style={styles.inputDate}
                                label='Pub'
                                status={'info'}
                                autoCapitalize='none'
                                value={pubNow.name}
                                textStyle={{ color: '#8F9BB3' }}
                                disabled
                            />
                            :
                            <Select
                                style={styles.input}
                                status='info'
                                label='Pub'
                                placeholder='Default'
                                value={displayValue}
                                selectedIndex={selectedIndex}
                                onSelect={index => {
                                    setSelectedIndex(index)
                                }}>
                                {pubNames.map(renderOption)}
                            </Select>
                        }

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