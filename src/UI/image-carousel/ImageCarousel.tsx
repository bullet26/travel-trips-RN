import React, {useRef} from 'react';
import {View, Image, FlatList, Dimensions, StyleSheet} from 'react-native';
import {ImageAttributesNest} from '../../types';

const {width} = Dimensions.get('window');

interface ImageCarouselProps {
  images: ImageAttributesNest[];
}

export const ImageCarousel = (props: ImageCarouselProps) => {
  const {images} = props;

  const flatListRef = useRef(null);

  return (
    <FlatList
      ref={flatListRef}
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Image source={{uri: item.url}} style={styles.image} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    objectFit: 'contain',
    width: '90%',
    height: 200,
    borderRadius: 10,
  },
});
