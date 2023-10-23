import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Product} from '../redux/slices/ProductSlice';
import Cart from '../screens/tab-feed/Cart';
import ProductList from '../screens/tab-feed/ProductList';
import ProductDetails from '../screens/tab-feed/ProductDetails';

export type MainFeedNavigatorParamList = {
  Products: undefined;
  Cart: undefined;
  ProductDetails: {
    data: Product;
  };
};

const StackNavigator = createNativeStackNavigator<MainFeedNavigatorParamList>();

export default function MainProductStack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavigator.Screen name="Products" component={ProductList} />
      <StackNavigator.Screen name="ProductDetails" component={ProductDetails} />
      <StackNavigator.Screen name="Cart" component={Cart} />
    </StackNavigator.Navigator>
  );
}
