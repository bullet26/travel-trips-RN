import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {Link} from '@react-navigation/native';
import {colors} from '../../theme';
import {useTanstackQuery} from '../../hooks';
import {TagNest, TagProps} from '../../types';
import {ImageCard, Tag as TagElement} from '../../UI';

export const Tag = ({route, navigation}: TagProps) => {
  const {id} = route?.params;

  const {data: tag} = useTanstackQuery<TagNest>({
    url: `tags/${id}`,
    queryKey: ['tags', `${id}`],
  });

  const handleClick = (id: number) => {
    navigation.navigate('Place', {id});
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundMain,
      }}>
      {tag && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 10,
              marginVertical: 15,
            }}>
            <TagElement
              key={tag?.id}
              text={tag.name}
              styleText={{fontSize: 30}}
              scheme="red-white"
            />
            <Link screen="Tags">
              <Text
                style={{
                  fontSize: 18,
                  color: colors.primary,
                  textAlign: 'center',
                }}>
                To all tags
              </Text>
            </Link>
          </View>
          <FlatList
            data={tag?.places}
            numColumns={2}
            horizontal={false}
            columnWrapperStyle={{marginBottom: 10}}
            renderItem={({item}) => (
              <ImageCard
                uri={item.images?.at(0)?.url}
                width={180}
                height={275}
                style={{marginRight: 5, marginLeft: 10}}
                title={item.name}
                handleClick={() => handleClick(item.id)}
              />
            )}
            keyExtractor={(item, index) =>
              item.id.toString() || index.toString()
            }
            onEndReached={() => console.log('onEndReached')}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
