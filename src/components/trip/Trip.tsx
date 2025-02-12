import {ActivityIndicator, SafeAreaView, ScrollView, Text} from 'react-native';
import {useTanstackQuery} from '../../hooks';
import {TripProps, TripsNest} from '../../types';
import {colors} from '../../theme';
import {TripDaysAccordion} from '../../UI';

export const Trip = ({route, navigation}: TripProps) => {
  const {id} = route?.params;

  const {data: trip, isLoading} = useTanstackQuery<TripsNest>({
    url: `trips/${id}`,
    queryKey: ['trips', `${id}`],
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      {isLoading && <ActivityIndicator size="large" color={colors.accent} />}
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
        <Text style={{color: colors.accent, textAlign: 'center', fontSize: 20}}>
          {trip?.title}
        </Text>
        <TripDaysAccordion
          unassignedPlacesId={trip?.unassignedPlaces.id || 0}
          tripDays={trip?.tripDays || []}
          navigation={{navigation, route}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
