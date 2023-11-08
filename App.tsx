// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MapDataScreen from './screens/MapDataScreen';
import FlatListDataScreen from './screens/FlatListDataScreen';
import SaveData from './screens/SaveData';
import ShowData from './screens/ShowData';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map Data" component={MapDataScreen} />
        <Stack.Screen name="FlatList Data" component={FlatListDataScreen} />
        <Stack.Screen name="Save Data" component={SaveData}/>
        <Stack.Screen name="Show Data" component={ShowData}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;