import {Alert} from 'react-native';
import {SignInData, signin} from '../requests/user';
import {useMutation} from 'react-query';
import {isAxiosError} from 'axios';

const useSignIn = () => {
  const mutateFn = (data: SignInData) => signin(data);

  return useMutation(['/login'], mutateFn, {
    onSuccess: () => {
      Alert.alert('알림', '로그인 되었습니다.');
    },
    onError: error => {
      if (isAxiosError(error)) {
        Alert.alert('알림', error.response?.data?.message ?? 'Unknown Error');
      }
    },
  });
};

export default useSignIn;
