import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useContext} from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {Countries, Cities, Places, Trips, Wishlists} from '../components';
import {themeContext} from '../theme';
import {RootStackParamList} from '../types';

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  const colors = useContext(themeContext);

  return (
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
      {/* <Tab.Screen
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
      /> */}
    </Tab.Navigator>
  );
};
