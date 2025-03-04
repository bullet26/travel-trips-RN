import {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
} from 'react-native';
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
        numColumns={1}
        horizontal={false}
        style={{paddingTop: 10}}
        renderItem={({item}) => (
          <Pressable
            onPress={() => handleClick(item.id)}
            style={({pressed}) => [
              {
                marginRight: 5,
                marginLeft: 10,
                padding: 10,
                backgroundColor: pressed ? colors.backgroundAccent : '',
              },
            ]}>
            <Text style={{color: colors.light}}>{item.title}</Text>
          </Pressable>
        )}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        onEndReached={() => console.log('onEndReached')}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};
