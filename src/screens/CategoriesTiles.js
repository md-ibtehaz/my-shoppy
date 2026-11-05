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

import BrandHeader from '../components/BrandHeader';
import { COLORS, SPACING, SHADOWS } from '../constants/theme';
import { getCategoryImage } from '../utils/assetMap';
import categoriesData from '../data/categories.json';

const { width } = Dimensions.get('window');
const HORIZONTAL_PADDING = 16;
const GAP = 12;
const CARD_WIDTH = (width - (HORIZONTAL_PADDING * 2) - GAP) / 2;
// Fitted height so all 3 rows fit gracefully on mobile screens without cut-off
const CARD_HEIGHT = Math.max(120, Math.min(144, Math.round(width * 0.38)));

export default function CategoriesTiles({ navigation }) {
  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryProducts', {
      categoryName: category.name,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Centered Brand Header */}
      <BrandHeader centered={true} showRightIcons={false} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories Section Heading */}
        <Text style={styles.sectionHeading}>Categories</Text>

        {/* 2-Column High-Definition Category Grid Matching Reference */}
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
                  <ImageBackground
                    source={imageSource}
                    style={styles.tileBackground}
                    imageStyle={styles.tileImage}
                    resizeMode="cover"
                  >
                    {/* Subtle top vignette overlay for crystal sharp HD contrast */}
                    <View style={styles.overlay}>
                      <Text style={styles.categoryTitle}>{category.name}</Text>
                    </View>
                  </ImageBackground>
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
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.lg,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#446E6C',
    marginBottom: SPACING.sm,
    letterSpacing: -0.3,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: GAP,
  },
  categoryCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    ...SHADOWS.sm,
  },
  tileBackground: {
    width: '100%',
    height: '100%',
  },
  tileImage: {
    borderRadius: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.28)',
    paddingTop: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 4,
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
