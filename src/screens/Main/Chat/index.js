import React, { useEffect, useState, useCallback } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
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
        // const interval = setInterval(() => {
        //     getParty()
        // }, 1000);
        // return () => clearInterval(interval);
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

    const renderBubble = (props) => (
        <Bubble
            {...props}
            usernameStyle={{ color: 'tomato', fontWeight: 'bold' }}
        />
    );
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
            alwaysShowSend
            scrollToBottom
            renderUsernameOnMessage
            renderBubble={renderBubble}
        />
    )

}