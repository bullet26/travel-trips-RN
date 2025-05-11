import {formatInTimeZone} from 'date-fns-tz';
import {PlaceNest} from '../../types';
import {Linking} from 'react-native';

const TZ = 'Europe/Kyiv';

export const formatToDateString = (value: string | Date): string => {
  if (isNaN(new Date(value).getTime())) {
    console.error('Invalid date provided', value);
    return 'unknown';
  }
  const date = new Date(value);

  return formatInTimeZone(date, TZ, 'dd MMMM, yyyy');
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

  const url = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${destination}${
    waypoints ? `&waypoints=${waypoints}` : ''
  }&travelmode=walking`;

  Linking.openURL(url).catch(err => console.error('Error:', err));
};
