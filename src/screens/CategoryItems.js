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

import BrandHeader from '../components/BrandHeader';
import { CartContext } from '../context/CartContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { formatPrice } from '../utils/format';
import { getProductImage } from '../utils/assetMap';
import products from '../data/products.json';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = 16;
const GAP = 12;
const CARD_WIDTH = (width - (HORIZONTAL_PADDING * 2) - GAP) / 2;

export default function CategoryItems({ route, navigation }) {
  const rawCategory = route?.params?.categoryName || 'Tech';
  const displaySubcategory =
    rawCategory.toLowerCase() === 'tech' ? 'Headphones' : rawCategory;

  const { addToCart, updateQuantity, getItemQuantity } = useContext(CartContext);

  // Modal State matching Reference Image 2
  const [modalVisible, setModalVisible] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter products by category or subcategory
  const filteredProducts = products.filter((item) => {
    const cat = (item.category || '').toLowerCase();
    const sub = (item.subCategory || '').toLowerCase();
    const target = rawCategory.toLowerCase();

    if (target === 'tech' || target === 'headphones') {
      return cat === 'tech' || sub === 'headphones' || cat === 'electronics';
    }
    if (target === 'hand bag' || target === 'bags') {
      return cat === 'hand bag' || cat === 'bags';
    }
    if (target === 'cloth' || target === 'clothing') {
      return cat === 'cloth' || cat === 'clothing' || sub === 'cloth' || sub === 'clothing';
    }
    return cat === target || sub === target;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItem(item);
    setModalVisible(true);
  };

  const handleProductPress = (item) => {
    navigation.navigate('ProductDetail', { product: item });
  };

  const renderProduct = ({ item }) => {
    const inCartCount = getItemQuantity(item.id);
    const isFav = !!wishlist[item.id];
    const imageSource = getProductImage(item);

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.92}
      >
        {/* Wishlist Button (Top Right) */}
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => toggleWishlist(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={16}
            color={isFav ? '#EF4444' : '#64748B'}
          />
        </TouchableOpacity>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.productImage}
            resizeMode="contain"
          />

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

          <Text style={styles.categorySubtext} numberOfLines={1}>
            {item.subtitle || 'Organic Cotton, fairtrade certified'}
          </Text>

          {/* Rating Stars (Green Stars matching Image 2 Left) */}
          <View style={styles.ratingRow}>
            <View style={styles.starsGroup}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons key={s} name="star" size={11} color="#22C55E" />
              ))}
            </View>
            <Text style={styles.ratingCount}>({item.ratingCount || 121})</Text>
          </View>

          {/* Price */}
          <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>

          {/* Add to Cart or Stepper Button */}
          {inCartCount > 0 ? (
            <View style={styles.stepperContainer}>
              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => updateQuantity(item.id, -1)}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={15} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.stepperQuantityText}>{inCartCount}</Text>

              <TouchableOpacity
                style={styles.stepperBtn}
                onPress={() => updateQuantity(item.id, 1)}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={15} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
              activeOpacity={0.85}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Brand Header with centered logo & back button */}
      <BrandHeader centered={true} showBack onBack={() => navigation.goBack()} />

      {/* Subcategory Breadcrumbs & Heading (Matching Image 2 Left) */}
      <View style={styles.headerBar}>
        <Text style={styles.breadcrumbText}>
          Categories/ {displaySubcategory}
        </Text>
        <Text style={styles.headingText}>{displaySubcategory} For You!</Text>
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
          <Ionicons name="cube-outline" size={48} color={COLORS.textMuted} />
          <Text style={styles.emptyTitle}>No Products Available</Text>
          <Text style={styles.emptyText}>
            No products listed under {displaySubcategory} yet.
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

      {/* Reusable Added to Cart Popup Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="checkmark" size={30} color="#FFFFFF" />
            </View>

            <Text style={styles.modalTitle}>Added to Cart!</Text>

            {addedItem && (
              <View style={styles.snippetBox}>
                <Image
                  source={getProductImage(addedItem)}
                  style={styles.snippetImage}
                  resizeMode="contain"
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

            <Text style={styles.modalSubtitle}>
              This item has been successfully placed in your shopping bag.
            </Text>

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
    backgroundColor: '#FAFBFB',
  },
  headerBar: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: COLORS.surface,
  },
  breadcrumbText: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '700',
    marginBottom: 2,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  listContent: {
    padding: HORIZONTAL_PADDING,
    paddingTop: 12,
    paddingBottom: SPACING.xl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8ECED',
    overflow: 'hidden',
    padding: 10,
    ...SHADOWS.sm,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFBFB',
    borderRadius: 10,
    marginBottom: 8,
    position: 'relative',
  },
  productImage: {
    width: '85%',
    height: '85%',
  },
  inCartBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  inCartBadgeText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '700',
  },
  productDetails: {
    paddingHorizontal: 2,
  },
  productName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  categorySubtext: {
    fontSize: 9.5,
    color: '#64748B',
    marginBottom: 6,
    lineHeight: 13,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starsGroup: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: COLORS.primary, // Dark teal from theme
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11.5,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    height: 32,
  },
  stepperBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperQuantityText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 12.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
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
    maxWidth: 320,
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  modalIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 10,
    textAlign: 'center',
  },
  snippetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginTop: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  snippetImage: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  snippetDetails: {
    flex: 1,
    marginLeft: 10,
  },
  snippetName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  snippetPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 12,
    marginBottom: 18,
  },
  modalOkBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalOkText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
  },
});
