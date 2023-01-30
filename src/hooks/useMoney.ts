import {useSelector} from 'react-redux';
import {getMoney} from '../requests/money';
import {RootState} from '../store/reducer';
import {useQuery} from 'react-query';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';

const useMoney = () => {
  const dispatch = useAppDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const queryFn = () => getMoney(accessToken);

  return useQuery(['/showmethemoney'], queryFn, {
    onSuccess: data => {
      dispatch(userSlice.actions.setMoney(data));
    },
  });
};

export default useMoney;
