import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import { persistor, store } from './src/features/store';
import ChosenTask from './src/screens/ChosenTask';
import { PersistGate } from 'redux-persist/integration/react';
import { navigationRef } from './src/services/NavigationService';

type RootStackParamList = {
  Home: undefined;
  ChosenTask: undefined;
  Scanner: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="ChosenTask" >
              {props => <ChosenTask {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
