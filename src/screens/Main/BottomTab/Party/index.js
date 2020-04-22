import React, { useState, useRef, useCallback } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Appbar, TextInput } from 'react-native-paper'
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5'
import PartyList from '../../PartyList'

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

export default PartyBottom = () => {
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [place, setPlace] = useState('')
    const [date, setDate] = useState(new Date())
    const [isLoadingRegister, setIsLoadingRegister] = useState(false)
    const [isDatePickerVisible, setIsDatePickerVisble] = useState(false)
    const [isTimePickerVisible, setIsTimePickerVisble] = useState(false)
    const [partyAmount, setPartyAmount] = useState('')
    const dispatch = useDispatch()

    const placeInput = useRef()
    const partyAmountInput = useRef()

    const changeDate = useCallback((date) => {
        setIsDatePickerVisble(false)
        setDate(date)
        setIsTimePickerVisble(true)
    }, [setDate, setIsDatePickerVisble])

    const changeTime = useCallback((date) => {
        setIsTimePickerVisble(false)
        setDate(date)
        partyAmountInput.current.focus()
    }, [setDate, setIsTimePickerVisble])
    return (
        <>
            <SafeAreaView>
                <Appbar.Header>
                    <Appbar.Action />
                    <ContentTitle title='Party' style={styles.contentTitle} />
                    <Appbar.Action icon="plus" onPress={() => setVisible(true)} />
                </Appbar.Header>
            </SafeAreaView>
            <PartyList />
            <Modal isVisible={visible}
                backdropColor='rgba(255, 253, 253, 0.5)'
                backdropOpacity={2}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.modalTop}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ flex: 1 }}></View>
                                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={styles.modaltitle}>Add Party</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'baseline', justifyContent: 'center', }}>
                                    <TouchableOpacity onPress={() => setVisible(false)}>
                                        <Icon name="times" size={30} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
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
                                    onSubmitEditing={() => setIsDatePickerVisble(true)}
                                />
                                <TextInput
                                    ref={placeInput}
                                    label="Place"
                                    mode="outlined"
                                    style={styles.input}
                                    value={place}
                                    onChangeText={setPlace}
                                    textContentType="location"
                                    returnKeyType="next"
                                    editable={false}
                                />
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
                                    mode="date"
                                    onConfirm={changeDate}
                                    onCancel={() => setIsDatePickerVisble(false)}
                                />
                                <TouchableOpacity onPress={() => setIsTimePickerVisble(true)}>
                                    <TextInput
                                        label="Time"
                                        mode="outlined"
                                        style={styles.input}
                                        value={moment(date).format('HH:mm')}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isTimePickerVisible}
                                    mode="time"
                                    onConfirm={changeTime}
                                    onCancel={() => setIsTimePickerVisble(false)}
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
                    </View>
                </View>
            </Modal>
        </>
    )
}

