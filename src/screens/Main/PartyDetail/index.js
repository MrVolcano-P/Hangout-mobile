import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import moment, { months } from 'moment'
import countdown from 'countdown'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CountDown from 'react-native-countdown-component';
import Chat from '../Chat'

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const DATA = [
    {
        id: '1',
        title: 'ท่าช้าง',
        pic: 'http://www.zocialx.com/wp-content/uploads/2019/03/3-315.jpg',
        geolocation: {
            longtitude: "98.994780",
            latitude: "18.801800"
        }

    },
    {
        id: '2',
        title: 'ตะวันแดง',
        pic: 'https://fastly.4sqi.net/img/general/width960/9742015_lEq6GL-DCWFs6L4f7IiUOix9gWkR4Klj4zotztJZjXY.jpg',
        geolocation: {
            longtitude: "98.964002",
            latitude: "18.797269"
        }
    },
    {
        id: '3',
        title: 'Warm Up',
        pic: 'https://fastly.4sqi.net/img/general/width960/14627946_nj42T4POdU07r3XcCy9BAZkYW_Ze6cfiupQQUyvpMls.jpg',
        geolocation: {
            longtitude: "98.965086",
            latitude: "18.795148"
        }
    },
];


const User = {
    username: 'boy'
}
export default PartyDetail = (props) => {
    const navigation = useNavigation()
    const [profile, setProfile] = useState(User)
    const [data, setData] = useState(props.route.params.data)
    var dataFilter = DATA.filter(d => d.id === data.placeID)
    var place = dataFilter[0]
    require('moment-countdown');

    var time = moment().countdown(parseInt(data.date), countdown.SECONDS).toString()
    console.log(time)

    return (
        <>
            <SafeAreaView>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <ContentTitle title={data.title} style={styles.contentTitle} />
                    <Appbar.Action />
                </Appbar.Header>
            </SafeAreaView>
            <View style={{ flex: 1 }}>
                <View style={styles.content}>
                    <View style={styles.contentView1}>
                        <Text style={styles.title}>{data.member.length}/{data.amount}</Text>
                    </View>
                    <View style={styles.contentView2}>
                        <Text style={styles.title2}>{moment(parseInt(data.date)).format('DD-MM-YYYY')}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={[styles.contentView2, { backgroundColor: '#5F67B1' }]}>
                        <Text style={styles.title3}>{place.title}</Text>
                    </View>
                    <View style={[styles.contentView1, { backgroundColor: '#F8C441' }]}>
                        <TouchableOpacity>
                            <Text style={styles.title}>Go!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 12 }}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text>Countdown</Text>
                            <View>
                                <CountDown
                                    until={10}
                                    size={20}
                                    onFinish={() => console.log('adad')}
                                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#F8C441' }}
                                    digitTxtStyle={{ color: '#F8C441' }}
                                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                    separatorStyle={{ color: '#F8C441' }}
                                    timeToShow={['D', 'H', 'M', 'S']}
                                    timeLabels={{ m: null, s: null }}
                                    showSeparator
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 5, backgroundColor: 'red' }}>
                        <View style={styles.chat}>
                            <View style={styles.headChat}>
                                <Text style={styles.headChatText}>Chat Room</Text>
                            </View>
                            <View style={styles.chatContent}>
                                <Chat />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

