import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import { persistor, store } from './src/features/store';
import ChosenTask from './src/screens/ChosenTask';
import { PersistGate } from 'redux-persist/integration/react';
import RNFS, { downloadFile, DownloadFileOptions, DownloadResult } from 'react-native-fs';

type RootStackParamList = {
  Home: undefined;
  ChosenTask: undefined;
  Scanner: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


const downloadImage = async (url: string, fileName: string): Promise<any> => {
  //Define path to store file along with the extension
  const path = `${RNFS.DocumentDirectoryPath}/${fileName}.jpg`;

  //Define options
  const options: DownloadFileOptions = {
    fromUrl: url,
    toFile: path,
    // headers: headers
  }
  //Call downloadFile

  const response = await downloadFile(options);
  return response.promise.then(async (res: DownloadResult) => {
    console.log('>>>>>>>>', res)
  })

};

const App = () => {

  useEffect(() => {
    console.log('downloadsFolder >> ', RNFS.DownloadDirectoryPath)
    downloadImage('https://www.collinsdictionary.com/images/full/apple_158989157_1000.jpg', 'apple_158989157_1000')

  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
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
