import {ActivityIndicator, View, StyleSheet} from 'react-native';

import React from 'react';
import Colors from '../values/Colors';

export const Loader = (props) => {
  return props.loader ? (
    <View style={[styles.loading, props.style]}>
      <ActivityIndicator
        size={props.size ? props.size : 'large'}
        color={props.color ? props.color : Colors.primaryColor}
      />
    </View>
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
