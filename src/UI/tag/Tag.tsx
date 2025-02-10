import {Text, View} from 'react-native';
import {colors} from '../../theme';

interface TagProps {
  text: string;
}

export const Tag = (props: TagProps) => {
  const {text} = props;

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}>
      <Text style={{color: '#fff', textAlign: 'center'}}>#{text}</Text>
    </View>
  );
};
