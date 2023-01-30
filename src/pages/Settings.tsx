import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import useSignOut from '../hooks/useSignOut';
import useMoney from '../hooks/useMoney';

function Settings() {
  const name = useSelector((state: RootState) => state.user.name);
  const {data: money} = useMoney();
  const {mutate: logout} = useSignOut();

  return (
    <View>
      <View style={styles.moneyZone}>
        <Text style={styles.moneyText}>
          {name}님의 수익금{' '}
          <Text style={styles.money}>
            {(money ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          원
        </Text>
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={StyleSheet.compose(
            styles.loginButton,
            styles.loginButtonActive,
          )}
          onPress={() => logout()}>
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moneyZone: {
    padding: 20,
  },
  moneyText: {
    fontSize: 16,
  },
  money: {
    fontWeight: 'bold',
  },
  buttonZone: {
    alignItems: 'center',
    paddingTop: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Settings;
