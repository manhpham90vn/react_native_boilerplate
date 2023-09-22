import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Home from '../screens/home';

const Stack = createNativeStackNavigator();

const MainNavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigationStack;
