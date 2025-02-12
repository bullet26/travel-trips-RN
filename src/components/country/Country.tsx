import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {useTanstackQuery} from '../../hooks';
import {CountryNest, CountryProps} from '../../types';
import {colors} from '../../theme';
import {ImageCard, Tag} from '../../UI';

export const Country = ({route, navigation}: CountryProps) => {
  const {id} = route?.params;

  const {data: country, isLoading} = useTanstackQuery<CountryNest>({
    url: `countries/${id}`,
    queryKey: ['countries', `${id}`],
  });

  const handleClick = (id: number) => {
    navigation.navigate('City', {id});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      {isLoading && <ActivityIndicator size="large" color={colors.accent} />}

      {country && (
        <View>
          <Text
            style={{color: colors.accent, fontSize: 25, textAlign: 'center'}}>
            {country.name}
          </Text>
          <View
            style={{flexDirection: 'row', columnGap: 15, marginVertical: 15}}>
            {country.translations.map(item => (
              <Tag key={item} text={item} />
            ))}
          </View>
          <FlatList
            data={country.cities}
            numColumns={2}
            horizontal={false}
            columnWrapperStyle={{marginBottom: 10}}
            renderItem={({item}) => (
              <ImageCard
                uri={item.images?.at(0)?.url}
                width={180}
                height={275}
                style={{marginRight: 5, marginLeft: 10}}
                title={item.name}
                handleClick={() => handleClick(item.id)}
              />
            )}
            keyExtractor={(item, index) =>
              item.id.toString() || index.toString()
            }
            onEndReached={() => console.log('onEndReached')}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
