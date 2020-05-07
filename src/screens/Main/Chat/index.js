import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
    state = {
        messages: [],
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date().getTime(),
                    user: {
                        _id: 'Boy',
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'Fuck',
                    createdAt: new Date().getTime(),
                    user: {
                        _id: 'Top',
                        name: 'Addd Native',
                        // avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
            
        })
    }  

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        console.log(this.state.messages)
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 'Boy',
                    name: 'Rd Asss',
                }}
            />
        )
    }
}