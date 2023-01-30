import axios from 'axios';
import {Order} from './../../types/order.d';

export const acceptOrder = async ({
  accessToken,
  id,
}: {
  id: Order['orderId'];
  accessToken: string;
}) => {
  const {data} = await axios.post(
    '/accept',
    {orderId: id},
    {headers: {authorization: `Bearer ${accessToken}`}},
  );
  return data;
};
