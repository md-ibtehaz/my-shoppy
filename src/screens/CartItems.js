import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { CartContext } from '../context/CartContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { formatPrice } from '../utils/format';
import BrandHeader from '../components/BrandHeader';
import OrderSuccessModal from '../components/OrderSuccessModal';
import { getProductImage } from '../utils/assetMap';

const HORIZONTAL_PADDING = 18;

export default function CartItems({ navigation }) {
  const {
    cart,
    orders,
    updateQuantity,
    manualRemove,
    placeOrder,
    deleteOrder,
    total,
    totalItems,
  } = useContext(CartContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Trigger checkout and create a real order entry in Recent Orders
  const handleCheckout = () => {
    if (cart.length > 0) {
      const order = placeOrder();
      setCompletedOrder(order);
      setModalVisible(true);
    }
  };

  const handleContinueShopping = () => {
    setModalVisible(false);
    navigation.navigate('CategoriesTab');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Universal Brand Header (matching Reference Images 1 & 2) */}
      <BrandHeader showRightIcons={true} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Review Item And Shipping / Current Cart */}
        <Text style={styles.sectionHeading}>Review Item And Shipping</Text>

        {cart.length > 0 ? (
          <View style={styles.cartSection}>
            {/* List of items currently in cart */}
            {cart.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image
                  source={getProductImage(item) || { uri: item.image }}
                  style={styles.itemImage}
                  resizeMode="contain"
                />

                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </View>

                <View style={styles.actionsColumn}>
                  <TouchableOpacity
                    onPress={() => manualRemove(item.id)}
                    style={styles.removeBtn}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={17} color={COLORS.destructive} />
                  </TouchableOpacity>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, -1)}
                      style={styles.qtyBtn}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="remove" size={13} color={COLORS.textPrimary} />
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.quantity}</Text>

                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, 1)}
                      style={styles.qtyBtn}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="add" size={13} color={COLORS.textPrimary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* Financial Summary & Place Order Button */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <View style={styles.freeBadge}>
                  <Text style={styles.freeBadgeText}>FREE</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(total)}</Text>
              </View>

              <TouchableOpacity
                style={styles.placeOrderBtn}
                onPress={handleCheckout}
                activeOpacity={0.85}
              >
                <Text style={styles.placeOrderText}>Place Order</Text>
                <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Empty Cart Card Matching Reference Image 3 */
          <View style={styles.emptyCartBox}>
            <View style={styles.emptyCartIconWrap}>
              <Ionicons name="cart-outline" size={48} color={COLORS.textMuted} />
            </View>
            <Text style={styles.emptyCartTitle}>Your Cart is Empty</Text>

            <TouchableOpacity
              style={styles.continueShoppingBtn}
              onPress={() => navigation.navigate('CategoriesTab')}
              activeOpacity={0.85}
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Section 2: Recent Orders List Matching Reference Image 3 */}
        <View style={styles.recentOrdersHeader}>
          <Ionicons name="receipt-outline" size={20} color={COLORS.primary} />
          <Text style={styles.recentOrdersTitle}>
            Recent Orders ({orders.length})
          </Text>
        </View>

        {orders.length > 0 ? (
          <View style={styles.ordersList}>
            {orders.map((order) => {
              const totalItemsInOrder = order.items.reduce(
                (sum, i) => sum + (i.quantity || 1),
                0
              );

              return (
                <View key={order.id} style={styles.orderCard}>
                  {/* Top Row: TXN ID, Date, Confirmed Badge & Delete */}
                  <View style={styles.orderCardTop}>
                    <View style={styles.orderIdGroup}>
                      <Text style={styles.orderIdText}>{order.id}</Text>
                      <Text style={styles.orderDateText}>{order.date}</Text>
                    </View>

                    <View style={styles.orderStatusGroup}>
                      <View style={styles.confirmedBadge}>
                        <Ionicons
                          name="checkmark-circle"
                          size={13}
                          color={COLORS.success}
                          style={{ marginRight: 3 }}
                        />
                        <Text style={styles.confirmedText}>Confirmed</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => deleteOrder(order.id)}
                        style={styles.deleteOrderBtn}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={17}
                          color={COLORS.destructive}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Middle Row: Product Thumbnails with Quantity Badges */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.thumbnailRow}
                  >
                    {order.items.map((item, index) => (
                      <View key={`${order.id}-${item.id}-${index}`} style={styles.thumbnailWrapper}>
                        <Image
                          source={getProductImage(item) || { uri: item.image }}
                          style={styles.orderItemImage}
                          resizeMode="contain"
                        />
                        <View style={styles.qtyBadge}>
                          <Text style={styles.qtyBadgeText}>x{item.quantity || 1}</Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>

                  {/* Bottom Row: Item Count and Total Price */}
                  <View style={styles.orderCardBottom}>
                    <Text style={styles.orderItemsCount}>
                      {totalItemsInOrder} {totalItemsInOrder === 1 ? 'items' : 'items'}
                    </Text>
                    <Text style={styles.orderTotalText}>
                      {formatPrice(order.total)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.noOrdersCard}>
            <Text style={styles.noOrdersText}>No past orders found.</Text>
          </View>
        )}
      </ScrollView>

      {/* Order Success Modal Matching Reference Image 2 Right */}
      <OrderSuccessModal
        visible={modalVisible}
        transactionId={completedOrder?.id}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  brandWrapper: {
    alignItems: 'flex-start',
  },
  brandText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    fontStyle: 'italic',
    letterSpacing: -0.3,
  },
  brandUnderline: {
    width: 65,
    height: 2.5,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    marginTop: 2,
  },
  topIconsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl * 1.5,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },

  // Cart Items
  cartSection: {
    marginBottom: SPACING.lg,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceMuted,
  },
  itemDetails: {
    flex: 1,
    marginLeft: SPACING.sm,
    marginRight: SPACING.xs,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  itemCategory: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.accent,
    marginTop: 4,
  },
  actionsColumn: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
  },
  removeBtn: {
    padding: SPACING.xs,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: RADIUS.full,
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingHorizontal: 5,
  },

  // Summary Card
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  freeBadge: {
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  freeBadgeText: {
    color: COLORS.success,
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.accent,
  },
  placeOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3E6867',
    paddingVertical: 14,
    borderRadius: 22,
    gap: SPACING.xs,
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // Empty Cart Card (Matching Reference Image 3)
  emptyCartBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.sm,
  },
  emptyCartIconWrap: {
    marginBottom: 12,
  },
  emptyCartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  continueShoppingBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  },
  continueShoppingText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  // Recent Orders Section (Matching Reference Image 3)
  recentOrdersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: 6,
  },
  recentOrdersTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  ordersList: {
    gap: SPACING.sm,
  },
  orderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  orderCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderIdGroup: {},
  orderIdText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  orderDateText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  orderStatusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  confirmedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  confirmedText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.success,
  },
  deleteOrderBtn: {
    padding: 2,
  },
  thumbnailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 10,
  },
  thumbnailWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  orderItemImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceMuted,
  },
  qtyBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  qtyBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  orderCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 8,
  },
  orderItemsCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  orderTotalText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.accent,
  },
  noOrdersCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  noOrdersText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },

  // Success Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  modalIconCircle: {
    marginBottom: SPACING.sm,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  modalSummaryBox: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  modalSummaryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  modalSummaryValue: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  modalDoneBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  modalDoneText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
