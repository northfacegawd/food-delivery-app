import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Order} from '../../types/order';

interface InitialState {
  orders: Order[];
  deliveries: Order[];
}

const initialState: InitialState = {
  orders: [],
  deliveries: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    acceptOrder(state, action: PayloadAction<Order['orderId']>) {
      const index = state.orders.findIndex(
        ({orderId}) => orderId === action.payload,
      );
      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1);
      }
    },
    rejectOrder(state, action: PayloadAction<Order['orderId']>) {
      const orderIndex = state.orders.findIndex(
        ({orderId}) => orderId === action.payload,
      );
      const deliveryIndex = state.deliveries.findIndex(
        ({orderId}) => orderId === action.payload,
      );
      if (orderIndex > -1) {
        state.orders.splice(orderIndex, 1);
      }
      if (deliveryIndex > -1) {
        state.deliveries.splice(deliveryIndex, 1);
      }
    },
  },
});

export default orderSlice;
