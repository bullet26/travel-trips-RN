import {useEffect} from 'react';
import {useTanstackLazyQuery} from '../../hooks';
import {TripDayNest, TripProps, UnassignedPlacesNest} from '../../types';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {colors} from '../../theme';
import {ImageCard} from '../image-card';

interface AccordionCardProps {
  id: number;
  type: 'up' | 'td';
  //   navigation: TripProps;
}

export const AccordionCard = (props: AccordionCardProps) => {
  const {id, type} = props;

  const [triggerTripDay, {data: tdData, isLoading: isLoadingTripDay}] =
    useTanstackLazyQuery<TripDayNest, number>({
      url: 'trips-day',
    });

  const [triggerUP, {data: upData, isLoading: isLoadingUp}] =
    useTanstackLazyQuery<UnassignedPlacesNest, number>({
      url: 'unassigned-places',
    });

  useEffect(() => {
    if (type === 'up') {
      triggerUP(Number(id), ['unassigned-places', `${id}`]);
    } else if (type === 'td') {
      triggerTripDay(Number(id), ['trips-day', `${id}`]);
    }
  }, []);

  const handleClick = (id: number) => {
    // navigation.navigate('CountryNavigation', {
    //   screen: 'Place',
    //   params: {id},
    // });
  };

  let isLoading;
  let places;

  if (type === 'up') {
    isLoading = isLoadingUp;
    places = upData?.places || [];
  } else if (type === 'td') {
    isLoading = isLoadingTripDay;
    places = tdData?.places || [];
  }

  console.log(places, type, id);

  return (
    <View>
      {isLoading && <ActivityIndicator size="large" color={colors.accent} />}
      <FlatList
        data={places}
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
    </View>
  );
};
