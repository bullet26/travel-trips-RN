import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useContextActions, useTanstackQuery} from '../../hooks';
import {TripProps, TripsNest} from '../../types';
import {colors} from '../../theme';
import {TripDaysAccordion} from '../../UI';
import {useState} from 'react';
import {SearchPlacePanel} from '../search';

export const Trip = ({route, navigation}: TripProps) => {
  const {id} = route?.params;

  const [isEditMode, setEditModeStatus] = useState(false);

  const {data: trip, isLoading} = useTanstackQuery<TripsNest>({
    url: `trips/${id}`,
    queryKey: ['trips', `${id}`],
  });

  const {setSourceMovePlaceData} = useContextActions();

  const setEditMode = () => {
    setEditModeStatus(prevState => !prevState);
    setSourceMovePlaceData(null);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      {isLoading && <ActivityIndicator size="large" color={colors.accent} />}
      {trip && (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              style={{color: colors.accent, textAlign: 'center', fontSize: 20}}>
              {trip?.title}
            </Text>
            <Pressable onPress={setEditMode}>
              <FontAwesome6
                name="pen-to-square"
                iconStyle="solid"
                size={30}
                color={isEditMode ? colors.primary : colors.light}
              />
            </Pressable>
          </View>
          {isEditMode && <SearchPlacePanel />}
          <TripDaysAccordion
            unassignedPlacesId={trip.unassignedPlaces.id}
            tripDays={trip.tripDays}
            navigation={{navigation, route}}
            isEditMode={isEditMode}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
