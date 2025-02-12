import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  CountryNavigation: {screen: string; params: {id: string | number}};
  Trips: undefined;
  Trip: {id: string | number};
  Countries: undefined;
  Wishlists: undefined;
  Wishlist: {id: string | number};
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

export type TripsProps = NativeStackScreenProps<
  RootStackParamList,
  'Trips',
  'id'
>;

export type TripProps = NativeStackScreenProps<
  RootStackParamList,
  'Trip',
  'id'
>;

export type WishlistsProps = NativeStackScreenProps<
  RootStackParamList,
  'Wishlists',
  'id'
>;

export type WishlistProps = NativeStackScreenProps<
  RootStackParamList,
  'Wishlist',
  'id'
>;
