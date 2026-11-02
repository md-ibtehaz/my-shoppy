
import React, {
  createContext,
  useState,
  useEffect,
  useCallback
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

const STORAGE_KEY = '@shopy_cart';

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Load cart from AsyncStorage
  useEffect(() => {

    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);

          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          }
        }

      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsCartLoaded(true);
      }
    };

    loadCart();

  }, []);

  // Save cart whenever it changes
  useEffect(() => {

    if (!isCartLoaded) return;

    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(cart)
        );
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    };

    saveCart();

  }, [cart, isCartLoaded]);

  // Add product to cart
  const addToCart = useCallback((product) => {

    setCart(previousCart => {

      const existingProduct = previousCart.find(
        item => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1
        }
      ];

    });

  }, []);

  // Update quantity
  const updateQuantity = useCallback((id, delta) => {

    setCart(previousCart => {

      return previousCart
        .map(item => {

          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + delta
            };
          }

          return item;

        })
        .filter(item => item.quantity > 0);

    });

  }, []);

  // Remove product
  const manualRemove = useCallback((id) => {

    setCart(previousCart =>
      previousCart.filter(item => item.id !== id)
    );

  }, []);

  // Calculate total
  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        manualRemove,
        total
      }}
    >
      {children}
    </CartContext.Provider>

  );

};
