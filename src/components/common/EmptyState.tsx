import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface EmptyStateProps {
  icon: string;
  message: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

const EmptyState = ({
  icon,
  message,
  buttonText,
  onButtonPress,
}: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={64}
        color={theme.colors.onSurfaceDisabled}
      />
      <Text variant="titleMedium" style={styles.text}>
        {message}
      </Text>
      {buttonText && onButtonPress && (
        <Button mode="contained" onPress={onButtonPress} icon="plus">
          {buttonText}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  text: {
    marginVertical: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
});

export default EmptyState;
