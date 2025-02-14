import {useEffect, useState} from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {
  useContextActions,
  useContextValues,
  useDeletePlaceCard,
  useMovePlaceCard,
  useTanstackLazyQuery,
} from '../../hooks';
import {TripDayNest, TripProps, UnassignedPlacesNest} from '../../types';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {colors} from '../../theme';
import {ImageCard} from '../image-card';
import {openGoogleMaps} from './utils';
import {confirmDelete} from '../confirm-delete';

interface AccordionCardProps {
  id: number;
  type: 'up' | 'td';
  navigation: TripProps;
  isEditMode: boolean;
}

export const AccordionCard = (props: AccordionCardProps) => {
  const {id, type, navigation, isEditMode} = props;

  const {setSourceMovePlaceData: onCutCard} = useContextActions();
  const {sourceMovePlaceData} = useContextValues();

  const [sourceId, setSourceId] = useState<null | number>(null); // for rerender

  const [triggerTripDay, {data: tdData, isLoading: isLoadingTripDay}] =
    useTanstackLazyQuery<TripDayNest, number>({
      url: 'trips-day',
    });

  const [triggerUP, {data: upData, isLoading: isLoadingUp}] =
    useTanstackLazyQuery<UnassignedPlacesNest, number>({
      url: 'unassigned-places',
    });

  const deleteCard = useDeletePlaceCard();
  const moveCard = useMovePlaceCard();

  const onPressPaste = () => {
    if (sourceMovePlaceData) {
      moveCard({
        ...sourceMovePlaceData,
        targetId: Number(id),
        targetType: type,
      });
      onCutCard(null);
    }
  };

  useEffect(() => {
    if (type === 'up') {
      triggerUP(Number(id), ['unassigned-places', `${id}`]);
    } else if (type === 'td') {
      triggerTripDay(Number(id), ['trips-day', `${id}`]);
    }
  }, []);

  useEffect(() => {
    if (!!sourceMovePlaceData?.sourceId) {
      setSourceId(sourceMovePlaceData?.sourceId);
    } else if (sourceMovePlaceData?.sourceType === 'searchResult') {
      setSourceId(0);
    } else {
      setSourceId(null);
    }
  }, [sourceMovePlaceData]);

  const handleClick = (id: number) => {
    navigation.navigation.navigate('CountryNavigation', {
      screen: 'Place',
      params: {id},
    });
  };

  const places = type === 'td' ? tdData?.places : upData?.places;
  const isShowMap = !!places?.length && !isEditMode;
  const isShowPast = isEditMode && sourceId !== null && sourceId !== id;

  return (
    <View>
      {(isLoadingUp || isLoadingTripDay) && (
        <ActivityIndicator size="large" color={colors.accent} />
      )}

      {isShowMap && (
        <Pressable
          onPress={() => openGoogleMaps(places)}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? colors.backgroundMain : '',
              marginBottom: 10,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
            <Text style={{color: colors.light, fontSize: 18}}>
              Open in Google Map
            </Text>
            <FontAwesome6
              name="location-dot"
              iconStyle="solid"
              size={40}
              color={colors.primary}
            />
          </View>
        </Pressable>
      )}

      {isShowPast && (
        <Pressable
          onPress={onPressPaste}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? colors.backgroundMain : '',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: 10,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: colors.border,
            },
          ]}>
          <Text style={{color: colors.light}}> Paste place here</Text>
          <FontAwesome6
            name="paste"
            iconStyle="solid"
            size={30}
            color={colors.primary}
          />
        </Pressable>
      )}

      <View style={{flexDirection: 'row', flexWrap: 'wrap', rowGap: 7}}>
        {places?.map(item => (
          <View key={item.id}>
            {isEditMode && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 5,
                  marginBottom: 5,
                  width: 90,
                }}>
                <Pressable
                  onPress={() =>
                    onCutCard({
                      placeId: item.id,
                      sourceType: type,
                      sourceId: id,
                    })
                  }>
                  <FontAwesome6
                    name="scissors"
                    iconStyle="solid"
                    size={20}
                    color={colors.light}
                  />
                </Pressable>
                <Pressable
                  onPress={() =>
                    confirmDelete(() =>
                      deleteCard({id, type, placeId: item.id}),
                    )
                  }>
                  <FontAwesome6
                    name="trash"
                    iconStyle="solid"
                    size={20}
                    color={colors.light}
                  />
                </Pressable>
              </View>
            )}
            <ImageCard
              uri={item.images?.at(0)?.url}
              width={85}
              height={120}
              style={{
                marginRight: 5,
                marginLeft: 10,
                ...(sourceMovePlaceData?.placeId === item.id && {
                  borderWidth: 2,
                  borderColor: colors.primary,
                }),
              }}
              title={item.name}
              handleClick={() => handleClick(item.id)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
