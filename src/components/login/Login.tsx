import {Text, View} from 'react-native';
import {LoginForm} from './LoginForm';
import {GoogleButton} from './GoogleButton';
import {colors} from '../../theme';

export const Login = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.backgroundMain,
        padding: 15,
      }}>
      <Text
        style={{
          fontSize: 24,
          color: colors.primary,
          textAlign: 'center',
        }}>
        Log in to your account
      </Text>
      <GoogleButton />
      <LoginForm />
    </View>
  );
};
