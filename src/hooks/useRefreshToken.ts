import {UseMutationOptions, useMutation} from 'react-query';
import {refresh} from '../requests/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isAxiosError} from 'axios';
import {Alert} from 'react-native';

const useRefreshToken = (options?: UseMutationOptions<any>) => {
  const mutateFn = async () => {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if (!refreshToken) return;
    return refresh(refreshToken);
  };
  return useMutation(['/refresh'], mutateFn, {
    ...options,
    onError: error => {
      if (isAxiosError(error)) {
        if (error.response?.data.code === 'expired') {
          Alert.alert('알림', '토큰이 만료되었습니다. 다시 로그인해주세요.');
        }
      }
    },
  });
};

export default useRefreshToken;
