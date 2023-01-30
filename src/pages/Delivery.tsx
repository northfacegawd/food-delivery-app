import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Ing from './Ing';
import Complete from './Complete';

export type DeliveryStackParamList = {
  Ing: undefined;
  Complete: undefined;
};

const Stack = createNativeStackNavigator<DeliveryStackParamList>();

function Delivery() {
  return (
    <Stack.Navigator initialRouteName="Ing">
      <Stack.Screen name="Ing" component={Ing} options={{headerShown: false}} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Delivery;
