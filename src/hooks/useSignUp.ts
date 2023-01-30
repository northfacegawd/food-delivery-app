import {Alert} from 'react-native';
import {SignUpData, signup} from '../requests/user';
import {useMutation} from 'react-query';

const useSignUp = () => {
  const mutateFn = (data: SignUpData) => signup(data);
  return useMutation(['/user'], mutateFn, {
    onSuccess: () => {
      Alert.alert('알림', '회원가입 되었습니다.');
    },
  });
};

export default useSignUp;
