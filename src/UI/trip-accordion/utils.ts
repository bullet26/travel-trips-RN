import dayjs from 'dayjs';
import {PlaceNest} from '../../types';
import {Linking, Platform} from 'react-native';

export const formatToDateString = (value: string | Date): string => {
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    console.error('Invalid date provided');
  }

  return dayjs(date).format('DD MMMM, YYYY');
};

export const openGoogleMaps = (
  places:
    | Pick<PlaceNest, 'latitude' | 'longitude' | 'id' | 'name' | 'images'>[]
    | undefined,
) => {
  if (!places || places.length === 0) return;

  const coordinates = places.map(
    ({latitude, longitude}) => `${latitude},${longitude}`,
  );

  const destination = coordinates.at(-1);
  if (!destination) return;

  const waypoints = coordinates.slice(0, -1)?.join('|');

  let scheme: string;

  if (Platform.OS === 'android') {
    scheme = `google.navigation:q=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ''
    }&mode=walking`;
  } else {
    scheme = `comgooglemaps://?daddr=${destination}${
      waypoints ? `&waypoints=${waypoints}` : ''
    }&directionsmode=walking`;
  }

  Linking.openURL(scheme).catch(err => console.error('Error:', err));
};
