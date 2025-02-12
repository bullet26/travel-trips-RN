import {useEffect} from 'react';
import {SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import {colors} from '../../theme';
import {ImageCard} from '../../UI';
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
        numColumns={2}
        horizontal={false}
        style={{paddingTop: 10}}
        columnWrapperStyle={{marginBottom: 10}}
        renderItem={({item}) => (
          <ImageCard
            uri={item.images?.at(0)?.url}
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
