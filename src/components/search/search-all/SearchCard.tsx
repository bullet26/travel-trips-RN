import {Pressable, StyleProp, Text, ViewStyle} from 'react-native';
import {colors} from '../../../theme';

interface SearchCardProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
}

export const SearchCard = (props: SearchCardProps) => {
  const {onPress, text, style} = props;

  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#000' : '',
          color: pressed ? '#fff' : '',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderColor: colors.border,
          borderWidth: 1,
        },
        style,
      ]}
      onPress={onPress}>
      <Text style={{fontSize: 18, color: colors.light}}>{text}</Text>
    </Pressable>
  );
};
