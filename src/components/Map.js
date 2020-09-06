import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

import { Context as LocationContext } from '../contexts/LocationContext';

const Map = () => {
  const {
    state: { currentLocation }
  } = useContext(LocationContext);

  let mapRef;

  if (!currentLocation) {
    return <ActivityIndicator size='large' style={{ marginTop: 200 }} />;
  } else {
    mapRef = React.createRef();
  }

  const [regionCoords, updateRegionCoords] = useState({
    latitude: 34.0721664,
    longitude: -84.1908224
  });

  useEffect(() => {
    if (
      mapRef.current &&
      (Math.abs(currentLocation.coords.latitude - regionCoords.latitude) >
        0.0035 ||
        Math.abs(currentLocation.coords.longitude - regionCoords.longitude) >
          0.0035)
    ) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        },
        1000
      );

      updateRegionCoords({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
    }
  }, [currentLocation]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      // region={{
      //   ...currentLocation.coords,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01
      // }}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor='rgba(158, 158, 255, 1.0)'
        fillColor='rgba(158, 158, 255, 0.3)'
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;
