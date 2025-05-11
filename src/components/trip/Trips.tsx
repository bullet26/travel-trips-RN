import {useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Pressable,
  Text,
} from 'react-native';
import {colors} from '../../theme';
import {useTanstackLazyQuery, useTanstackQuery} from '../../hooks';
import {TripsNest, TripsProps, UserNestInfo} from '../../types';

export const Trips = ({navigation}: TripsProps) => {
  const {data: user, isLoading: isLoadingUser} = useTanstackQuery<UserNestInfo>(
    {
      url: 'users/me',
      queryKey: ['users'],
    },
  );

  const [trigger, {data: trips, isLoading}] = useTanstackLazyQuery<
    TripsNest[],
    number
  >({
    url: 'trips/user',
    queryKey: ['trips'],
  });

  useEffect(() => {
    if (user?.userId) {
      trigger(user.userId);
    }
  }, [user?.userId]);

  const handleClick = (id: number) => {
    navigation.navigate('Trip', {id});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      {(isLoading || isLoadingUser) && (
        <ActivityIndicator size="large" color={colors.accent} />
      )}

      <FlatList
        data={trips}
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
            <Text
              style={{
                color:
                  new Date(item.finishDate).getFullYear() ===
                  new Date().getFullYear()
                    ? colors.accent
                    : colors.light,
              }}>
              {item.title}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        onEndReached={() => console.log('onEndReached')}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};
