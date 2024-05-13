import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './CustomLoader.style';

const CustomLoader = ({color}) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

export default CustomLoader;
