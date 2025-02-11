import {View} from 'react-native';
import {Search} from '../search';
import {CountriesProps} from '../../types';

export const Header = ({navigation, route}: CountriesProps) => {
  return (
    <View
      style={{
        paddingLeft: 10,
        backgroundColor: '#000',
        zIndex: 2,
      }}>
      <Search navigation={navigation} route={route} />
    </View>
  );
};
