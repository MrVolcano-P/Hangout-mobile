import React, { useEffect, useState, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import partyAPI from 'src/api/party'
import { useSelector } from 'react-redux'

export default PartyDetail = (props) => {
    const profile = useSelector(state => state.profile)
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const getParty = useCallback(() => {
        partyAPI.getById(props.id)
            .then((party) => {
                setMessages(party.message)
            })
            .catch(error => { })
    }, [])

    useEffect(() => {
        getParty()
    }, [getParty])

    function handleSend(newMessage = []) {
        setMessages(GiftedChat.append(messages, newMessage));
        console.log(GiftedChat.append(messages, newMessage))
        partyAPI.sendMsg(GiftedChat.append(messages, newMessage), props.id)
            .then(() => {
                console.log('sent')
            })
            .catch(error => { })
    }

    // console.log(messages)

    return (
        <GiftedChat
            messages={messages}
            text={text}
            onInputTextChanged={setText}
            onSend={newMessage => handleSend(newMessage)}
            user={{
                _id: profile.id,
                name: profile.username,
                avatar: profile.img,
            }}
        />
    )

}