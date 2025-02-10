import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {PlaceNest, PlaceProps} from '../../types';
import {useTanstackQuery} from '../../hooks';
import {colors} from '../../theme';
import {Link} from '@react-navigation/native';
import {ImageCard, Tag} from '../../UI';

export const Place = ({route, navigation}: PlaceProps) => {
  const {id} = route?.params;

  const {data: place} = useTanstackQuery<PlaceNest>({
    url: `places/${id}`,
    queryKey: ['places', `${id}`],
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      {place && (
        <View>
          <Text
            style={{color: colors.accent, fontSize: 25, textAlign: 'center'}}>
            {place.name},&nbsp;&nbsp;
            <Link
              screen="Country"
              params={{id: place.city?.id}}
              style={{color: colors.primary}}>
              {place.city?.name}
            </Link>
          </Text>
          <View
            style={{flexDirection: 'row', columnGap: 15, marginVertical: 15}}>
            {place.tags.map(item => (
              <Tag key={item} text={item} />
            ))}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: colors.light, fontSize: 18}}>
              Address:&nbsp;&nbsp;
            </Text>
            <Text style={{color: colors.light, fontSize: 16}}>
              {place.address}
            </Text>
          </View>
          <Text style={{color: colors.light, fontSize: 16}}>
            {place.description}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
