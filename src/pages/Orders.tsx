import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {Order} from '../../types/order';
import EachOrder from '../components/EachOrder';

function Orders() {
  const orders = useSelector((state: RootState) => state.order.orders);

  const renderItem = useCallback(({item}: {item: Order}) => {
    return <EachOrder item={item} />;
  }, []);

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Orders;
