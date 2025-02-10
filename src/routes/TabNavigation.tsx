import {useEffect} from 'react';
import {Linking} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {
  Countries,
  Cities,
  Places,
  Trips,
  Wishlists,
  Login,
  Registration,
} from '../components';
import {colors} from '../theme';
import {RootStackParamList, UnauthParamList} from '../types';
import {useContextActions, useContextValues} from '../hooks';
import {handleDeepLink} from '../api';
import {CountryInnerNavigation} from './CountryInnerNavigation';

export const TabNavigation = () => {
  const {isAuth} = useContextValues();
  const {setAuthStatus} = useContextActions();

  const Tab = createBottomTabNavigator<RootStackParamList>();
  const UnauthTab = createBottomTabNavigator<UnauthParamList>();

  useEffect(() => {
    const subscription = Linking.addEventListener('url', event =>
      handleDeepLink(event, setAuthStatus),
    );

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({url}, setAuthStatus);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return isAuth ? (
    <Tab.Navigator
      initialRouteName="Trips"
      screenOptions={{
        tabBarActiveBackgroundColor: colors.backgroundAccent,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.backgroundMain,
        tabBarInactiveTintColor: colors.light,
        headerStyle: {backgroundColor: colors.backgroundAccent},
        headerTintColor: colors.light,
      }}>
      <Tab.Screen
        name="Countries"
        component={Countries}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome6
              name="earth-europe"
              iconStyle="solid"
              size={20}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CountryNavigation" // чтобы пробросить дочерний роут
        component={CountryInnerNavigation}
        options={{tabBarItemStyle: {display: 'none'}, headerShown: false}}
      />
      <Tab.Screen
        name="Trips"
        component={Trips}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome6
              name="plane"
              iconStyle="solid"
              size={20}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Wishlists"
        component={Wishlists}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome6
              name="tree-city"
              iconStyle="solid"
              size={20}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  ) : (
    <UnauthTab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarActiveBackgroundColor: colors.backgroundAccent,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.backgroundMain,
        tabBarInactiveTintColor: colors.light,
        headerStyle: {backgroundColor: colors.backgroundAccent},
        headerTintColor: colors.light,
      }}>
      <UnauthTab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome6
              name="right-to-bracket"
              iconStyle="solid"
              size={20}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <UnauthTab.Screen
        name="Registration"
        component={Registration}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome6
              name="address-card"
              iconStyle="solid"
              size={20}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </UnauthTab.Navigator>
  );
};

{
  /* <Tab.Screen
        name="Book" // чтобы пробросить дочерний роут
        component={BookNavigation}
        options={{tabBarItemStyle: {display: 'none'}, headerShown: false}}
      />
      <Tab.Screen
        name="BookBySpecificDate" // чтобы пробросить дочерний роут
        component={BooksByDate}
        options={{tabBarItemStyle: {display: 'none'}, headerShown: false}}
      />
      <Tab.Screen
        name="BookByTag" // чтобы пробросить дочерний роут
        component={BooksByTag}
        options={{tabBarItemStyle: {display: 'none'}, headerShown: false}}
      />
      <Tab.Screen
        name="Author" // чтобы пробросить дочерний роут
        component={Author}
        options={{tabBarItemStyle: {display: 'none'}, headerShown: false}}
      />
      <Tab.Screen
        name="MostRededAuthors" // чтобы пробросить дочерний роут
        component={CardListMostRededAuthors}
        options={{tabBarItemStyle: {display: 'none'}, headerShown: false}}
      /> */
}
