import {Text, View} from 'react-native';
import {colors} from '../../theme';
import {GoogleButton} from '../login/GoogleButton';
import {RegistrationForm} from './RegistrationForm';

export const Registration = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.backgroundMain,
        padding: 15,
      }}>
      <Text style={{fontSize: 24, color: colors.primary, textAlign: 'center'}}>
        Create your free account
      </Text>
      <GoogleButton />
      <RegistrationForm />
    </View>
  );
};
