import {TripDayNest, UnassignedPlacesNest, WishlistNest} from '../types';
import {useTanstackMutation} from '.';
import {Alert} from 'react-native';
import {useEffect} from 'react';

export const useDeletePlaceCard = () => {
  const removePlaceTD = useTanstackMutation<TripDayNest>({
    url: `trips-day/place/remove`,
    method: 'PATCH',
  });

  const removePlaceUP = useTanstackMutation<UnassignedPlacesNest>({
    url: `unassigned-places/place/remove`,
    method: 'PATCH',
  });

  const removePlaceWL = useTanstackMutation<WishlistNest>({
    url: `wishlists/place/remove`,
    method: 'PATCH',
  });

  const handleError = (error: Error | null) => {
    if (error?.message) Alert.alert('Error :(', error.message);
  };

  useEffect(() => handleError(removePlaceTD.error), [removePlaceTD.error]);
  useEffect(() => handleError(removePlaceUP.error), [removePlaceUP.error]);
  useEffect(() => handleError(removePlaceWL.error), [removePlaceWL.error]);

  return ({
    id,
    type,
    placeId,
  }: {
    type: 'up' | 'td' | 'wl';
    placeId: number;
    id: number;
  }) => {
    if (!placeId || !type || !id) return null;

    const queryKeyMap = {
      removePlaceTD: [['trips-day', `${id}`]],
      removePlaceUP: [['unassigned-places', `${id}`]],
      removePlaceWL: [['wishlists', `${id}`]],
    };

    if (type === 'up') {
      removePlaceUP.mutate({
        id,
        body: {placeId},
        queryKeyWithId: queryKeyMap.removePlaceUP,
      });

      return removePlaceUP;
    }

    if (type === 'td') {
      removePlaceTD.mutate({
        id,
        body: {placeId},
        queryKeyWithId: queryKeyMap.removePlaceTD,
      });
      return removePlaceTD;
    }

    if (type === 'wl') {
      removePlaceWL.mutate({
        id,
        body: {placeId},
        queryKeyWithId: queryKeyMap.removePlaceWL,
      });

      return removePlaceWL;
    }
  };
};
