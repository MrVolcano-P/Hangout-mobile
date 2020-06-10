import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground, ScrollView, Image } from 'react-native'
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
import _ from 'lodash'
import { Button } from 'react-native-elements';
import Spinner from 'react-native-spinkit'

function Item({ item, setData, setVisible }) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => {
                setData(item)
                setVisible(true)
                console.log('click')
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

export default Party = (props) => {
    const token = useSelector(state => state.authToken)
    const pub = useSelector(state => state.pub)
    const profile = useSelector(state => state.profile)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState({})
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false);
    const [party, setParty] = useState([])
    const [isLoadingJoinParty, setIsLoadingJoinParty] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    // var datafilter = party?.filter(data => data.placeID === pub.id)
    var datefilter = party?.filter(d => moment(parseInt(d.date)).format('DD-MM') === moment(date).format('DD-MM'))

    const getParty = useCallback(() => {
        console.log('fetch')
        partyAPI.getById(pub.id)
            .then(res => {
                setParty(res)
                setLoading(false)
            })
            .catch(error => { })
    }, [])

    const join = useCallback(() => {
        setIsLoadingJoinParty(true)
        partyAPI.join(_.concat(data.member, profile), data.id)
            .then(() => {
                console.log('join')
                setVisible(false)
                getParty()
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setIsLoadingJoinParty(false)
            })
    }, [data])

    useEffect(() => {
        getParty()
    }, [getParty, navigation])

    return (
        <>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F1F0' }}>
                    <Spinner color="#321069" type="9CubeGrid" />
                </View>
                :
                <>
                    {party.length === 0 ?
                        <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center', }}>
                            <Text>No Party</Text>
                        </View>
                        :
                        <View style={{ flex: 7 }}>
                            <FlatList
                                data={party}
                                renderItem={({ item }) => <Item item={item} setData={(data) => setData(data)} setVisible={setVisible} />}
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
                                    {console.log(date)}
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
                    {show && (
                        <DateTimePicker
                            value={new Date(date)}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    {data.members !== undefined ?
                        <Modal isVisible={visible}
                            backdropColor='rgba(51, 51, 51, 0.5)'
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
                                                <Text style={styles.modaltitle}>{data.name}</Text>
                                                <Text>{data.members.length}/{data.membership}</Text>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                                <TouchableOpacity onPress={() => setVisible(false)}>
                                                    <Icon name="times" size={20} color="#000" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            borderBottomColor: 'black',
                                            borderBottomWidth: 2,
                                            marginHorizontal: 15
                                        }}
                                    />
                                    <View style={{ flex: 3 }}>
                                        <FlatGrid
                                            itemDimension={60}
                                            items={data.members}
                                            renderItem={({ item, index }) => (
                                                <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        {item?.img === undefined || item?.img === '' ?
                                                            <Image source={require('src/assets/no-avatar.jpg')}
                                                                style={{ width: 80, height: 80, borderRadius: 5 }} />
                                                            :
                                                            <Image source={{ uri: item?.img }}
                                                                style={{ width: 80, height: 80, borderRadius: 5 }} />
                                                        }

                                                    </View>
                                                    <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.name}</Text>
                                                </View>
                                            )
                                            }
                                        />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                        {token === null ?
                                            <Button
                                                title="Login"
                                                onPress={() => {
                                                    navigation.navigate('Login')
                                                    setVisible(false)
                                                }}
                                                color="#F2F1F0"
                                                buttonStyle={styles.btn}
                                            />
                                            :
                                            _.includes(_.map(data?.members, 'username'), profile?.username) || _.eq(data?.leader?.username, profile?.username) ?
                                                <Button title="Chat" onPress={() => {
                                                    navigation.navigate('DetailParty', {
                                                        data: data
                                                    })
                                                    setVisible(false)
                                                }}
                                                    color="#F2F1F0"
                                                    buttonStyle={styles.btn}
                                                />
                                                :
                                                <Button
                                                    title="Join"
                                                    onPress={join}
                                                    loading={isLoadingJoinParty}
                                                    color="#F2F1F0"
                                                    buttonStyle={styles.btn}
                                                />
                                        }
                                    </View>
                                </View>

                            </View>
                        </Modal>
                        :
                        <></>
                    }
                </>
            }


        </>
    )
}
