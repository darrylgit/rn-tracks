import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

import Map from '../components/Map';
import { Context as LocationContext } from '../contexts/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation
  } = useContext(LocationContext);

  const callback = useCallback(
    location => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <KeyboardAvoidingView>
        <ScrollView>
          <Text h2>Create a Track</Text>
          <Map />
          {err ? <Text>Please enable location services</Text> : null}
          <TrackForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = () => {
  return {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name='plus' size={20} />
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withNavigationFocus(TrackCreateScreen);
