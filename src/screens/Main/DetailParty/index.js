import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import pubAPI from 'src/api/pub'
import _ from 'lodash'
import { dateTime } from 'src/helpers/text'
import { FlatGrid } from 'react-native-super-grid'
import getDirections from 'react-native-google-maps-directions'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import Geolocation from 'react-native-geolocation-service'
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);
export default DetailParty = (props) => {
    require('moment-countdown');
    const navigation = useNavigation()
    // const [pub, setPub] = useState([])
    const [data, setData] = useState(props.route.params.data)
    const [timeleft, setTimeleft] = useState(Math.floor((parseInt(data.date) - +new Date()) / 1000))
    const [finish, setFinish] = useState(false)
    const [coordinate, setCoordinate] = useState({})
    const handleGetDirections = () => {
        const direction = {
            source: {
                latitude: parseFloat(coordinate?.latitude),
                longitude: parseFloat(coordinate?.longitude)
            },
            destination: {
                latitude: parseFloat(data.pub.geolocation.latitude),
                longitude: parseFloat(data.pub.geolocation.longtitude)
            }
        }
        getDirections(direction)
    }
    const getPub = useCallback(() => {
        pubAPI.get()
            .then((pubs) => {
                setPub(pubs)
            })
            .catch(error => { })
    }, [])
    useEffect(() => {
        // getPub()
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then(result => {
                if (result === RESULTS.GRANTED) {
                    callLocation((position) => {
                        setCoordinate(position.coords)
                    })
                }
                if (result === RESULTS.DENIED) {
                    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                        .then(result => {
                            if (result === RESULTS.GRANTED) {
                                callLocation((position) => {
                                    setCoordinate(position.coords)
                                })
                            }
                            else if (result === RESULTS.DENIED) {
                                alert('Please accept')
                            }
                            else if (result === RESULTS.BLOCKED) {
                                alert('Thank you')
                            }
                        })
                    return
                }
                if (result === RESULTS.BLOCKED) {
                    alert('...')
                }
            })
    }, [getPub])
    const callLocation = (callback) => {
        Geolocation.getCurrentPosition(
            (position) => {
                callback(position)
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }
    return (
        <>
            <SafeAreaView>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.navigate('BottomTab')}
                    />
                    <ContentTitle title={data.name} style={styles.contentTitle} />
                    <Appbar.Action />
                </Appbar.Header>
            </SafeAreaView>
            <View style={[styles.content, { opacity: 100 }]} >
                <View style={styles.contentView1}>
                    <Text style={styles.title}>{data.members.length}/{data.membership}</Text>
                </View>
                <View style={styles.contentView2}>

                    <Text style={styles.title2}>{dateTime(data.date)}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View style={[styles.contentView2, { backgroundColor: '#5F67B1' }]}>
                    <Text style={styles.title3}>{data.pub.name}</Text>
                </View>
                <View style={[styles.contentView1, { backgroundColor: '#F8C441' }]}>
                    <TouchableOpacity onPress={() => handleGetDirections()}>
                        <Text style={styles.title}>Go!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 12 }}>
                <View style={styles.chat}>
                    {/* <View style={{ marginVertical: 5 }}>
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
                    // <View style={styles.headChat}>
                    //     <Text style={styles.headChatText}>Chat Room</Text>
                    // </View>
                    <View style={styles.chatContent}>
                        <Chat id={data.id} />
                    </View> */}
                    <View style={styles.headChat}>
                        <Text style={styles.headChatText}>Members</Text>
                    </View>
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
            </View>
        </>
    )
}
