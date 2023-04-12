/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LogInScreen';
import HeroeOverviewScreen from './screens/ChampionOverviewScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return <Tab.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Favs" component={FavoritesScreen} />
    <Tab.Screen name="LogIn" component={LoginScreen} />
  </Tab.Navigator>
}

const Stack: any = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider >
      <Provider store={store}>
      <NavigationContainer>

        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="MainTab" component={MainTabNavigator} />
          <Stack.Screen name="HeroeOverView" component={HeroeOverviewScreen} />
        </Stack.Navigator>

      </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;


