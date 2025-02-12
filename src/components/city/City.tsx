import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {CityNest, CityProps} from '../../types';
import {useTanstackQuery} from '../../hooks';
import {colors} from '../../theme';
import {Link} from '@react-navigation/native';
import {ImageCard, Tag} from '../../UI';

export const City = ({route, navigation}: CityProps) => {
  const {id} = route?.params;

  const {data: city, isLoading} = useTanstackQuery<CityNest>({
    url: `cities/${id}`,
    queryKey: ['cities', `${id}`],
  });

  const handleClick = (id: number) => {
    navigation.navigate('Place', {id});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      {isLoading && <ActivityIndicator size="large" color={colors.accent} />}
      {city && (
        <View>
          <Text
            style={{color: colors.accent, fontSize: 25, textAlign: 'center'}}>
            {city.name},&nbsp;&nbsp;
            <Link
              screen="Country"
              params={{id: city.country?.id}}
              style={{color: colors.primary}}>
              {city.country?.name}
            </Link>
          </Text>
          <View
            style={{flexDirection: 'row', columnGap: 15, marginVertical: 15}}>
            {city.translations.map(item => (
              <Tag key={item} text={item} />
            ))}
          </View>
          <FlatList
            data={city.places}
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
