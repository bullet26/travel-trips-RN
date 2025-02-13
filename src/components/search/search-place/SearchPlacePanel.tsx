import {useState} from 'react';
import {TextInput, View} from 'react-native';
import {
  useContextActions,
  useContextValues,
  useDebounce,
  useTanstackQuery,
} from '../../../hooks';
import {colors} from '../../../theme';
import {SearchPlaceNestResult} from '../../../types';
import {SearchCard} from '../search-all';

export const SearchPlacePanel = () => {
  const [inputValue, setInputValue] = useState('');

  const debouncedValue = useDebounce(inputValue, 500);
  const {setSourceMovePlaceData} = useContextActions();
  const {sourceMovePlaceData} = useContextValues();

  const {data = [], isSuccess} = useTanstackQuery<SearchPlaceNestResult>({
    url: `search/places?searchString=${debouncedValue}`,
    queryKey: ['search/places', debouncedValue],
    enabled: !!debouncedValue,
  });

  const onPressCard = (placeId: number) => {
    setSourceMovePlaceData({
      placeId,
      sourceType: 'searchResult',
      sourceId: null,
    });
  };

  return (
    <View
      style={{
        marginTop: 15,
        borderRadius: 16,
        backgroundColor: colors.backgroundAccent,
      }}>
      <TextInput
        placeholder="Type here to search"
        value={inputValue}
        onChangeText={newText => setInputValue(newText)}
        style={{
          color: colors.light,
          borderWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: 15,
        }}
      />
      {isSuccess && !!data.length && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            columnGap: 15,
            paddingVertical: 15,
          }}>
          {data.map(item => (
            <SearchCard
              key={`place-searchResult-${item.id}`}
              onPress={() => {
                onPressCard(item.id);
              }}
              text={item.name}
              style={
                sourceMovePlaceData?.placeId === item.id
                  ? {borderColor: colors.primary}
                  : {}
              }
            />
          ))}
        </View>
      )}
      {isSuccess && !data.length && (
        <SearchCard text="Couldn't find anything" onPress={() => {}} />
      )}
    </View>
  );
};
