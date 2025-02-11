import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/NavigationType/NavigationType';
import { Search } from 'types';

export type BooksByDateProps = NativeStackNavigationProp<RootStackParamList, 'BookBySpecificDate'>;

export type ToAuthorPage = NativeStackNavigationProp<RootStackParamList, 'Author', 'id'>;
export type ToBookPage = NativeStackNavigationProp<RootStackParamList, 'Book', 'id'>;

export interface ISearchSuccess {
  search: Search[];
}
