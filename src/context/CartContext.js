import React, {
  createContext,
  useState,
  useEffect,
  useCallback
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

const CART_STORAGE_KEY = '@shopy_cart';
const ORDERS_STORAGE_KEY = '@shopy_orders';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart and orders from AsyncStorage on startup
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          }
        }

        const storedOrders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
        if (storedOrders) {
          const parsedOrders = JSON.parse(storedOrders);
          if (Array.isArray(parsedOrders)) {
            setOrders(parsedOrders);
          }
        } else {
          // Default initial sample orders as shown in the reference image
          const initialSampleOrders = [
            {
              id: 'TXN-35019478',
              date: '2 Nov 2026, 3:22 pm',
              items: [
                {
                  id: '1',
                  name: 'Classic Notebook',
                  price: 349,
                  quantity: 1,
                  image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'
                }
              ],
              total: 349,
              status: 'Confirmed'
            },
            {
              id: 'TXN-92639110',
              date: '2 Nov 2026, 3:22 pm',
              items: [
                {
                  id: '3',
                  name: 'Study Guide',
                  price: 299,
                  quantity: 2,
                  image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600'
                }
              ],
              total: 598,
              status: 'Confirmed'
            }
          ];
          setOrders(initialSampleOrders);
          await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(initialSampleOrders));
        }
      } catch (error) {
        console.error('Failed to load storage data:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (!isLoaded) return;

    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    };

    saveCart();
  }, [cart, isLoaded]);

  // Save orders whenever they change
  useEffect(() => {
    if (!isLoaded) return;

    const saveOrders = async () => {
      try {
        await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      } catch (error) {
        console.error('Failed to save orders:', error);
      }
    };

    saveOrders();
  }, [orders, isLoaded]);

  // Add product to cart
  const addToCart = useCallback((product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  }, []);

  // Update quantity (delta can be +1 or -1)
  const updateQuantity = useCallback((id, delta) => {
    setCart((previousCart) => {
      return previousCart
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + delta
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  }, []);

  // Remove product completely from cart
  const manualRemove = useCallback((id) => {
    setCart((previousCart) => previousCart.filter((item) => item.id !== id));
  }, []);

  // Clear entire cart
  const clearCart = useCallback(async () => {
    setCart([]);
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }, []);

  // Place order from current cart and record in recent orders
  const placeOrder = useCallback(() => {
    if (cart.length === 0) return null;

    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) +
      ', ' +
      now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toLowerCase();

    const orderTotal = cart.reduce(
      (sum, item) => sum + Number(item.price || 0) * item.quantity,
      0
    );

    const newOrder = {
      id: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      date: formattedDate,
      items: [...cart],
      total: orderTotal,
      status: 'Confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  }, [cart]);

  // Delete past order
  const deleteOrder = useCallback((orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  }, []);

  // Check quantity of specific item in cart
  const getItemQuantity = useCallback(
    (id) => {
      const found = cart.find((item) => item.id === id);
      return found ? found.quantity : 0;
    },
    [cart]
  );

  // Total monetary amount
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  // Total item count in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        updateQuantity,
        manualRemove,
        clearCart,
        placeOrder,
        deleteOrder,
        getItemQuantity,
        total,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
