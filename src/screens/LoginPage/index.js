// src/pages/LoginPage.js
import React, {useContext} from 'react';
import {View, Button} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import AuthContext from '../../AuthContext/AuthContext';

const LoginPage = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const handleLogin = () => {
    GoogleSignin.configure({
      androidClientId:
        '180995863150-8qnb9f9lsah612gi265ttnlqjk96vbfm.apps.googleusercontent.com',
      // webClientId:
      //   '180995863150-lnj8b2imiagc8jb7quqv638qrk9cffv4.apps.googleusercontent.com',
      // iosClientId:
      //   '180995863150-cl3os30o3td7o2slhr9oi3bdde2pn4ge.apps.googleusercontent.com',
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(async userInfo => {
              login(userInfo);
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title={'Sign in with Google'} onPress={handleLogin} />
    </View>
  );
};

export default LoginPage;
