import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import {theme} from './src/theme';
import {store} from './src/store/store';
import {StyleSheet} from 'react-native';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StoreProvider store={store}>
          <PaperProvider theme={theme}>
            <AppNavigator />
            <Toast position="top" topOffset={60} visibilityTime={2000} />
          </PaperProvider>
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
