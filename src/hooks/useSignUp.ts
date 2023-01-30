import {Alert} from 'react-native';
import {SignUpData, signup} from '../requests/user';
import {useMutation} from 'react-query';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {isAxiosError} from 'axios';
import {RootStackParamList} from '../../AppInner';

const useSignUp = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const mutateFn = (data: SignUpData) => signup(data);

  return useMutation(['/user'], mutateFn, {
    onSuccess: () => {
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.goBack();
    },
    onError: error => {
      if (isAxiosError(error)) {
        Alert.alert('알림', error.response?.data?.message ?? 'Unknown Error');
      }
    },
  });
};

export default useSignUp;
