'use client';
import {Alert, Linking, Text, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {colors} from '../../theme';

export const GoogleButton = () => {
  const handleGoogleAuth = async () => {
    const authUrl = `${Config.BACKEND_URL}/auth/google`;

    try {
      await Linking.openURL(authUrl);
    } catch (error) {
      Alert.alert('Error', 'Cannot open authentication URL');
    }
  };

  return (
    <TouchableOpacity
      onPress={handleGoogleAuth}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundAccent,
        borderColor: colors.accent,
        padding: 10,
        borderRadius: 5,
        marginVertical: 15,
      }}>
      <FontAwesome6
        name="google"
        iconStyle="brand"
        size={20}
        color={colors.accent}
      />
      <Text style={{color: colors.primary, marginLeft: 10}}>
        Sign in with Google
      </Text>
    </TouchableOpacity>
  );
};
