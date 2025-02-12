import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Surface, Text} from 'react-native-paper';
import {Formik} from 'formik';
import {loginValidationSchema} from '../utils/schema';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation<RootStackParamList>();
  const handleLogin = (_values: {username: string; password: string}) => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainTabs'}],
    });
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="headlineMedium" style={styles.title}>
          Giriş Yap
        </Text>
        <Formik
          initialValues={{username: '', password: ''}}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <TextInput
                label="Kullanıcı Adı"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username && !!errors.username}
                mode="outlined"
                style={styles.input}
                autoCapitalize="none"
              />
              {touched.username && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <TextInput
                label="Şifre"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && !!errors.password}
                mode="outlined"
                secureTextEntry
                style={styles.input}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isSubmitting}
                style={styles.button}>
                Giriş Yap
              </Button>
            </>
          )}
        </Formik>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: '#B00020',
    fontSize: 12,
    marginBottom: 8,
  },
});

export default LoginScreen;
