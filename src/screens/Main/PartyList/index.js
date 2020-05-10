import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import partyAPI from 'src/api/party';

const User ={
    username:'Boy'
}
function Item({ item, setData, setVisible }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.navigate('PartyDetail',{
                    data:item
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
                            <Text style={styles.title}>{item.member.length}/{item.amount}</Text>
                        </View>
                        <View style={styles.contentView2}>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </View>
                </CardView>
            </View>
        </TouchableOpacity>


    );
}

export default PartyList = () => {
    const [user, setUser] = useState(User)
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [party, setParty] = useState([])
    const getParty = useCallback(() => {
        partyAPI.get()
            .then((parties) => {
                setParty(parties)
            })
            .catch(error => {})
    }, [])

    useEffect(() => {
        getParty()
    }, [ getParty ])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    var datafilter = party.filter(data => data.member.some(i => i.username.includes(user.username)))
    console.log(datafilter.length)
    var datefilter = datafilter.filter(d => moment(parseInt(d.date)).format('DD-MM') === moment(date).format('DD-MM'))
    console.log(datefilter)
    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'gray', flexDirection: 'row' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 5 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            {console.log(date)}
                            {
                                date <= moment() ?
                                    <TouchableOpacity onPress={() => setDate(moment(date).subtract(1, 'days'))} disabled={true}>
                                        <Icon name="chevron-left" size={24} color="#900" />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => setDate(moment(date).subtract(1, 'days'))}>
                                        <Icon name="chevron-left" size={24} color="#900" />
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center', }}>
                            {date <= moment() ?
                                <Text style={{ fontSize: 24 }}>Today</Text>
                                :
                                <Text style={{ fontSize: 24 }}>{moment(date).format('DD-MM')}</Text>
                            }
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <TouchableOpacity onPress={() => setDate(moment(date).add(1, 'days'))}>
                                <Icon name="chevron-right" size={24} color="#900" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => setShow(true)}>
                        <Icon name="calendar-alt" size={30} color="#900" />
                    </TouchableOpacity>
                </View>
            </View>
            {datefilter.length === 0 ?
                <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center', }}>
                    <Text>No Party</Text>
                </View>
                :
                <View style={{ flex: 10 }}>
                    <FlatList
                        data={datefilter}
                        renderItem={({ item }) => <Item item={item} setData={(data) => setData(data)} setVisible={(value) => setVisible(value)} />}
                        keyExtractor={item => item.id}
                    />
                </View>
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


