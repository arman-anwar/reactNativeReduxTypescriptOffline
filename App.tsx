import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import { persistor, store } from './src/features/store';
import ChosenTask from './src/screens/ChosenTask';
import { PersistGate } from 'redux-persist/integration/react';

type RootStackParamList = {
  Home: undefined;
  ChosenTask: undefined;
  Scanner: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {

  const [toDoList, setToDoList] = useState([{ id: 1, task: 'brush your teeth' }]);
  const [task, setTask] = useState('');
  const [chosenTask, setChosenTask] = useState('');

  const GlobalState = {
    toDoList, setToDoList,
    task, setTask,
    chosenTask, setChosenTask
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="ChosenTask" options={{ headerShown: false }}>
              {props => <ChosenTask {...props} GlobalState={GlobalState} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
