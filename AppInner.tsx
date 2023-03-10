import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import Settings from './src/pages/Settings';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import useSocket from './src/hooks/useSocket';
import useRefreshToken from './src/hooks/useRefreshToken';
import {useAppDispatch} from './src/store';
import userSlice from './src/slices/user';
import {NavigationContainer} from '@react-navigation/native';
import {SignInResponse} from './src/requests/user';
import {Order} from './types/order';
import orderSlice from './src/slices/order';
import axios from 'axios';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const {mutate: refresh, mutateAsync: refreshAsync} = useRefreshToken({
    onSuccess: (response: SignInResponse['data']) => {
      dispatch(userSlice.actions.setUser({...response}));
    },
  });
  const [socket, disconnect] = useSocket();

  // aioxs 인터셉터를 사용하여 토큰 만료시 토큰 재발급
  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      async error => {
        const {config, response} = error;
        const originalRequest = config;
        if (response.status === 419 && response?.data.code === 'expired') {
          const data = await refreshAsync();
          if (!data) return;
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(originalRequest);
        }
        return Promise.reject(error);
      },
    );
  }, [refreshAsync]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const callback = (data: Order) => {
      dispatch(orderSlice.actions.addOrder(data));
    };
    if (socket && isLoggedIn) {
      socket.emit('acceptOrder', 'hello');
      socket.on('order', callback);
    }
    return () => {
      if (socket) {
        socket.off('order', callback);
      }
    };
  }, [isLoggedIn, socket, dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      disconnect();
    }
  }, [isLoggedIn, disconnect]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{title: '오더 목록'}}
          />
          <Tab.Screen
            name="Delivery"
            component={Delivery}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{title: '내 정보'}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;
