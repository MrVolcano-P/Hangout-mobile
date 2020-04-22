import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

export default PartyDetail = (props) => {
    const navigation = useNavigation()
    const [data, setData] = useState(props.route.params.data)
    console.log(data.date)
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
                <View style={{flex:1}}>
                    <View style={styles.content}>
                        <View style={styles.contentView1}>
                            <Text style={styles.title}>{data.member.length}/{data.amount}</Text>
                        </View>
                        <View style={styles.contentView2}>
                            <Text style={styles.title}>{moment(parseInt(data.date)).format('DD-MM-YYYY')}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}>

                </View>
                <View style={{flex:10}}>

                </View>
            </View>
        </>
    )
}


