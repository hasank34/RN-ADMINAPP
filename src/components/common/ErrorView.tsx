import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ErrorViewProps {
  message: string;
}

const ErrorView = ({message}: ErrorViewProps) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ErrorView;
