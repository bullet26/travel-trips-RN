import {FC} from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import {Image, Pressable} from 'react-native';
import {colors} from '../../theme';
import cardDefault from '../../assets/card.png';

interface ImageCardProps {
  uri?: string;
  title: string;
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
  handleClick?: () => void;
}

export const ImageCard: FC<ImageCardProps> = props => {
  const {uri, width, height, title, style, handleClick = () => {}} = props;

  return (
    <Pressable
      onPress={handleClick}
      style={({pressed}) => [
        {
          filter: pressed ? 'grayscale(50%)' : '',
        },
      ]}>
      <View style={[{flexDirection: 'column'}, style]}>
        {!!uri ? (
          <Image
            source={{uri}}
            style={{
              width,
              height,
            }}
          />
        ) : (
          <Image
            source={cardDefault}
            style={{
              width,
              height,
            }}
          />
        )}
        <Text style={{color: colors.accent, fontSize: 16}}>{title}</Text>
      </View>
    </Pressable>
  );
};
