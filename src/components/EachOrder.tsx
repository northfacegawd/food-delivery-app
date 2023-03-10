import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import orderSlice from '../slices/order';
import {useAppDispatch} from '../store';
import getDistanceFromLatLonInKm from '../util';
import {Order} from '../../types/order';
import useAcceptOrder from '../hooks/useAcceptOrder';

interface EachOrderProps {
  item: Order;
}
function EachOrder({item}: EachOrderProps) {
  const dispatch = useAppDispatch();
  const [detail, showDetail] = useState(false);
  const {mutate: accept, isLoading} = useAcceptOrder(item.orderId);

  const onReject = useCallback(() => {
    dispatch(orderSlice.actions.rejectOrder(item.orderId));
  }, [dispatch, item]);
  const {start, end} = item;

  const toggleDetail = useCallback(() => {
    showDetail(prevState => !prevState);
  }, []);

  return (
    <View style={styles.orderContainer}>
      <Pressable onPress={toggleDetail} style={styles.info}>
        <Text style={styles.eachInfo}>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
        </Text>
        <Text style={styles.eachInfo}>
          {getDistanceFromLatLonInKm(
            start.latitude,
            start.longitude,
            end.latitude,
            end.longitude,
          ).toFixed(1)}
          km
        </Text>
      </Pressable>
      {detail && (
        <View>
          <View>
            <Text>네이버맵이 들어갈 장소</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable
              disabled={isLoading}
              onPress={() => accept()}
              style={styles.acceptButton}>
              <Text style={styles.buttonText}>수락</Text>
            </Pressable>
            <Pressable
              disabled={isLoading}
              onPress={onReject}
              style={styles.rejectButton}>
              <Text style={styles.buttonText}>거절</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  info: {
    flexDirection: 'row',
  },
  eachInfo: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },
  rejectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EachOrder;
