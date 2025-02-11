import {FlatList, SafeAreaView} from 'react-native';
import {useTanstackQuery} from '../../hooks';
import {CountryNest, CountriesProps} from '../../types';
import {ImageCard} from '../../UI';
import {colors} from '../../theme';
import {Header} from '../header';

export const Countries = ({navigation, route}: CountriesProps) => {
  const {data: countries} = useTanstackQuery<CountryNest[]>({
    url: 'countries',
    queryKey: ['countries'],
  });

  const handleClick = (id: number) => {
    navigation.navigate('CountryNavigation', {
      screen: 'Country',
      params: {id},
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      <Header navigation={navigation} route={route} />
      <FlatList
        data={countries}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{marginBottom: 10}}
        renderItem={({item}) => (
          <ImageCard
            uri={item.images?.at(0)?.url}
            width={180}
            height={315}
            style={{marginRight: 5, marginLeft: 10}}
            title={item.name}
            handleClick={() => handleClick(item.id)}
          />
        )}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        onEndReached={() => console.log('onEndReached')}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};
