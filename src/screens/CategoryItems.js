import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { CartContext } from '../context/CartContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { formatPrice } from '../utils/format';
import products from '../data/products.json';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = 16;
const GAP = 12;
const CARD_WIDTH = (width - (HORIZONTAL_PADDING * 2) - GAP) / 2;

export default function CategoryItems({ route, navigation }) {
  const categoryName = route?.params?.categoryName || 'Products';
  const { addToCart, getItemQuantity } = useContext(CartContext);

  // Modal State matching Reference Image 2
  const [modalVisible, setModalVisible] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  // Filter products by category
  const filteredProducts = categoryName
    ? products.filter(
        (item) => item.category?.toLowerCase() === categoryName.toLowerCase()
      )
    : [];

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItem(item);
    setModalVisible(true);
  };

  const renderProduct = ({ item }) => {
    const inCartCount = getItemQuantity(item.id);

    return (
      <View style={styles.productCard}>
        {/* Product Image & Wishlist Button */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="cover"
          />

          <TouchableOpacity style={styles.favoriteBtn} activeOpacity={0.7}>
            <Ionicons name="heart-outline" size={17} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {inCartCount > 0 && (
            <View style={styles.inCartBadge}>
              <Text style={styles.inCartBadgeText}>{inCartCount} in bag</Text>
            </View>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.categorySubtext}>
            {item.category}
          </Text>

          <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
            activeOpacity={0.82}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Category Breadcrumb & Heading Bar (as in Reference Image 2) */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.titleColumn}>
          <Text style={styles.breadcrumbText}>Categories / {categoryName}</Text>
          <Text style={styles.headingText}>{categoryName} For You!</Text>
        </View>
      </View>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="cube-outline" size={38} color={COLORS.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No Products Available</Text>
          <Text style={styles.emptyText}>
            We don't have items listed in {categoryName} right now.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.backButtonText}>Browse Other Categories</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Exact Custom "Added to Cart!" Popup Modal matching Reference Image 2 */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Success Checkmark Circle */}
            <View style={styles.modalIconCircle}>
              <Ionicons name="checkmark" size={30} color="#FFFFFF" />
            </View>

            {/* Title */}
            <Text style={styles.modalTitle}>Added to Cart!</Text>

            {/* Item Preview Card Box */}
            {addedItem && (
              <View style={styles.snippetBox}>
                <Image
                  source={{ uri: addedItem.image }}
                  style={styles.snippetImage}
                  resizeMode="cover"
                />
                <View style={styles.snippetDetails}>
                  <Text style={styles.snippetName} numberOfLines={1}>
                    {addedItem.name}
                  </Text>
                  <Text style={styles.snippetPrice}>
                    {formatPrice(addedItem.price)}
                  </Text>
                </View>
              </View>
            )}

            {/* Subtitle Description */}
            <Text style={styles.modalSubtitle}>
              This item has been successfully placed in your shopping bag.
            </Text>

            {/* OK Button */}
            <TouchableOpacity
              style={styles.modalOkBtn}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.85}
            >
              <Text style={styles.modalOkText}>OK</Text>
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
    backgroundColor: COLORS.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  titleColumn: {
    flex: 1,
  },
  breadcrumbText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  headingText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 1,
  },
  listContent: {
    padding: HORIZONTAL_PADDING,
    paddingBottom: SPACING.xl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.95,
    backgroundColor: COLORS.surfaceMuted,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  inCartBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  inCartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  productDetails: {
    padding: 12,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  categorySubtext: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyIconCircle: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.lg,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },

  // Modal Styles (Matching Reference Image 2)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 24,
    width: '100%',
    maxWidth: 330,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  modalIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 10,
    textAlign: 'center',
  },
  snippetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 10,
    marginTop: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  snippetImage: {
    width: 46,
    height: 46,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceMuted,
  },
  snippetDetails: {
    flex: 1,
    marginLeft: 10,
  },
  snippetName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  snippetPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.accent,
  },
  modalSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 14,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  modalOkBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalOkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
