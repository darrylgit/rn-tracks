import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Text } from 'react-native-elements';

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
      <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'position' : null}
      // style={styles.container}
      // keyboardVerticalOffset={90}
      >
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withNavigationFocus(TrackCreateScreen);
