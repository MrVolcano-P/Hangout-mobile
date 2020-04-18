import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Button, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import { FlatGrid } from 'react-native-super-grid';

const DATA = [
    {
        id: '1',
        title: 'ใจเหงาๆ',
        member: [{ username: 'boy' }, { username: 'poom' }],
        amount: '5'

    },
    {
        id: '2',
        title: 'โซน U คับ',
        member: [{ username: 'boy' }, { username: 'poom' }, { username: 'boy' }, { username: 'boy' },
        { username: 'boy' }, { username: 'boy' },
        ],
        amount: '12'
    },
    {
        id: '3',
        title: 'ตี้สาวโสด',
        member: [{ username: 'boy' },],
        amount: '7'
    },
    {
        id: '4',
        title: 'หาสาวโสดนั่งเล่นกันครับ',
        member: [{ username: 'boy' }],
        amount: '2'
    },
];



function Item({ item, setData, setVisible }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.button}
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

export default Party = () => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState(DATA[0])
    console.log(visible)
    console.log(data)
    return (
        <>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} setData={(data) => setData(data)} setVisible={(value) => setVisible(value)} />}
                keyExtractor={item => item.id}
            />
            <Modal isVisible={visible}
                backdropColor='rgba(255, 253, 253, 0.5)'
                backdropOpacity={2}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.modal}>
                        <View style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: 'black', }}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ flex: 1 }}></View>
                                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={styles.modaltitle}>{data.title}</Text>
                                    <Text>{data.member.length}/{data.amount}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end',marginRight:10 }}>
                                    <TouchableOpacity onPress={() => setVisible(false)}>
                                        <Text style={styles.modaltitle}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                        <View style={{ flex: 3 }}>
                            <FlatGrid
                                itemDimension={90}
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
                        <View style={{ flex: 1 }}>
                            <Button title="Join" onPress={() => console.log('join',data.title)} />
                        </View>
                    </View>

                </View>
            </Modal>
        </>
    )
}
