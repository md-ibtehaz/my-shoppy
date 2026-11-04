import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

export default function BrandHeader({
  centered = false,
  showRightIcons = true,
  showBack = false,
  onBack,
}) {
  return (
    <View style={[styles.headerContainer, centered && styles.headerCentered]}>
      {/* Optional Back Button */}
      {showBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      )}

      {/* High-Resolution Brand Logo matching exact reference upload */}
      <View style={[styles.logoWrapper, centered && styles.logoCentered]}>
        <Image
          source={require('../../assets/brand-logo.png')}
          style={centered ? styles.brandLogoCentered : styles.brandLogoLeft}
          resizeMode="contain"
        />
      </View>

      {/* Right System & Profile Icons */}
      {!centered && showRightIcons && (
        <View style={styles.rightIconsGroup}>
          <Ionicons
            name="battery-charging-outline"
            size={24}
            color={COLORS.primary}
            style={styles.iconItem}
          />
          <Ionicons
            name="cellular-outline"
            size={20}
            color={COLORS.primary}
            style={styles.iconItem}
          />
          <Ionicons
            name="person-circle"
            size={26}
            color={COLORS.primary}
            style={styles.iconItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xs,
    backgroundColor: COLORS.surface,
    minHeight: 48,
  },
  headerCentered: {
    justifyContent: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  logoWrapper: {
    justifyContent: 'center',
  },
  logoCentered: {
    alignItems: 'center',
  },
  brandLogoLeft: {
    width: 116,
    height: 36,
  },
  brandLogoCentered: {
    width: 132,
    height: 42,
  },
  rightIconsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconItem: {
    marginLeft: 2,
  },
});
