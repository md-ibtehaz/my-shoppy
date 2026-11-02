
import React, { useContext, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { CartContext } from '../context/CartContext';

export default function CartItems({ navigation }) {

  const {
    cart,
    updateQuantity,
    manualRemove,
    total
  } = useContext(CartContext);

  const [modalVisible, setModalVisible] = useState(false);

  // Indian Rupee formatting
  const formatPrice = (price) => {
    return `₹${Number(price || 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Checkout
  const handleCheckout = () => {
    if (cart.length > 0) {
      setModalVisible(true);
    }
  };

  // Continue shopping
  const handleContinueShopping = () => {
    setModalVisible(false);
    navigation.navigate('HomeTab');
  };

  // Render cart item
  const renderItem = ({ item }) => (

    <View style={styles.cartItem}>

      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="cover"
      />

      <View style={styles.itemDetails}>

        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.itemPrice}>
          {formatPrice(item.price * item.quantity)}
        </Text>

      </View>

      <View style={styles.actions}>

        <View style={styles.quantityContainer}>

          <TouchableOpacity
            onPress={() => updateQuantity(item.id, -1)}
            style={styles.qtyBtn}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            onPress={() => updateQuantity(item.id, 1)}
            style={styles.qtyBtn}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          onPress={() => manualRemove(item.id)}
        >
          <Text style={styles.removeText}>
            Remove
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );

  return (

    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}
    >

      <Text style={styles.header}>
        Review Item And Shipping
      </Text>

      {/* Cart products */}
      {cart.length > 0 ? (

        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.cartList}
          showsVerticalScrollIndicator={false}
        />

      ) : (

        <View style={styles.emptyCart}>

          <Text style={styles.emptyIcon}>🛒</Text>

          <Text style={styles.emptyText}>
            Your cart is currently empty.
          </Text>

          <Text style={styles.emptySubText}>
            Add some products to get started!
          </Text>

        </View>

      )}

      {/* Total and checkout */}
      <View style={styles.footer}>

        <View style={styles.totalRow}>

          <Text style={styles.totalLabel}>
            Total Price
          </Text>

          <Text style={styles.totalText}>
            {formatPrice(total)}
          </Text>

        </View>

        <TouchableOpacity
          style={[
            styles.placeOrderBtn,
            cart.length === 0 && styles.disabledBtn
          ]}
          onPress={handleCheckout}
          disabled={cart.length === 0}
          activeOpacity={0.8}
        >

          <Text style={styles.placeOrderText}>
            Place Order
          </Text>

        </TouchableOpacity>

      </View>

      {/* Order confirmation */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContent}>

            <View style={styles.iconCircle}>
              <Text style={styles.successIcon}>✓</Text>
            </View>

            <Text style={styles.modalTitle}>
              Your order has been accepted
            </Text>

            <Text style={styles.transactionText}>
              Transaction ID: 8984294820
            </Text>

            <TouchableOpacity
              style={styles.continueBtn}
              onPress={handleContinueShopping}
            >

              <Text style={styles.continueText}>
                Continue Shopping
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
    color: '#333'
  },

  cartList: {
    paddingBottom: 15
  },

  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15
  },

  emptyText: {
    fontSize: 16,
    color: '#888'
  },

  emptySubText: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 8
  },

  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1
    }
  },

  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15
  },

  itemDetails: {
    flex: 1,
    justifyContent: 'center'
  },

  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333'
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A535C'
  },

  actions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 10
  },

  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4
  },

  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },

  removeText: {
    color: '#E63946',
    fontSize: 12,
    fontWeight: '600'
  },

  footer: {
    backgroundColor: '#FFF',
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  totalLabel: {
    fontSize: 18,
    color: '#555'
  },

  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A535C'
  },

  placeOrderBtn: {
    backgroundColor: '#5B8C85',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center'
  },

  disabledBtn: {
    backgroundColor: '#A0B2AF'
  },

  placeOrderText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContent: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 24,
    alignItems: 'center',
    width: '85%'
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  successIcon: {
    fontSize: 40,
    color: '#4CAF50',
    fontWeight: 'bold'
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333'
  },

  transactionText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30
  },

  continueBtn: {
    backgroundColor: '#FF8A65',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center'
  },

  continueText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }

});
