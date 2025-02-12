import {useEffect} from 'react';
import {Linking} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {
  Countries,
  Trips,
  Wishlists,
  Login,
  Registration,
  Trip,
  Wishlist,
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
      <Tab.Screen
        name="Trip" // чтобы пробросить дочерний роут
        component={Trip}
        options={{tabBarItemStyle: {display: 'none'}, headerShown: false}}
      />
      <Tab.Screen
        name="Wishlist" // чтобы пробросить дочерний роут
        component={Wishlist}
        options={{tabBarItemStyle: {display: 'none'}, headerShown: false}}
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
