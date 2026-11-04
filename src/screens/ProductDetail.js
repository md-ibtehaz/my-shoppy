import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import BrandHeader from '../components/BrandHeader';
import OrderSuccessModal from '../components/OrderSuccessModal';
import { CartContext } from '../context/CartContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { formatPrice } from '../utils/format';
import { getProductImage } from '../utils/assetMap';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params || {};
  const { addToCart, placeOrder } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <BrandHeader showBack onBack={() => navigation.goBack()} />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Product not found.</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handlePlaceOrder = () => {
    // Add product to cart with chosen quantity and place order
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    const txn = `89${Math.floor(10000000 + Math.random() * 90000000)}`;
    setTransactionId(txn);
    setSuccessModalVisible(true);
  };

  const handleContinueShopping = () => {
    setSuccessModalVisible(false);
    navigation.navigate('CategoryProducts', {
      categoryName: product.category,
    });
  };

  const totalPrice = product.price * quantity;
  const imageSource = getProductImage(product);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Universal Brand Header with MyShoppy + Battery/Signal/Profile Icons */}
      <BrandHeader showBack onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Review Item And Shipping Card (Matching Image 2 Middle) */}
        <View style={styles.reviewCard}>
          <Text style={styles.reviewCardHeader}>Review Item And Shipping</Text>

          <View style={styles.cardContentRow}>
            {/* Product Thumbnail */}
            <View style={styles.imageBox}>
              <Image
                source={imageSource}
                style={styles.productThumbnail}
                resizeMode="contain"
              />
            </View>

            {/* Product Center Info */}
            <View style={styles.productInfoCol}>
              <Text style={styles.productTitle} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.colorText}>
                Color: {product.color || 'Pink'}
              </Text>
              <Text style={styles.urgencyText}>
                Only {product.stock || 12} Items Left!{'\n'}Don't miss it
              </Text>

              {/* Stepper Controls [-] 1 [+] */}
              <View style={styles.stepperWrap}>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={handleDecrement}
                  activeOpacity={0.7}
                >
                  <Text style={styles.stepSign}>-</Text>
                </TouchableOpacity>

                <Text style={styles.stepNumber}>{quantity}</Text>

                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={handleIncrement}
                  activeOpacity={0.7}
                >
                  <Text style={styles.stepSign}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Right Column: Price & Quantity */}
            <View style={styles.priceCol}>
              <Text style={styles.unitPriceText}>
                {formatPrice(product.price)}
              </Text>
              <Text style={styles.quantityLabel}>
                Quantity: {quantity < 10 ? `0${quantity}` : quantity}
              </Text>
            </View>
          </View>
        </View>

        {/* Section 2: Total Price Breakdown (Matching Image 2 Middle) */}
        <View style={styles.totalSection}>
          <Text style={styles.totalSectionHeading}>Total Price</Text>

          <View style={styles.itemSummaryRow}>
            <Text style={styles.itemSummaryName} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.itemSummaryQty}>{quantity}</Text>
            <Text style={styles.itemSummaryPrice}>
              {formatPrice(totalPrice)}
            </Text>
          </View>

          <View style={styles.totalBottomRow}>
            <Text style={styles.totalBottomLabel}>
              Total : {formatPrice(totalPrice)}
            </Text>
          </View>
        </View>

        {/* Place Order CTA Button */}
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.88}
        >
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Your Order Has Been Accepted Modal (Matching Image 2 Right) */}
      <OrderSuccessModal
        visible={successModalVisible}
        transactionId={transactionId}
        onContinueShopping={handleContinueShopping}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFBFB',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  reviewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E6EAEB',
    padding: 16,
    marginBottom: 28,
    ...SHADOWS.sm,
  },
  reviewCardHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageBox: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    marginRight: 12,
  },
  productThumbnail: {
    width: '100%',
    height: '100%',
  },
  productInfoCol: {
    flex: 1,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  colorText: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
  },
  urgencyText: {
    fontSize: 9.5,
    color: '#F97316',
    fontWeight: '600',
    lineHeight: 13,
    marginBottom: 8,
  },
  stepperWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  stepBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  stepSign: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    paddingHorizontal: 8,
  },
  priceCol: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  unitPriceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  quantityLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  totalSection: {
    marginTop: 10,
    marginBottom: 40,
    paddingHorizontal: 4,
  },
  totalSectionHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  itemSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemSummaryName: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
    flex: 1,
  },
  itemSummaryQty: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
    paddingHorizontal: 24,
  },
  itemSummaryPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalBottomRow: {
    alignItems: 'flex-end',
    marginTop: 32,
    paddingTop: 12,
  },
  totalBottomLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  placeOrderButton: {
    backgroundColor: '#4E7371',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 42,
    alignSelf: 'center',
    minWidth: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    marginBottom: 24,
    ...SHADOWS.md,
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
