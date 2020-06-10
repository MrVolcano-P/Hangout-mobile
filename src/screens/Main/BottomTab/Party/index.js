import React, { useState, useRef, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Appbar, TextInput } from 'react-native-paper'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardView from 'react-native-cardview';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import partyAPI from 'src/api/party';
import { Button } from 'react-native-elements'
import Spinner from 'react-native-spinkit'

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

function Item({ item, setData, setVisible }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.navigate('DetailParty', {
                    data: item
                })
            }}
        >
            <View style={styles.item}>
                <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}>
                    <View style={styles.content}>
                        <View style={styles.contentView1}>
                            <Text style={styles.title}>{item.members.length}/{item.membership}</Text>
                        </View>
                        <View style={styles.contentView2}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                    </View>
                </CardView>
            </View>
        </TouchableOpacity>


    );
}

export default PartyBottom = () => {
    const navigation = useNavigation()
    const profile = useSelector(state => state.profile)
    const token = useSelector(state => state.authToken)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [party, setParty] = useState([])
    const getParty = useCallback(() => {
        console.log('fetch')
        partyAPI.getByUserID(token)
            .then(res => {
                setParty(res)
                setLoading(false)
            })
            .catch(error => { })
    }, [token])

    useEffect(() => {
        getParty()
    }, [getParty, navigation])

    useFocusEffect(
        React.useCallback(() => {
            getParty();
        }, [getParty])
    );

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    // var datafilter = party?.filter(data => data.member.some(i => i?.username.includes(profile?.username)))

    var datefilter = party?.filter(d => moment(parseInt(d.date)).format('DD-MM') === moment(date).format('DD-MM'))
    console.log(token);
    return (
        <>
            {token === null ?
                <SafeAreaView style={{ flex: 1 }}>
                    <Appbar.Header>
                        <ContentTitle title={'Party'} style={styles.contentTitle} />
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
                <>
                    <SafeAreaView>
                        <Appbar.Header>
                            <Appbar.Action />
                            <ContentTitle title='Party' style={styles.contentTitle} />
                            <Appbar.Action icon="plus" onPress={() => navigation.navigate('AddParty')} />
                        </Appbar.Header>
                    </SafeAreaView>
                    {loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F1F0' }}>
                            <Spinner color="#321069" type="9CubeGrid" />
                        </View>
                        :
                        <View style={styles.container}>
                            {party.length === 0 ?
                                <View style={{ flex: 11, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={styles.nopartyTitle}>No Party</Text>
                                </View>
                                :
                                <View style={{ flex: 11 }}>
                                    <FlatList
                                        data={party}
                                        renderItem={({ item }) => <Item item={item} setData={(data) => setData(data)} setVisible={(value) => setVisible(value)} />}
                                        keyExtractor={item => item.id}
                                        refreshing={datefilter.networkStatus === 4}
                                        onRefresh={() => getParty()}
                                    />
                                </View>
                            }
                            <View style={{ flex: 1, backgroundColor: '#321069', flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}></View>
                                <View style={{ flex: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                            {
                                                date <= moment() ?
                                                    <TouchableOpacity onPress={() => setDate(moment(date).subtract(1, 'days'))} disabled={true}>
                                                        <Icon name="chevron-left" size={22} color="gray" />
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity onPress={() => setDate(moment(date).subtract(1, 'days'))}>
                                                        <Icon name="chevron-left" size={22} color="#F2F1F0" />
                                                    </TouchableOpacity>
                                            }
                                        </View>
                                        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', }}>
                                            {date <= moment() ?
                                                <Text style={{ fontSize: 24, color: '#F2F1F0' }}>Today</Text>
                                                :
                                                <Text style={{ fontSize: 24, color: '#F2F1F0' }}>{moment(date).format('DD MMM')}</Text>
                                            }
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                            <TouchableOpacity onPress={() => setDate(moment(date).add(1, 'days'))}>
                                                <Icon name="chevron-right" size={22} color="#F2F1F0" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                    <TouchableOpacity onPress={() => setShow(true)}>
                                        <Icon name="calendar-alt" size={24} color="#F2F1F0" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                </>
            }
            {show && (
                <DateTimePicker
                    value={new Date(date)}
                    display="default"
                    onChange={onChange}
                />
            )}

        </>
    )
}

