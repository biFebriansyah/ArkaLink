import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import {
  GiftedChat,
  Send,
} from 'react-native-gifted-chat';
import Color from '../../../public/Style/Color';
import AsyncStorage from '@react-native-community/async-storage';
import { Bubble, } from 'react-native-gifted-chat';
import database, { firebase } from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';

export default class Chat extends Component {

  state = {
    message: '',
    messageList: [],
    person: this.props.navigation.getParam('item'),
    userId: '',
    userName: '',
    userAvatar: '',
  };

  onSend = async () => {
    if (this.state.message.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.userId)
        .child(this.state.person.id)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.userId,
          name: this.state.userName,
          avatar: this.state.userAvatar,
        },
      };
      updates[
        'messages/' +
        this.state.userId +
        '/' +
        this.state.person.id +
        '/' +
        msgId
      ] = message;
      updates[
        'messages/' +
        this.state.person.id +
        '/' +
        this.state.userId +
        '/' +
        msgId
      ] = message;
      firebase.database()
        .ref()
        .update(updates);
      this.setState({ message: '' });
    }
  };

  async componentDidMount() {
    const { displayName, uid, photoURL } = await firebase.auth().currentUser;
    const userId = uid;
    const userName = displayName;
    const userAvatar = photoURL;
    console.log(userId)
    this.setState({ userId, userName, userAvatar });
    database()
      .ref('messages')
      .child(userId)
      .child(this.state.person.id)
      .on('child_added', val => {
        this.setState(previousState => ({
          messageList: GiftedChat.append(previousState.messageList, val.val()),
        }));
      });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Color.indicator,
          },
        }}
        textStyle={{
          right: {
            color: Color.textDark,
          }

        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            marginRight: 20,
            marginBottom: 5,
          }}>
          <Ionicons name='ios-paper-plane' size={35} color={Color.primary} />
        </View>
      </Send>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Color.secondary }}>
        <GiftedChat
          renderSend={this.renderSend}
          renderBubble={this.renderBubble}
          text={this.state.message}
          onInputTextChanged={val => {
            this.setState({ message: val });
          }}
          messages={this.state.messageList}
          onSend={() => this.onSend()}
          user={{
            _id: this.state.userId,
          }}
        />
      </View>
    );
  }
}
