import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {
  useContextActions,
  useContextValues,
  useDeletePlaceCard,
  useMovePlaceCard,
  useTanstackQuery,
} from '../../hooks';
import {WishlistNest, WishlistProps} from '../../types';
import {colors} from '../../theme';
import {confirmDelete, ImageCard} from '../../UI';
import {SearchPlacePanel} from '../../components';

export const Wishlist = ({route, navigation}: WishlistProps) => {
  const {id} = route?.params;

  const [isEditMode, setEditModeStatus] = useState(false);

  const {data: wishlist, isLoading} = useTanstackQuery<WishlistNest>({
    url: `wishlists/${id}`,
    queryKey: ['wishlists', `${id}`],
  });

  const deleteCard = useDeletePlaceCard();
  const moveCard = useMovePlaceCard();

  const {setSourceMovePlaceData} = useContextActions();
  const {sourceMovePlaceData} = useContextValues();

  const handleClick = (id: number) => {
    navigation.navigate('CountryNavigation', {
      screen: 'Place',
      params: {id},
    });
  };

  const onPressPaste = () => {
    if (sourceMovePlaceData) {
      moveCard({
        ...sourceMovePlaceData,
        targetId: Number(id),
        targetType: 'wl',
      });
      setSourceMovePlaceData(null);
    }
  };

  const setEditMode = () => {
    setEditModeStatus(prevState => !prevState);
    setSourceMovePlaceData(null);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundMain}}>
      {isLoading && <ActivityIndicator size="large" color={colors.accent} />}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={{color: colors.accent, textAlign: 'center', fontSize: 20}}>
          {wishlist?.title}
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
      {sourceMovePlaceData?.sourceType === 'searchResult' && (
        <Pressable
          onPress={onPressPaste}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? colors.backgroundAccent : '',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginVertical: 10,
              paddingVertical: 10,
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
      <FlatList
        data={wishlist?.places}
        numColumns={3}
        horizontal={false}
        style={{paddingTop: 10}}
        columnWrapperStyle={{marginBottom: 10}}
        renderItem={({item}) => (
          <View>
            {isEditMode && (
              <Pressable
                onPress={() =>
                  confirmDelete(() =>
                    deleteCard({id: Number(id), type: 'wl', placeId: item.id}),
                  )
                }>
                <FontAwesome6
                  name="trash"
                  iconStyle="solid"
                  style={{textAlign: 'center', margin: 15}}
                  size={20}
                  color={colors.light}
                />
              </Pressable>
            )}
            <ImageCard
              uri={item.images?.at(0)?.url}
              width={110}
              height={150}
              style={{marginRight: 5, marginLeft: 10}}
              title={item.name}
              handleClick={() => handleClick(item.id)}
            />
          </View>
        )}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        onEndReached={() => console.log('onEndReached')}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};
