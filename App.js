
import React from 'react';
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CartProvider } from './src/context/CartContext';

import HomeScreen from './src/screens/HomeScreen';
import CategoriesTiles from './src/screens/CategoriesTiles';
import CategoryItems from './src/screens/CategoryItems';
import CartItems from './src/screens/CartItems';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Categories navigation
function CategoriesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#1A535C',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen
        name="CategoryList"
        component={CategoriesTiles}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CategoryProducts"
        component={CategoryItems}
        options={({ route }) => ({
          title: route.params?.categoryName || 'Products'
        })}
      />
    </Stack.Navigator>
  );
}

// Main application
export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#FFFFFF',
              tabBarInactiveTintColor: '#D6E5E2',
              tabBarStyle: {
                backgroundColor: '#527D85',
                height: 75,
                paddingTop: 8,
                paddingBottom: 8,
                borderTopWidth: 0,
                elevation: 8
              },
              tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: '600'
              }
            }}
          >

            {/* HOME */}
            <Tab.Screen
              name="HomeTab"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => (
                  <Text style={{ fontSize: 25 }}>🏠</Text>
                )
              }}
            />

            {/* CATEGORIES */}
            <Tab.Screen
              name="CategoriesTab"
              component={CategoriesStack}
              options={{
                tabBarLabel: 'Categories',
                tabBarIcon: () => (
                  <Text style={{ fontSize: 25 }}>▦</Text>
                )
              }}
            />

            {/* CART */}
            <Tab.Screen
              name="Cart"
              component={CartItems}
              options={{
                tabBarLabel: 'Cart',
                tabBarIcon: () => (
                  <Text style={{ fontSize: 25 }}>🛒</Text>
                )
              }}
            />

          </Tab.Navigator>
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
