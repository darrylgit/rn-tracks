import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

import { Context as LocationContext } from '../contexts/LocationContext';

const Map = () => {
  let mapRef;

  const {
    state: { currentLocation, center },
    updateCenter
  } = useContext(LocationContext);

  useEffect(() => {
    if (
      currentLocation &&
      mapRef.current &&
      (Math.abs(currentLocation.coords.latitude - center.latitude) > 0.0035 ||
        Math.abs(currentLocation.coords.longitude - center.longitude) > 0.0035)
    ) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        },
        500
      );

      updateCenter({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
    }
  }, [currentLocation]);

  if (!currentLocation) {
    return <ActivityIndicator size='large' style={{ marginTop: 200 }} />;
  } else {
    mapRef = React.createRef();
  }

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        ...center,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
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
