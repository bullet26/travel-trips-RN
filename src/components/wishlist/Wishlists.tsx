import {useEffect} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView} from 'react-native';
import {colors} from '../../theme';
import {UserNestInfo, WishlistNest, WishlistsProps} from '../../types';
import {useTanstackLazyQuery, useTanstackQuery} from '../../hooks';
import {ImageCard} from '../../UI';

export const Wishlists = ({navigation}: WishlistsProps) => {
  const {data: user, isLoading: isLoadingUser} = useTanstackQuery<UserNestInfo>(
    {
      url: 'users/me',
      queryKey: ['users'],
    },
  );

  const [trigger, {data: wishlists, isLoading}] = useTanstackLazyQuery<
    WishlistNest[],
    number
  >({
    url: 'wishlists/user',
    queryKey: ['wishlists'],
  });

  useEffect(() => {
    if (user?.userId) {
      trigger(user.userId);
    }
  }, [user?.userId]);

  const handleClick = (id: number) => {
    navigation.navigate('Wishlist', {id});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      {(isLoading || isLoadingUser) && (
        <ActivityIndicator size="large" color={colors.accent} />
      )}
      <FlatList
        data={wishlists}
        numColumns={2}
        horizontal={false}
        style={{paddingTop: 10}}
        columnWrapperStyle={{marginBottom: 10}}
        renderItem={({item}) => (
          <ImageCard
            width={180}
            height={315}
            style={{marginRight: 5, marginLeft: 10}}
            title={item.title}
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
