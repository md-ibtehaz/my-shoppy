import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import categoriesData from '../data/categories.json';

const { width } = Dimensions.get('window');
// 2-column grid calculation with exact padding and gap matching reference Image 1
const HORIZONTAL_PADDING = 18;
const GAP = 14;
const CARD_WIDTH = (width - (HORIZONTAL_PADDING * 2) - GAP) / 2;

export default function CategoriesTiles({ navigation }) {
  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryProducts', {
      categoryName: category.name,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Brand Bar with Heart and Profile Icons (as in Reference Image 1) */}
      <View style={styles.topBar}>
        <View style={styles.brandWrapper}>
          <Text style={styles.brandText}>MyShoppy</Text>
          <View style={styles.brandUnderline} />
        </View>

        <View style={styles.topIconsGroup}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="heart-outline" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="person-circle-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories Section Heading */}
        <Text style={styles.sectionHeading}>Categories</Text>

        {/* 2-Column Full-Image Background Tiles */}
        <View style={styles.categoryGrid}>
          {categoriesData.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              activeOpacity={0.88}
              onPress={() => handleCategoryPress(category)}
            >
              <ImageBackground
                source={{ uri: category.image }}
                style={styles.tileBackground}
                imageStyle={styles.tileImage}
                resizeMode="cover"
              >
                {/* Full-bleed dark tint overlay for readability */}
                <View style={styles.overlay}>
                  <Text style={styles.categoryTitle} numberOfLines={2}>
                    {category.name}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    letterSpacing: -0.3,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: GAP,
  },
  categoryCard: {
    width: CARD_WIDTH,
    height: 128,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  tileBackground: {
    width: '100%',
    height: '100%',
  },
  tileImage: {
    borderRadius: 17,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.42)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
