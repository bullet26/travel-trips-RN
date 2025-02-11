import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  CountryNavigation: {screen: string; params: {id: string | number}};
  Trips: undefined;
  Countries: undefined;
  Wishlists: undefined;
};

export type UnauthParamList = {
  Login: undefined;
  Registration: undefined;
};

export type CountryStackParamList = {
  Country: {id: string | number};
  City: {id: string | number};
  Place: {id: string | number};
  Tags: undefined;
  Tag: {id: string | number};
};

export type CountriesProps = NativeStackScreenProps<
  RootStackParamList,
  'Countries'
>;

export type CountryProps = NativeStackScreenProps<
  CountryStackParamList,
  'Country',
  'id'
>;

export type CityProps = NativeStackScreenProps<
  CountryStackParamList,
  'City',
  'id'
>;

export type PlaceProps = NativeStackScreenProps<
  CountryStackParamList,
  'Place',
  'id'
>;

export type TagsProps = NativeStackScreenProps<CountryStackParamList, 'Tags'>;

export type TagProps = NativeStackScreenProps<
  CountryStackParamList,
  'Tag',
  'id'
>;
