/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {ReactElement} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/LogInScreen';
import HeroeOverviewScreen from './screens/ChampionOverviewScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SummonerOverviewScreen from './screens/SummonerOverViewScreen';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Spinner from './components/Spinner';
//@ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';
import {colors, sizes} from './styles/main';
import CustomModal from './components/Modal';

const Tab = createBottomTabNavigator();

const iconGenerator = (name: string): ReactElement => {
  return <Icon size={sizes.lg} name={name} color={colors.dark} />;
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.secondary,
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          tabBarIcon: () => iconGenerator('home'),
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={() => ({
          tabBarIcon: () => iconGenerator('edit'),
        })}
      />
      <Tab.Screen
        name="Favs"
        component={FavoritesScreen}
        options={() => ({
          tabBarIcon: () => iconGenerator('staro'),
        })}
      />
      <Tab.Screen
        name="LogIn"
        component={LoginScreen}
        options={() => ({
          tabBarIcon: () => iconGenerator('lock'),
        })}
      />
    </Tab.Navigator>
  );
};

const Stack: any = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="MainTab" component={MainTabNavigator} />
            <Stack.Screen
              name="HeroeOverView"
              component={HeroeOverviewScreen}
            />
            <Stack.Screen
              name="SummonerOverView"
              component={SummonerOverviewScreen}
            />
          </Stack.Navigator>
          <Spinner />
          <CustomModal />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
