import {SafeAreaView, Text, View} from 'react-native';
import {Link} from '@react-navigation/native';
import {TagNest} from '../../types';
import {useTanstackQuery} from '../../hooks';
import {colors} from '../../theme';
import {Tag} from '../../UI';

export const Tags = () => {
  const {data: tags} = useTanstackQuery<TagNest[]>({
    url: 'tags',
    queryKey: ['tags'],
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundMain,
      }}>
      <Text style={{fontSize: 30, color: colors.accent, textAlign: 'center'}}>
        All tags:
      </Text>
      <View style={{flexDirection: 'row', columnGap: 15, marginVertical: 10}}>
        {tags?.map(item => (
          <Link key={item.id} screen="Tag" params={{id: item?.id}}>
            <Tag key={item.id} text={item.name} />
          </Link>
        ))}
      </View>
    </SafeAreaView>
  );
};
