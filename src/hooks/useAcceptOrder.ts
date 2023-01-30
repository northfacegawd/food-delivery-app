import {Alert} from 'react-native';
import {useMutation} from 'react-query';
import {isAxiosError} from 'axios';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {Order} from '../../types/order';
import {acceptOrder} from '../requests/order';
import {LoggedInParamList} from '../../AppInner';
import orderSlice from '../slices/order';

const useAcceptOrder = (id: Order['orderId']) => {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const dispatch = useAppDispatch();

  const mutateFn = () => acceptOrder({id, accessToken});

  return useMutation(['/signout'], mutateFn, {
    onSuccess: async () => {
      dispatch(orderSlice.actions.acceptOrder(id));
      navigation.navigate('Delivery');
    },
    onError: error => {
      if (isAxiosError(error) && error.response?.status === 400) {
        Alert.alert('알림', error.response?.data.message);
        dispatch(orderSlice.actions.rejectOrder(id));
      }
    },
  });
};

export default useAcceptOrder;
