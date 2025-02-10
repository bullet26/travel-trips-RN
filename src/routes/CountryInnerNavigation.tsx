import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CountryStackParamList} from '../types';
import {City, Country, Place} from '../components';

export const CountryInnerNavigation = () => {
  const CountryStack = createNativeStackNavigator<CountryStackParamList>();
  return (
    <CountryStack.Navigator>
      <CountryStack.Screen
        name="Country"
        component={Country}
        options={{headerShown: false}}
      />
      <CountryStack.Screen
        name="City"
        component={City}
        options={{headerShown: false}}
      />
      <CountryStack.Screen
        name="Place"
        component={Place}
        options={{headerShown: false}}
      />
    </CountryStack.Navigator>
  );
};
