import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { CartProvider, CartContext } from './src/context/CartContext';
import { COLORS } from './src/constants/theme';

import HomeScreen from './src/screens/HomeScreen';
import CategoriesTiles from './src/screens/CategoriesTiles';
import CategoryItems from './src/screens/CategoryItems';
import ProductDetail from './src/screens/ProductDetail';
import CartItems from './src/screens/CartItems';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack navigator for Category exploration
function CategoriesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.surface,
        },
        headerShadowVisible: false,
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
          color: COLORS.textPrimary,
        },
        headerBackTitleVisible: false,
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Inner navigator to read CartContext for live tab badge
function AppTabs() {
  const { totalItems } = useContext(CartContext);

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.65)',
        tabBarStyle: {
          backgroundColor: COLORS.tabBar,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: 64,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -2,
        },
      }}
    >
      {/* Home */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Categories */}
      <Tab.Screen
        name="CategoriesTab"
        component={CategoriesStack}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />

      {/* Cart */}
      <Tab.Screen
        name="Cart"
        component={CartItems}
        options={{
          tabBarLabel: 'Cart',
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#FE6B0B',
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: '700',
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            lineHeight: 16,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <StatusBar style="dark" />
        <NavigationContainer>
          <AppTabs />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
