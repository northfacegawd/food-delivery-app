import {Alert} from 'react-native';
import {logout} from '../requests/user';
import {useMutation} from 'react-query';
import {isAxiosError} from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

const useSignOut = () => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const mutateFn = () => logout(accessToken);

  return useMutation(['/signout'], mutateFn, {
    onSuccess: async () => {
      Alert.alert('알림', '로그아웃 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          name: '',
          email: '',
          accessToken: '',
          money: 0,
        }),
      );
      await EncryptedStorage.removeItem('refreshToken');
      navigation.navigate('SignIn' as never);
    },
    onError: error => {
      if (isAxiosError(error)) {
        Alert.alert('알림', error.response?.data?.message ?? 'Unknown Error');
      }
    },
  });
};

export default useSignOut;
