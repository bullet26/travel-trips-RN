import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {PlaceNest} from '../../types';
import {Linking} from 'react-native';

dayjs.extend(utc);
dayjs.extend(timezone);
const TZ = 'Europe/Kyiv';

export const formatToDateString = (value: string | Date): string => {
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    console.error('Invalid date provided');
  }

  return dayjs(date).tz(TZ).format('DD MMMM, YYYY');
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
