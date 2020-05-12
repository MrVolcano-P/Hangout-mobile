import React, { useState, useRef, useCallback } from 'react'
import { View, Text, Image, ImageBackground, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Searchbar, TextInput } from 'react-native-paper';
import styles from './styles'
import { Button } from 'react-native-elements'
import Party from '../TabView/Party'
import Review from '../TabView/Review'
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import partyAPI from 'src/api/party'
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const initialLayout = { width: Dimensions.get('window').width };



export default Detail = (props) => {
    const pub = useSelector(state => state.pub)
    const image = { uri: pub.pic }
    const [index, setIndex] = React.useState(0);
    const [profile, setProfile] = useState({ username: 'Boy' })
    const navigation = useNavigation()
    const [routes] = React.useState([
        { key: 'first', title: 'Party' },
        { key: 'second', title: 'Review' },
    ]);
    const PartyRoute = () => (
        <Party />
    );
    const ReviewRoute = () => (
        <Review />
    )
    const renderScene = SceneMap({
        first: PartyRoute,
        second: ReviewRoute,
    });

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [place, setPlace] = useState(pub.title)
    const [date, setDate] = useState(new Date())
    const [isLoadingAddParty, setIsLoadingAddParty] = useState(false)
    const [isDatePickerVisible, setIsDatePickerVisble] = useState(false)
    const [partyAmount, setPartyAmount] = useState('')

    const placeInput = useRef()
    const partyAmountInput = useRef()

    const changeDate = useCallback((date) => {
        setIsDatePickerVisble(false)
        setDate(date)
        partyAmountInput.current.focus()
    }, [setDate, setIsDatePickerVisble])

    const addParty = useCallback(() => {
        if (name && place && date && partyAmount) {
            const unixDate = date.getTime()
            setIsLoadingAddParty(true)
            partyAPI.add(name, partyAmount, unixDate.toString(), profile, pub.id)
                .then(() => {
                    console.log('success')
                    setVisible(false)
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

    return (
        <>
            <SafeAreaView style={styles.contentContaier}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <ContentTitle title={pub.title} style={styles.contentTitle} />
                    <Appbar.Action icon="plus" onPress={() => setVisible(true)} />
                </Appbar.Header>
            </SafeAreaView>
            <View style={styles.imgview}>
                <ImageBackground source={image}
                    style={styles.img} />
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={styles.tabViewContainer}
            />
            <Modal isVisible={visible}
                backdropColor='rgba(255, 253, 253, 0.5)'
                backdropOpacity={2}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
            >
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
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
