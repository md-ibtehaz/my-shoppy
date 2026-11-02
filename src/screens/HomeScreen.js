import React, { useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { CartContext } from '../context/CartContext';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { formatPrice } from '../utils/format';

import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';

const { width } = Dimensions.get('window');
const PRODUCT_CARD_WIDTH = (width - 44) / 2;

export default function HomeScreen({ navigation }) {
  const { addToCart, getItemQuantity, totalItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Add-to-Cart Modal State matching Reference Image 2
  const [modalVisible, setModalVisible] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItem(product);
    setModalVisible(true);
  };

  // Filter products based on search query and selected filter
  const displayedProducts = useMemo(() => {
    let list = productsData;

    if (selectedCategory !== 'All') {
      list = list.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    return searchQuery.trim() ? list : list.slice(0, 8);
  }, [searchQuery, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Brand Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>MyShoppy</Text>
          <Text style={styles.brandSubtitle}>Quality essentials for everyday</Text>
        </View>

        <TouchableOpacity
          style={styles.cartIconButton}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.7}
        >
          <Ionicons name="bag-outline" size={22} color={COLORS.textPrimary} />
          {totalItems > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>
                {totalItems > 99 ? '99+' : totalItems}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color={COLORS.textMuted}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products or categories..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearSearchBtn}
            >
              <Ionicons name="close-circle" size={16} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {!searchQuery.trim() && (
          <>
            {/* Minimalist Editorial Banner */}
            <View style={styles.heroBanner}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>CURATED FOR YOU</Text>
              </View>
              <Text style={styles.heroTitle}>Simplicity & Quality</Text>
              <Text style={styles.heroSubtitle}>
                Explore everyday essentials crafted with care. Enjoy free delivery on all orders.
              </Text>
              <TouchableOpacity
                style={styles.heroCTA}
                onPress={() => navigation.navigate('CategoriesTab')}
                activeOpacity={0.85}
              >
                <Text style={styles.heroCTAText}>Browse All Categories</Text>
                <Ionicons name="arrow-forward" size={15} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            {/* Quick Category Pills */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <TouchableOpacity onPress={() => navigation.navigate('CategoriesTab')}>
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              <TouchableOpacity
                style={[
                  styles.categoryPill,
                  selectedCategory === 'All' && styles.categoryPillActive,
                ]}
                onPress={() => setSelectedCategory('All')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    selectedCategory === 'All' && styles.categoryPillTextActive,
                  ]}
                >
                  All Items
                </Text>
              </TouchableOpacity>

              {categoriesData.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryPill,
                      isActive && styles.categoryPillActive,
                    ]}
                    onPress={() => setSelectedCategory(cat.name)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.categoryPillText,
                        isActive && styles.categoryPillTextActive,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}

        {/* Products Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {searchQuery.trim()
              ? `Results for "${searchQuery}"`
              : selectedCategory === 'All'
              ? 'Featured Products'
              : `${selectedCategory}`}
          </Text>
          <Text style={styles.productCount}>
            {displayedProducts.length} {displayedProducts.length === 1 ? 'item' : 'items'}
          </Text>
        </View>

        {/* Products 2-Column Grid */}
        {displayedProducts.length > 0 ? (
          <View style={styles.productGrid}>
            {displayedProducts.map((product) => {
              const inCartCount = getItemQuantity(product.id);

              return (
                <View key={product.id} style={styles.productCard}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                    {inCartCount > 0 && (
                      <View style={styles.inCartBadge}>
                        <Text style={styles.inCartBadgeText}>{inCartCount} in bag</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.cardDetails}>
                    <Text style={styles.categoryTag}>
                      {product.category?.toUpperCase()}
                    </Text>

                    <Text style={styles.productName} numberOfLines={2}>
                      {product.name}
                    </Text>

                    <View style={styles.cardFooter}>
                      <Text style={styles.productPrice}>
                        {formatPrice(product.price)}
                      </Text>

                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => handleAddToCart(product)}
                        activeOpacity={0.8}
                      >
                        <Ionicons name="add" size={17} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="search"
              size={40}
              color={COLORS.textMuted}
              style={{ marginBottom: SPACING.sm }}
            />
            <Text style={styles.emptyTitle}>No matching products</Text>
            <Text style={styles.emptySubtitle}>
              Try searching with another keyword or browse our categories.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Reusable Added to Cart Modal */}
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
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  cartIconButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.full,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    height: 44,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    height: '100%',
  },
  clearSearchBtn: {
    padding: SPACING.xs,
  },
  heroBanner: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  heroBadgeText: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: SPACING.xs,
  },
  heroSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: '#94A3B8',
    marginBottom: SPACING.md,
  },
  heroCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.md,
    paddingVertical: 9,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  heroCTAText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.accent,
  },
  productCount: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  categoryScroll: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  categoryPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.md,
    justifyContent: 'space-between',
  },
  productCard: {
    width: PRODUCT_CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  imageWrapper: {
    width: '100%',
    height: PRODUCT_CARD_WIDTH,
    backgroundColor: COLORS.surfaceMuted,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  inCartBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  inCartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  cardDetails: {
    padding: SPACING.sm,
  },
  categoryTag: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    lineHeight: 18,
    height: 36,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.accent,
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },

  // Modal
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
