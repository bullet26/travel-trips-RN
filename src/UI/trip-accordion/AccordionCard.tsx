import {useEffect} from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useTanstackLazyQuery} from '../../hooks';
import {TripDayNest, TripProps, UnassignedPlacesNest} from '../../types';
import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors} from '../../theme';
import {ImageCard} from '../image-card';
import {openGoogleMaps} from './utils';

interface AccordionCardProps {
  id: number;
  type: 'up' | 'td';
  navigation: TripProps;
}

export const AccordionCard = (props: AccordionCardProps) => {
  const {id, type, navigation} = props;

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
    navigation.navigation.navigate('CountryNavigation', {
      screen: 'Place',
      params: {id},
    });
  };

  const places = type === 'td' ? tdData?.places : upData?.places;

  return (
    <View>
      {places?.length && (
        <TouchableWithoutFeedback onPress={() => openGoogleMaps(places)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: colors.light, fontSize: 18}}>
              Open in Google Map
            </Text>
            <Text>
              <FontAwesome6
                name="location-dot"
                iconStyle="solid"
                size={40}
                color={colors.primary}
              />
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={{flexDirection: 'row', flexWrap: 'wrap', rowGap: 7}}>
        {(isLoadingUp || isLoadingTripDay) && (
          <ActivityIndicator size="large" color={colors.accent} />
        )}

        {places?.map(item => (
          <ImageCard
            key={item.id}
            uri={item.images?.at(0)?.url}
            width={85}
            height={120}
            style={{marginRight: 5, marginLeft: 10}}
            title={item.name}
            handleClick={() => handleClick(item.id)}
          />
        ))}
      </View>
    </View>
  );
};
