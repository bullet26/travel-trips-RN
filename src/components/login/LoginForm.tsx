import {Alert, Button, Text, TextInput, View} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {HTTPError, ILoginUser, NestAuthTokens} from '../../types';
import {fetcher, saveToken} from '../../api';
import {colors} from '../../theme';
import {useContextActions} from '../../hooks';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(16).required(),
  })
  .required();

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const {setAuthStatus} = useContextActions();

  const onSubmit: SubmitHandler<ILoginUser> = async data => {
    try {
      const response = await fetcher<NestAuthTokens>({
        url: `auth/login`,
        method: 'POST',
        body: data,
      });

      if (!!response?.accessToken) {
        saveToken(response);
        setAuthStatus(true);
      }
    } catch (error) {
      Alert.alert('Error', (error as HTTPError).message);
      setAuthStatus(false);
    }
  };

  return (
    <>
      <View>
        <Text style={{color: colors.light}}>Email</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{color: '#fff'}}
              placeholder="youremail@email.com"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        <Text style={{color: colors.accent}}>{errors.email?.message}</Text>

        <Text style={{color: colors.light}}>Password</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              secureTextEntry={true}
              placeholder="Enter a unique password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        <Text style={{color: colors.accent}}>{errors.password?.message}</Text>

        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          color={colors.primary}
        />
      </View>
    </>
  );
};
