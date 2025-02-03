import {Alert, Button, Text, TextInput, View} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ICreateUser, HTTPError, NestAuthTokens} from '../../types';
import {fetcher, saveToken} from '../../api';
import {colors} from '../../theme';

const schema = yup
  .object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(16).required(),
  })
  .required();

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ICreateUser> = async data => {
    try {
      const response = await fetcher<NestAuthTokens>({
        url: `auth/registration`,
        method: 'POST',
        body: data,
      });

      if (!!response?.accessToken) {
        saveToken(response);
      }
    } catch (error) {
      Alert.alert('Error', (error as HTTPError).message);
    }
  };

  return (
    <>
      <View>
        <Text style={{color: colors.light}}>Name</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{color: '#fff'}}
              placeholder="Enter your name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        <Text style={{color: colors.accent}}>{errors.name?.message}</Text>

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
          title="Continue"
          onPress={handleSubmit(onSubmit)}
          color={colors.primary}
        />
      </View>
    </>
  );
};
