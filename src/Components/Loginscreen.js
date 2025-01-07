import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { resetUsers, setLogin } from '../Store';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const handleSubmit = () => {
    if (login.trim()) {
      dispatch(resetUsers()); 
      navigation.navigate('Results');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Enter username to search it on github.</Text>
      <TextInput
        mode="outlined"
        label="Enter GitHub Username"
        value={login}
        onChangeText={(text) => dispatch(setLogin(text))}
        style={styles.input}
        accessibilityLabel="Enter GitHub Username"
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        accessibilityLabel="Submit Button"
      >
        Search
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'left',
    marginBottom: 10,
    fontSize:12
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default LoginScreen;
