import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/Store';
import LoginScreen from './src/Components/Loginscreen';
import ResultsScreen from './src/Components/ResultScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'GitHub User Search' }}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{ title: 'Search Results' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
