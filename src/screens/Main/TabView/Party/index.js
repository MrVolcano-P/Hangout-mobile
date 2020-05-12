import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Button, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import { FlatGrid } from 'react-native-super-grid';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import partyAPI from 'src/api/party'
import { useSelector } from 'react-redux';

function Item({ item, setData, setVisible }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => {
                setData(item)
                setVisible(true)
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

export default Party = (props) => {
    const pub = useSelector(state => state.pub)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState({})
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [party, setParty] = useState(props.party)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    var datafilter = party.filter(data => data.placeID === pub.id)
    var datefilter = datafilter.filter(d => moment(parseInt(d.date)).format('DD-MM') === moment(date).format('DD-MM'))

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
                <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center', }}>
                    <Text>No Party</Text>
                </View>
                :
                <View style={{ flex: 6 }}>
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
            {data.member !== undefined ?
                <Modal isVisible={visible}
                    backdropColor='rgba(255, 253, 253, 0.5)'
                    backdropOpacity={2}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <View style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: 'black', }}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={styles.modaltitle}>{data.title}</Text>
                                        <Text>{data.member.length}/{data.amount}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                                        <TouchableOpacity onPress={() => setVisible(false)}>
                                            <Text style={styles.modaltitle}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flex: 3 }}>
                                <FlatGrid
                                    itemDimension={60}
                                    items={data.member}
                                    renderItem={({ item, index }) => (
                                        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={{ uri: 'https://reactjs.org/logo-og.png' }}
                                                    style={{ width: 80, height: 80, borderRadius: 80 / 2 }} />
                                            </View>
                                            <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.username}</Text>
                                        </View>
                                    )
                                    }
                                />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                <Button title="Join" onPress={() => console.log('join', data.title)} />
                            </View>
                        </View>

                    </View>
                </Modal>
                :
                <></>
            }

        </>
    )
}
