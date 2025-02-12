import {ActivityIndicator, FlatList, SafeAreaView, Text} from 'react-native';
import {useTanstackQuery} from '../../hooks';
import {WishlistNest, WishlistProps} from '../../types';
import {colors} from '../../theme';
import {ImageCard} from '../../UI';

export const Wishlist = ({route, navigation}: WishlistProps) => {
  const {id} = route?.params;

  const {data: wishlist, isLoading} = useTanstackQuery<WishlistNest>({
    url: `wishlists/${id}`,
    queryKey: ['wishlists', `${id}`],
  });

  const handleClick = (id: number) => {
    navigation.navigate('CountryNavigation', {
      screen: 'Place',
      params: {id},
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      {isLoading && <ActivityIndicator size="large" color={colors.accent} />}

      <Text style={{color: colors.accent, textAlign: 'center', fontSize: 20}}>
        {wishlist?.title}
      </Text>
      <FlatList
        data={wishlist?.places}
        numColumns={3}
        horizontal={false}
        style={{paddingTop: 10}}
        columnWrapperStyle={{marginBottom: 10}}
        renderItem={({item}) => (
          <ImageCard
            uri={item.images?.at(0)?.url}
            width={110}
            height={150}
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
