import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton} from 'react-native-paper';
import MainProductStack from './MainProductStack';

const TabNavigator = createBottomTabNavigator();

export default function MainStack() {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <TabNavigator.Screen
        name="ProductTab"
        component={MainProductStack}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              icon="home"
              size={25}
              iconColor={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="LocationsTab"
        component={MainProductStack}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              icon="store"
              size={25}
              iconColor={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="EpisodesTab"
        component={MainProductStack}
        options={{
          tabBarIcon: ({focused}) => (
            <IconButton
              icon="cog"
              size={25}
              iconColor={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}
