import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BrandHeader from '../components/BrandHeader';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { getCategoryImage } from '../utils/assetMap';
import categoriesData from '../data/categories.json';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = 18;
const GAP = 14;
const CARD_WIDTH = (width - (HORIZONTAL_PADDING * 2) - GAP) / 2;
// Aspect ratio matching Image 1 Right (approx 1:1.15)
const CARD_HEIGHT = Math.round(CARD_WIDTH * 1.15);

export default function CategoriesTiles({ navigation }) {
  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryProducts', {
      categoryName: category.name,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Brand Header with MyShoppy + Battery/Signal/Profile Icons */}
      <BrandHeader showRightIcons={true} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories Section Heading */}
        <Text style={styles.sectionHeading}>Categories</Text>

        {/* 2-Column Category Grid Matching Reference Image 1 Right */}
        <View style={styles.categoryGrid}>
          {categoriesData.map((category) => {
            const imageSource = getCategoryImage(category.name);

            return (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                activeOpacity={0.88}
                onPress={() => handleCategoryPress(category)}
              >
                {imageSource ? (
                  <Image
                    source={imageSource}
                    style={styles.tileImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.fallbackBox}>
                    <Text style={styles.fallbackTitle}>{category.name}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
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
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#446E6C',
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
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    ...SHADOWS.sm,
  },
  tileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  fallbackBox: {
    flex: 1,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  fallbackTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
