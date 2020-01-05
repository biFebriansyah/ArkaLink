import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import {
  GiftedChat,
  Send,
} from 'react-native-gifted-chat';
import Color from '../../../public/Style/Color';
import { Bubble, } from 'react-native-gifted-chat';
import database, { firebase } from '@react-native-firebase/database';
import { Icon } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';

export default class Chat extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 
      <TouchableOpacity onPress={() => navigation.navigate('FriendProfile', { item: navigation.getParam('item') })}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Image source={{ uri: navigation.getParam('item').photo }} style={{ width: 45, height: 45, borderRadius: 100, overflow: 'hidden', marginRight: 10, backgroundColor: Color.darkprimary }} />
          </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>{navigation.getParam('item').name}</Text>
              <Text style={{color: 'white'}}>{navigation.getParam('item').status}</Text>
            </View>
        </View>
      </TouchableOpacity>,
      headerStyle: {
        backgroundColor: Color.primary,
      },
    };
  };

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
            color: Color.TextLight,
          }

        }}
      />
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View>
            <Icon name='send-circle-outline' type='MaterialCommunityIcons' size={30} color={Color.primary} />
        </View>
      </Send>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
