import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface} from 'react-native-paper';

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer = ({children}: FormContainerProps) => {
  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>{children}</Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
});

export default FormContainer;
