import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../contexts/AuthContext';

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
      <Spacer>
        <Button title='Sign Out' onPress={signOut} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = () => {
  return {
    title: 'Account',
    tabBarIcon: <FontAwesome name='gear' size={20} />
  };
};

const styles = StyleSheet.create({});

export default AccountScreen;
