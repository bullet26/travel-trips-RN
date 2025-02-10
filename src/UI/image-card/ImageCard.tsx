import {FC} from 'react';
import {Text, View} from 'react-native';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {colors} from '../../theme';

interface ImageCardProps {
  uri: string;
  title: string;
  width: number;
  height: number;
  style?: {[x: string]: string | number};
  handleClick?: () => void;
}

export const ImageCard: FC<ImageCardProps> = props => {
  const {uri, width, height, title, style, handleClick = () => {}} = props;

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={{flexDirection: 'column', ...style}}>
        {!!uri ? (
          <Image
            source={{uri}}
            style={{
              width,
              height,
            }}
          />
        ) : (
          <SvgUri
            width={width + 15}
            height={height}
            uri="https://res.cloudinary.com/dlyawnfbk/image/upload/v1698343659/book-cover_ijn21c.svg"
          />
        )}
        <Text style={{color: colors.accent, fontSize: 16}}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
