import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import {
  GiftedChat,
  Send,
} from 'react-native-gifted-chat';
import Color from '../../../public/Style/Color';
import { Bubble, InputToolbar } from 'react-native-gifted-chat';
import database, { firebase } from '@react-native-firebase/database';
import { Icon } from 'native-base'

export default class Chat extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:
        <TouchableOpacity onPress={() => navigation.navigate('PerofileFriends', { item: navigation.getParam('item') })}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image source={{ uri: navigation.getParam('item').photo }} style={{ width: 40, height: 40, borderRadius: 100, overflow: 'hidden', marginRight: 10, backgroundColor: Color.darkprimary }} />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>{navigation.getParam('item').name}</Text>
              <Text style={{ color: 'white' }}>{navigation.getParam('item').status}</Text>
            </View>
          </View>
        </TouchableOpacity>,
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}
          style={{ padding: 10 }}>
          <Icon size={27} name='arrowleft' style={{ color: '#fff' }} type='AntDesign' />
        </TouchableOpacity>
      )
    };
  }

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

  renderInputToolbar(props) {
    return (
      <InputToolbar {...props} containerStyle={style.inputToolBar} />
    )
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={style.icons}>
          <Icon name='send-circle-outline' type='MaterialCommunityIcons' style={style.icon} />
        </View>
      </Send>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          renderSend={this.renderSend}
          alwaysShowSend={true}
          renderBubble={this.renderBubble}
          textInputProps={{ autoFocus: true }}
          textInputStyle={style.textInputStyle}
          renderInputToolbar={this.renderInputToolbar}
          text={this.state.message}
          alignTop={true}
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

const style = StyleSheet.create({
  icon: {
    color: Color.primary,
    fontSize: 40
  },
  inputToolBar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0,
  },
  textInputStyle: {
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 0,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 5
  },
  icons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  }
})