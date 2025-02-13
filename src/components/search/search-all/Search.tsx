import {useEffect, useState} from 'react';
import {FlatList, TextInput, View} from 'react-native';
import {useDebounce, useTanstackQuery} from '../../../hooks';
import {colors} from '../../../theme';
import {SearchNestResult, SearchType, CountriesProps} from '../../../types';
import {SearchCard} from './SearchCard';

export const Search = ({navigation}: CountriesProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showSearchListStatus, setShowSearchListStatus] = useState(false);

  const debouncedValue = useDebounce(inputValue, 500);

  const {data = [], isSuccess} = useTanstackQuery<SearchNestResult>({
    url: `search?searchString=${debouncedValue}`,
    queryKey: ['search', debouncedValue],
    enabled: !!debouncedValue,
  });

  useEffect(() => {
    if (data.length) {
      setShowSearchListStatus(true);
    }
  }, [data]);

  const hideSearchList = () => {
    setShowSearchListStatus(false);
    setInputValue('');
  };

  const handleSearchResultClick = (id: number, type: SearchType) => {
    if (!id) return;
    console.log(navigation);

    if (type === 'city') {
      navigation.navigate('CountryNavigation', {
        screen: 'City',
        params: {id},
      });
    } else if (type === 'country') {
      navigation.navigate('CountryNavigation', {
        screen: 'Country',
        params: {id},
      });
    } else if (type === 'place') {
      navigation.navigate('CountryNavigation', {
        screen: 'Place',
        params: {id},
      });
    }
    hideSearchList();
  };

  return (
    <View>
      <TextInput
        placeholder="Type here to search"
        value={inputValue}
        onChangeText={newText => setInputValue(newText)}
        style={{color: colors.light}}
      />
      {showSearchListStatus && (
        <FlatList
          style={{
            position: 'absolute',
            top: 45,
            width: '50%',
            backgroundColor: colors.backgroundAccent,
          }}
          data={data}
          renderItem={({item}) => (
            <SearchCard
              onPress={() => {
                handleSearchResultClick(item.id, item.type);
              }}
              text={item.name}
            />
          )}
          keyExtractor={item => `${item.type}/${item.id}`}
        />
      )}
      {isSuccess && !data.length && (
        <SearchCard onPress={hideSearchList} text="Couldn't find anything" />
      )}
    </View>
  );
};
