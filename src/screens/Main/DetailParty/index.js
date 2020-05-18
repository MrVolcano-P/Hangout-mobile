import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import moment, { months } from 'moment'
import countdown from 'countdown'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CountDown from 'react-native-countdown-component';
import Chat from '../Chat'
import pubAPI from 'src/api/pub'
import _ from 'lodash'
import { dateTime } from 'src/helpers/text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);
export default DetailParty = (props) => {
    require('moment-countdown');
    const navigation = useNavigation()
    const [pub, setPub] = useState([])
    const [data, setData] = useState(props.route.params.data)
    const [timeleft, setTimeleft] = useState(Math.floor((parseInt(data.date) - +new Date()) / 1000))
    const [finish, setFinish] = useState(false)
    const place = _.find(pub, function (o) { return o.id === data.placeID })

    const getPub = useCallback(() => {
        pubAPI.get()
            .then((pubs) => {
                setPub(pubs)
            })
            .catch(error => { })
    }, [])

    useEffect(() => {
        getPub()
    }, [getPub])

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
            <View style={[styles.content, { opacity: 100 }]} >
                <View style={styles.contentView1}>
                    <Text style={styles.title}>{data.member.length}/{data.amount}</Text>
                </View>
                <View style={styles.contentView2}>
                    <Text style={styles.title2}>{moment(parseInt(data.date)).format('DD MMM YYYY kk:mm')}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View style={[styles.contentView2, { backgroundColor: '#5F67B1' }]}>
                    <Text style={styles.title3}>{place?.title}</Text>
                </View>
                <View style={[styles.contentView1, { backgroundColor: '#F8C441' }]}>
                    <TouchableOpacity>
                        <Text style={styles.title}>Go!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 12 }}>
                <View style={styles.chat}>
                    <View style={{ marginVertical: 5 }}>
                        {timeleft < 0 || finish ?
                            <CountDown
                                until={timeleft}
                                size={20}
                                digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: 'red' }}
                                digitTxtStyle={{ color: 'red' }}
                                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                separatorStyle={{ color: 'red' }}
                                timeToShow={['D', 'H', 'M', 'S']}
                                timeLabels={{ m: null, s: null }}
                                showSeparator
                            />
                            :
                            <CountDown
                                until={timeleft}
                                size={20}
                                onFinish={() => setFinish(true)}
                                digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#F8C441' }}
                                digitTxtStyle={{ color: '#F8C441' }}
                                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                separatorStyle={{ color: '#F8C441' }}
                                timeToShow={['D', 'H', 'M', 'S']}
                                timeLabels={{ m: null, s: null }}
                                showSeparator
                            />
                        }

                    </View>
                    <View style={styles.headChat}>
                        <Text style={styles.headChatText}>Chat Room</Text>
                    </View>
                    <View style={styles.chatContent}>
                        <Chat id={data.id} />
                    </View>
                </View>
            </View>
        </>
    )
}
