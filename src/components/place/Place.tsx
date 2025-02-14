import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {PlaceNest, PlaceProps} from '../../types';
import {useTanstackQuery} from '../../hooks';
import {colors} from '../../theme';
import {Link} from '@react-navigation/native';
import {Tag, ImageCarousel} from '../../UI';
import {useState} from 'react';

export const Place = ({route}: PlaceProps) => {
  const {id} = route?.params;

  const [isCopied, setCopyStatus] = useState(false);

  const {data: place, isLoading} = useTanstackQuery<PlaceNest>({
    url: `places/${id}`,
    queryKey: ['places', `${id}`],
  });

  const openMaps = () => {
    if (!place) return;

    const {latitude, longitude} = place;
    if (!latitude || !longitude) return;

    const scheme =
      Platform.OS === 'ios'
        ? `maps://app?saddr=&daddr=${latitude},${longitude}`
        : `geo:${latitude},${longitude}?q=${latitude},${longitude}`;
    Linking.openURL(scheme).catch(err => console.error('Error:', err));
  };

  const copyToClipboard = () => {
    if (!place?.address) return;
    Clipboard.setString(place.address);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 3000);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundMain,
      }}>
      {isLoading && <ActivityIndicator size="large" color={colors.accent} />}

      {place && (
        <View>
          <Text
            style={{color: colors.accent, fontSize: 25, textAlign: 'center'}}>
            {place.name},&nbsp;&nbsp;
            <Link
              screen="City"
              params={{id: place.city?.id}}
              style={{color: colors.primary}}>
              <Text style={{fontSize: 25}}>{place.city?.name}</Text>
            </Link>
          </Text>

          <View
            style={{flexDirection: 'row', columnGap: 15, marginVertical: 10}}>
            {place.tags.map(item => (
              <Link key={item.id} screen="Tag" params={{id: item?.id}}>
                <Tag key={item.id} text={item.name} scheme="red-white" />
              </Link>
            ))}
            {place.translations.map(item => (
              <Tag key={item} text={item} />
            ))}
          </View>

          <Pressable
            onPress={openMaps}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? colors.backgroundAccent : '',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginVertical: 10,
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
          </Pressable>
          <ImageCarousel images={place?.images} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <Text style={{color: colors.light, fontSize: 18}}>
              Address:&nbsp;&nbsp;
            </Text>
            <Text style={{color: colors.light, fontSize: 16}}>
              {place.address}
            </Text>
            <TouchableOpacity onPress={copyToClipboard}>
              {isCopied ? (
                <FontAwesome6
                  name="check"
                  iconStyle="solid"
                  size={40}
                  color={colors.primary}
                />
              ) : (
                <FontAwesome6
                  name="copy"
                  iconStyle="regular"
                  size={40}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={{color: colors.light, fontSize: 16, paddingHorizontal: 15}}>
            {place.description}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
