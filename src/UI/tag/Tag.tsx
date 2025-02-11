import {StyleProp, Text, TextStyle, View} from 'react-native';
import {colors} from '../../theme';

interface TagProps {
  text: string;
  scheme?: 'red-white' | 'red';
  styleText?: StyleProp<TextStyle>;
}

export const Tag = (props: TagProps) => {
  const {text, styleText, scheme = 'red'} = props;

  const backgroundColor = scheme === 'red' ? '#2a1215' : colors.primary;
  const textColor = scheme === 'red' ? colors.accent : '#fff';

  return (
    <View
      style={{
        backgroundColor,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}>
      <Text style={[{color: textColor, textAlign: 'center'}, styleText]}>
        #{text}
      </Text>
    </View>
  );
};
